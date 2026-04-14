# backend/apps/blog/models.py
# backend/apps/blog/models.py
"""
Wagtail page models for the blog application.

Architecture decisions:
- BlogIndexPage is the parent container; posts live as Wagtail child
  pages beneath it, giving us free hierarchical routing and Wagtail's
  built-in live/draft/scheduled publishing lifecycle.
- StreamField with use_json_field=True stores body as JSONB in
  PostgreSQL — supports block validation without per-block migrations.
- Two ImageRenditionField API fields (thumbnail + og) are pre-generated
  server-side to eliminate N+1 image URL lookups in Next.js RSC fetches.
- BlogPageTag uses ParentalKey (not ForeignKey) so Wagtail's revision
  system correctly snapshots tag relationships with the page revision.
- ClusterTaggableManager wraps django-taggit for Wagtail compatibility.
"""

from __future__ import annotations

# Standard Library
import re
from typing import Any

# Django Core
from django.core.exceptions import ValidationError
from django.db import models
from django.http import HttpRequest
from django.utils.html import escape, strip_tags
from django.utils.safestring import mark_safe

# Third-Party: Wagtail
from wagtail.admin.panels import FieldPanel, MultiFieldPanel, Panel
from wagtail.api import APIField
from wagtail.blocks import (
    CharBlock,
    ChoiceBlock,
    RawHTMLBlock,
    RichTextBlock,
    StructBlock,
    TextBlock,
)
from wagtail.embeds.blocks import EmbedBlock
from wagtail.fields import RichTextField, StreamField
from wagtail.images.api.fields import ImageRenditionField
from wagtail.images.blocks import ImageChooserBlock
from wagtail.models import Page
from wagtail.search import index

# Third-Party: extras
import textstat

# Third-Party: modelcluster + taggit
from modelcluster.contrib.taggit import ClusterTaggableManager
from modelcluster.fields import ParentalKey
# from taggit.models import ItemBase, TagBase
from taggit.models import TaggedItemBase
from apps.pages.models import BasePage
from .forms import BlogDetailPageForm

BANNED_WORDS = [
    "embark",
    "look no further",
    "navigating",
    "picture this",
    "top-notch",
    "unleash",
    "unlock",
    "unveil",
    "we've got you covered",
    "transition",
    "transitioning",
    "crucial",
    "delve",
    "daunting",
    "deep dive",
    "dive in",
    "realm",
    "ensure",
    "in conclusion",
    "in summary",
    "optimal",
    "assessing",
    "firstly",
    "strive",
    "striving",
    "furthermore",
    "moreover",
    "comprehensive",
    "we know",
    "we understand",
    "testament",
    "captivating",
    "eager",
    "refreshing",
    "edge of my seat",
    "breath of fresh air",
    "to consider",
    "it is important to consider",
    "there are a few considerations",
    "it's essential to",
    "vital",
    "it's important to note",
    "it should be noted",
    "to sum up",
    "secondly",
    "lastly",
    "in terms of",
    "with regard to",
    "it's worth mentioning",
    "it's interesting to note",
    "significantly",
    "notably",
    "essentially",
    "as such",
    "therefore",
    "thus",
    "interestingly",
    "in essence",
    "noteworthy",
    "bear in mind",
    "it's crucial to note",
    "one might argue",
    "it's widely acknowledged",
    "predominantly",
    "from this perspective",
    "in this context",
    "this demonstrates",
    "arguably",
    "it's common knowledge",
    "undoubtedly",
    "this raises the question",
    "in a nutshell",
    "unveiled",
    "in the realm of",
    "utilizing",
    "leveraging",
    "leverage",
    "ultimate",
    "understanding",
    "Guide",
    "Comprehensive",
    "Unlashing",
]


# ─── Reusable block definitions ───────────────────────────────────────────────

class CodeBlock(StructBlock):
    """
    Syntax-highlighted code block.

    The `language` value is forwarded to the Next.js renderer as a
    CSS class (`language-{value}`) consumed by Shiki or Prism.
    Raw code is stored unescaped; the frontend renderer handles escaping.
    """

    language = CharBlock(
        default="python",
        help_text=(
            "Programming language identifier used for syntax highlighting "
            "(e.g. python, typescript, bash, sql)."
        ),
    )
    code = TextBlock(
        help_text="Paste raw source code. Do NOT manually HTML-escape — the renderer handles this."
    )

    class Meta:  # type: ignore[override]
        icon = "code"
        label = "Code block"


