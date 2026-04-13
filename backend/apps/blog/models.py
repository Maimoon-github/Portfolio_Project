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
from typing import Any

# Django Core
from django.db import models
from django.http import HttpRequest

# Third-Party: Wagtail
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
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

# Third-Party: modelcluster + taggit
from modelcluster.contrib.taggit import ClusterTaggableManager
from modelcluster.fields import ParentalKey
# from taggit.models import ItemBase, TagBase
from taggit.models import TaggedItemBase


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


# ─── Page models ──────────────────────────────────────────────────────────────

class BlogIndexPage(Page):
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


class BlogDetailPage(Page):
    """
    Individual blog post page.

    Rendered by Next.js via ISR (60-second revalidation window) using
    data fetched from the Wagtail v2 Pages API. On publish, a Wagtail
    hook fires a webhook to revalidate the specific ISR cache tag
    (`blog-post-{slug}`) so new content appears without a full rebuild.

    StreamField blocks map to React components in:
        frontend/src/components/blog/StreamField.tsx
    """

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
                CharBlock(
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
            ("image", ImageChooserBlock()),
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
        FieldPanel("tags"),
    ]

    # ── Wagtail headless API fields ───────────────────────────────
    # Two hero image renditions are generated server-side:
    # - hero_image_thumbnail: used in post cards on the listing page
    # - hero_image_og: used in OpenGraph meta tags
    api_fields = [
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


class BlogPageTag(TaggedItemBase):
    """
    Through model connecting BlogDetailPage to taggit Tag.

    Uses ParentalKey (not ForeignKey) so that Wagtail's revision system
    correctly snapshots tag relationships alongside the page revision.
    Without ParentalKey, tags would not be included in page history.
    """

    tags = ClusterTaggableManager(
        through="blog.BlogPageTag",
        blank=True,
        help_text="Comma-separated tags for discovery and related posts.",
    )
    content_object = ParentalKey(
        "blog.BlogDetailPage",
        on_delete=models.CASCADE,
        related_name="tagged_items"
    )