class CalloutBlock(StructBlock):
    """
    Styled alert / callout box.

    `type` drives frontend CSS class selection:
    - info    → blue  (#3B82F6)
    - warning → amber (#F59E0B)
    - tip     → green (#10B981)
    """

    type = ChoiceBlock(
        choices=[
            ("info", "ℹ Info"),
            ("warning", "⚠ Warning"),
            ("tip", "💡 Tip"),
        ],
        default="info",
        help_text="Visual variant — controls the callout's colour and icon.",
    )
    text = RichTextBlock(
        features=["bold", "italic", "link"],
        help_text="Callout body text. Keep concise — one to three sentences.",
    )

    class Meta:  # type: ignore[override]
        icon = "warning"
        label = "Callout"


class ValidatedHeadingBlock(CharBlock):
    """
    Heading block with validation for a focus keyword-aware first heading.
    """

    def clean(self, value):
        result = super().clean(value)
        if result is not None and not result.strip():
            raise ValidationError("Heading text cannot be blank.")
        return result

    class Meta:  # type: ignore[override]
        icon = "title"
        label = "Validated heading"


class ImageWithSeoBlock(StructBlock):
    """
    Image block that stores extra SEO metadata for alt text and captions.
    """

    image = ImageChooserBlock(help_text="Select an image for this section.")
    alt_text = TextBlock(
        required=False,
        help_text="Alternative text for the image. Auto-fills from the focus keyword if left blank.",
    )
    caption = TextBlock(
        required=False,
        help_text="Optional caption for editors and SEO context.",
    )

    def clean(self, value):
        result = super().clean(value)
        if result and not result.get("alt_text"):
            result["alt_text"] = ""
        return result

    class Meta:  # type: ignore[override]
        icon = "image"
        label = "SEO image"


class SEOMetricsPanel(Panel):
    """Admin panel that surfaces live SEO metrics and warnings."""

    class BoundPanel(Panel.BoundPanel):
        def render_html(self, parent_context=None):
            page = self.instance
            if page is None:
                return ""

            warnings = getattr(page, "get_seo_warnings", lambda: [])()
            warning_items = "".join(
                f"<li>{escape(message)}</li>" for message in warnings
            )
            metrics_html = f"""
<div class='c-seo-metrics-panel'>
  <div class='c-seo-metrics-panel__row'>
    <strong>Total word count:</strong> {page.total_word_count}
  </div>
  <div class='c-seo-metrics-panel__row'>
    <strong>Keyword density:</strong> {page.keyword_density:.2f}%
  </div>
  <div class='c-seo-metrics-panel__row'>
    <strong>First heading:</strong> {escape(page.get_first_heading_text() or 'None')}
  </div>
  <div class='c-seo-metrics-panel__row'>
    <strong>Paragraph warnings:</strong> {len(page.get_long_paragraphs())}
  </div>
  <div class='c-seo-metrics-panel__warnings'>
    <strong>Alerts:</strong>
    <ul>{warning_items}</ul>
  </div>
</div>
"""
            return mark_safe(metrics_html)

    def clone(self):
        return self


# ─── Page models ──────────────────────────────────────────────────────────────

class BlogIndexPage(BasePage):
    """
    The /blog/ listing page — the single parent of all BlogDetailPage instances.

    Wagtail tree structure:
        Root → HomePage → BlogIndexPage → BlogDetailPage (many)

    This page is created once in the Wagtail admin and acts as the
    container and URL namespace for all blog posts.
    """

    # ── Fields ────────────────────────────────────────────────────
    intro = RichTextField(
        blank=True,
        help_text="Short introduction displayed above the post listing.",
    )
    hero_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Hero banner image for the blog index page.",
    )

    # ── CMS panels ────────────────────────────────────────────────
    content_panels = Page.content_panels + [
        FieldPanel("intro"),
        FieldPanel("hero_image"),
    ]

    # ── Wagtail headless API fields ───────────────────────────────
    # ImageRenditionField generates the cropped/resized URL server-side,
    # avoiding a separate image API round-trip from Next.js.
    api_fields = [
        APIField("intro"),
        APIField(
            "hero_image_url",
            serializer=ImageRenditionField("fill-1200x600"),
        ),
    ]

    # ── Wagtail page tree constraints ─────────────────────────────
    subpage_types = ["blog.BlogDetailPage"]
    max_count = 1  # Only one blog index per site.

    class Meta:
        verbose_name = "Blog index"

    def get_context(
        self, request: HttpRequest, *args: Any, **kwargs: Any
    ) -> dict[str, Any]:
        """
        Extend Wagtail page context with a live, ordered posts queryset.

        Used when Wagtail serves the page directly (non-headless fallback).
        In headless mode (Next.js frontend), this context is not used —
        Next.js fetches posts via the Wagtail v2 Pages API instead.

        Args:
            request: The incoming HTTP request.
            *args: Positional arguments forwarded to super().
            **kwargs: Keyword arguments forwarded to super().

        Returns:
            Context dict with `posts` queryset added.
        """
        context = super().get_context(request, *args, **kwargs)
        context["posts"] = (
            BlogDetailPage.objects.live()
            .descendant_of(self)
            .order_by("-first_published_at")
        )
        return context


class BlogDetailPage(BasePage):
    """
    Individual blog post page.

    Rendered by Next.js via ISR (60-second revalidation window) using
    data fetched from the Wagtail v2 Pages API. On publish, a Wagtail
    hook fires a webhook to revalidate the specific ISR cache tag
    (`blog-post-{slug}`) so new content appears without a full rebuild.

    StreamField blocks map to React components in:
        frontend/src/components/blog/StreamField.tsx
    """

    base_form_class = BlogDetailPageForm

    # ── Metadata fields ───────────────────────────────────────────
    subtitle = models.CharField(
        max_length=250,
        blank=True,
        help_text="Subtitle or deck text displayed below the headline.",
    )
    reading_time = models.PositiveSmallIntegerField(
        default=5,
        help_text="Estimated reading time in minutes (displayed in the post header).",
    )
    hero_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Main hero image. Served in two renditions: thumbnail (800×400) and OG (1200×630).",
    )
    category = models.CharField(
        max_length=100,
        blank=True,
        db_index=True,
        help_text="Primary category slug (e.g. 'python', 'devops'). Used for /blog/category/ routing.",
    )
    tags = ClusterTaggableManager(
        through="blog.BlogPageTag",
        blank=True,
        help_text="Comma-separated tags for discovery and related posts.",
    )

    # ── Body StreamField ──────────────────────────────────────────
    # use_json_field=True stores blocks as JSONB in PostgreSQL.
    # This enables future JSONPath queries and avoids the deprecated
    # StreamField JSON string serialisation from Wagtail < 4.
    body = StreamField(
        [
            (
                "heading",
                ValidatedHeadingBlock(
                    form_classname="title",
                    icon="title",
                    help_text="Section heading (renders as <h2> in Next.js).",
                ),
            ),
            (
                "paragraph",
                RichTextBlock(
                    features=[
                        "h2", "h3", "bold", "italic",
                        "link", "ol", "ul", "blockquote", "code",
                    ],
                    help_text="Rich text paragraph block.",
                ),
            ),
            ("image", ImageWithSeoBlock()),
            ("code", CodeBlock()),
            ("callout", CalloutBlock()),
            (
                "embed",
                EmbedBlock(
                    icon="media",
                    help_text="Paste a YouTube, Vimeo, or Twitter URL to embed.",
                ),
            ),
            (
                "raw_html",
                RawHTMLBlock(
                    icon="code",
                    label="Raw HTML",
                    help_text=(
                        "⚠ Use sparingly. Raw HTML is injected unescaped into the page. "
                        "Ensure content is sanitised before saving."
                    ),
                ),
            ),
        ],
        use_json_field=True,
        blank=True,
    )

    # ── CMS panels ────────────────────────────────────────────────
    content_panels = Page.content_panels + [
        SEOMetricsPanel(),
        MultiFieldPanel(
            [
                FieldPanel("focus_keyword"),
                FieldPanel("seo_excerpt"),
                FieldPanel("image_prompt_suggestion"),
            ],
            heading="SEO & Focus Keyword",
            help_text="Live SEO and keyword guidance for blog content.",
        ),
        MultiFieldPanel(
            [
                FieldPanel("subtitle"),
                FieldPanel("reading_time"),
                FieldPanel("category"),
                FieldPanel("tags"),
            ],
            heading="Post metadata",
            help_text="Metadata fields used for display, routing, and SEO.",
        ),
        FieldPanel("hero_image"),
        FieldPanel("body"),
    ]

    # promote_panels includes seo_title, search_description, slug, and
    # show_in_menus — all provided by Wagtail's Page base class.
    # promote_panels = Page.promote_panels
    promote_panels = Page.promote_panels + [
        FieldPanel("focus_keyword"),
        FieldPanel("seo_excerpt"),
        FieldPanel("image_prompt_suggestion"),
        FieldPanel("tags"),
    ]

    # ── Wagtail headless API fields ───────────────────────────────
    # Two hero image renditions are generated server-side:
    # - hero_image_thumbnail: used in post cards on the listing page
    # - hero_image_og: used in OpenGraph meta tags
    api_fields = [
        APIField("focus_keyword"),
        APIField("seo_excerpt"),
        APIField("image_prompt_suggestion"),
        APIField("subtitle"),
        APIField("reading_time"),
        APIField("category"),
        APIField(
            "hero_image_thumbnail",
            serializer=ImageRenditionField("fill-800x400"),
        ),
        APIField(
            "hero_image_og",
            serializer=ImageRenditionField("fill-1200x630"),
        ),
        APIField("body"),
        APIField("tags"),
    ]

    # ── Search index fields ───────────────────────────────────────
    search_fields = Page.search_fields + [
        index.SearchField("subtitle"),
        index.SearchField("focus_keyword"),
        index.SearchField("seo_excerpt"),
        index.SearchField("body"),
        index.FilterField("category"),
    ]

    # ── Wagtail page tree constraints ─────────────────────────────
    parent_page_types = ["blog.BlogIndexPage"]
    subpage_types = []

    class Meta:
        verbose_name = "Blog post"
        ordering = ["-first_published_at"]

    def __str__(self) -> str:
        """Return the page title as the string representation."""
        return self.title

    @property
    def body_plain_text(self) -> str:
        """Return a plain-text version of the StreamField body for SEO analysis."""
        text_segments: list[str] = []

        for block in self.body:
            value = block.value
            if block.block_type == "paragraph":
                text_segments.append(strip_tags(str(value)))
            elif block.block_type == "heading":
                text_segments.append(str(value).strip())
            elif block.block_type == "image":
                text_segments.extend(
                    [
                        strip_tags(str(value.get("alt_text", ""))),
                        strip_tags(str(value.get("caption", ""))),
                    ]
                )
            elif block.block_type == "code":
                text_segments.append(str(value.get("code", "")))
            elif block.block_type == "callout":
                text_segments.append(strip_tags(str(value.get("text", ""))))
            elif block.block_type == "embed":
                text_segments.append(str(value))
            elif block.block_type == "raw_html":
                text_segments.append(strip_tags(str(value)))

        return "\n\n".join(segment for segment in text_segments if segment)

    @property
    def total_word_count(self) -> int:
        """Return the total word count for the rendered body text."""
        return textstat.lexicon_count(self.body_plain_text, removepunct=True)

    def get_keyword_stats(self) -> tuple[int, float]:
        """Return the focus keyword count and density for the page."""
        raw_text = self.body_plain_text.lower()
        keyword = self.focus_keyword.strip().lower()
        if not keyword:
            return 0, 0.0

        count = len(re.findall(rf"\b{re.escape(keyword)}\b", raw_text))
        density = (count / self.total_word_count * 100) if self.total_word_count else 0.0
        return count, density

    def get_first_heading_text(self) -> str | None:
        """Return the first heading block's stripped text, if present."""
        for block in self.body:
            if block.block_type == "heading":
                return str(block.value).strip()
        return None

    def get_long_paragraphs(self) -> list[tuple[int, int, str]]:
        """Return paragraphs that exceed the maximum allowed word count."""
        long_paragraphs: list[tuple[int, int, str]] = []
        for index, block in enumerate(self.body, start=1):
            if block.block_type != "paragraph":
                continue
            paragraph_text = strip_tags(str(block.value))
            paragraph_word_count = len(re.findall(r"\b\w+\b", paragraph_text))
            if paragraph_word_count > 120:
                long_paragraphs.append((index, paragraph_word_count, paragraph_text))
        return long_paragraphs

    def get_banned_words_found(self) -> list[str]:
        """Return any banned words or phrases found in the body text."""
        body_text = self.body_plain_text.lower()
        found: list[str] = []
        for term in BANNED_WORDS:
            normalized = term.lower().strip()
            if not normalized:
                continue
            pattern = rf"\b{re.escape(normalized)}\b"
            if re.search(pattern, body_text):
                found.append(term)
        return found

    def get_image_seo_issues(self) -> list[str]:
        """Return SEO warnings for image blocks without required metadata."""
        issues: list[str] = []
        for index, block in enumerate(self.body, start=1):
            if block.block_type != "image":
                continue
            image_data = block.value
            alt_text = str(image_data.get("alt_text", "")).strip()
            caption = str(image_data.get("caption", "")).strip()
            if not alt_text:
                issues.append(
                    f"Image block #{index} must include alt text for SEO."
                )
            if not caption:
                issues.append(
                    f"Image block #{index} should include a caption to improve semantic context."
                )
        return issues

    def get_seo_warnings(self) -> list[str]:
        """Return a list of SEO warnings surfaced in the Wagtail editor."""
        warnings: list[str] = []

        if self.total_word_count < 2500:
            warnings.append("Word count is below the strict 2,500 minimum.")
        elif self.total_word_count > 3000:
            warnings.append("Word count exceeds the strict 3,000 maximum.")

        keyword_count, _ = self.get_keyword_stats()
        expected_keyword_count = max(1, round(self.total_word_count / 100))
        if self.focus_keyword.strip() and keyword_count != expected_keyword_count:
            warnings.append(
                "Focus keyword density is not exactly 1% for the current word count."
            )

        first_heading = self.get_first_heading_text()
        if not first_heading:
            warnings.append("The first heading is required and must include the focus keyword.")
        elif (
            self.focus_keyword.strip()
            and self.focus_keyword.strip().lower() not in first_heading.lower()
        ):
            warnings.append("The first heading must contain the focus keyword.")

        long_paragraphs = self.get_long_paragraphs()
        if long_paragraphs:
            warnings.append(
                "Some paragraphs exceed the 120-word limit for readability."
            )

        banned_words = self.get_banned_words_found()
        if banned_words:
            warnings.append(
                f"Remove banned phrasing: {', '.join(banned_words[:5])}."
            )

        issues = self.get_image_seo_issues()
        warnings.extend(issues)

        return warnings

    @property
    def keyword_density(self) -> float:
        """Return the current focus keyword density as a percentage."""
        _, density = self.get_keyword_stats()
        return density

    def clean(self) -> None:
        """Run strict blog SEO validation before page save or publish."""
        super().clean()

        errors: dict[str, list[ValidationError] | ValidationError] = {}

        if not self.focus_keyword.strip():
            errors["focus_keyword"] = ValidationError(
                "A focus keyword is required for strict SEO enforcement."
            )

        if self.total_word_count < 2500 or self.total_word_count > 3000:
            errors["body"] = ValidationError(
                "Blog posts must be between 2,500 and 3,000 words for this SEO policy."
            )

        keyword_count, _ = self.get_keyword_stats()
        expected_keyword_count = max(1, round(self.total_word_count / 100))
        if self.focus_keyword.strip() and keyword_count != expected_keyword_count:
            errors.setdefault("focus_keyword", []).append(
                ValidationError(
                    "The focus keyword must occur exactly %s times for 1%% density."
                    % expected_keyword_count
                )
            )

        first_heading = self.get_first_heading_text()
        if not first_heading:
            errors.setdefault("body", []).append(
                ValidationError(
                    "The first heading block is required and must appear before other content."
                )
            )
        elif self.focus_keyword.strip() and self.focus_keyword.strip().lower() not in first_heading.lower():
            errors.setdefault("body", []).append(
                ValidationError(
                    "The first heading must contain the focus keyword exactly as entered."
                )
            )

        long_paragraphs = self.get_long_paragraphs()
        if long_paragraphs:
            errors.setdefault("body", []).append(
                ValidationError(
                    "One or more paragraphs exceed 120 words; break long paragraphs into shorter sections."
                )
            )

        banned_words = self.get_banned_words_found()
        if banned_words:
            errors.setdefault("body", []).append(
                ValidationError(
                    "Banned SEO phrasing found: %s." % ", ".join(banned_words[:8])
                )
            )

        image_issues = self.get_image_seo_issues()
        if image_issues:
            errors.setdefault("body", []).append(
                ValidationError(
                    "Image SEO metadata issues: %s." % ", ".join(image_issues)
                )
            )

        if errors:
            raise ValidationError(errors)


class BlogPageTag(TaggedItemBase):
    """
    Through model connecting BlogDetailPage to taggit Tag.

    Uses ParentalKey (not ForeignKey) so that Wagtail's revision system
    correctly snapshots tag relationships alongside the page revision.
    Without ParentalKey, tags would not be included in page history.
    """

    content_object = ParentalKey(
        "blog.BlogDetailPage",
        on_delete=models.CASCADE,
        related_name="tagged_items"
    )