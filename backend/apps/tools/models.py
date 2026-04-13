# backend/apps/tools/models.py
# backend/apps/tools/models.py
"""
Wagtail page models for the tools (calculator) application.

Architecture decisions:
- ToolIndexPage is the directory page — one per site, max_count=1.
- ToolDetailPage is per-calculator: content (description, formulas, FAQ)
  is CMS-managed via StreamField; the live calculator widget is a React
  component identified by `calculator_slug`.
- `calculator_slug` is a SlugField (unique) that acts as the join key
  between the Wagtail CMS entry and the CALCULATOR_REGISTRY in views.py
  and the React component mapping in Next.js.
- StreamField blocks are tool-specific: formula_block, use_cases, faq —
  these are richer than blog blocks and serve as structured SEO content.
- `is_featured` + `db_index=True` allows the /tools/ listing page to
  efficiently filter featured tools without a full table scan.
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
    ListBlock,
    RichTextBlock,
    StructBlock,
    TextBlock,
)
from wagtail.fields import RichTextField, StreamField
from wagtail.images.api.fields import ImageRenditionField
from wagtail.images.blocks import ImageChooserBlock
from wagtail.models import Page
from wagtail.search import index
from apps.pages.models import BasePage


# ─── Category choices ─────────────────────────────────────────────────────────

class ToolCategory(models.TextChoices):
    """
    Enumeration of tool categories.

    Used for /tools/category/{category}/ routing in Next.js and for
    filtering the Wagtail Pages API response:
        GET /api/v2/pages/?type=tools.ToolDetailPage&category=financial
    """

    FINANCIAL = "financial", "Financial"
    HEALTH = "health", "Health & Fitness"
    SCIENTIFIC = "scientific", "Scientific"
    PRODUCTIVITY = "productivity", "Productivity"
    OTHER = "other", "Other"


# ─── Reusable StreamField blocks ──────────────────────────────────────────────

class FormulaBlock(StructBlock):
    """
    Displays a mathematical formula with its explanation.

    The `formula` field accepts LaTeX notation (rendered by KaTeX on
    the frontend) or plain-text notation as a fallback.
    """

    title = CharBlock(help_text="Brief label for the formula (e.g. 'Compound Interest Formula').")
    formula = TextBlock(
        help_text=(
            "Formula in LaTeX (e.g. A = P(1 + r/n)^{nt}) or plain text. "
            "The Next.js renderer uses KaTeX if LaTeX delimiters are detected."
        )
    )
    explanation = RichTextBlock(
        features=["bold", "italic", "link", "ol", "ul"],
        help_text="Plain-language explanation of the formula and its variables.",
    )

    class Meta:  # type: ignore[override]
        icon = "formula"
        label = "Formula"


class UseCaseBlock(StructBlock):
    """Single use-case item within the use_cases ListBlock."""

    title = CharBlock(help_text="Use-case headline (e.g. 'Retirement Planning').")
    description = TextBlock(help_text="Two to three sentences describing this use case.")

    class Meta:  # type: ignore[override]
        icon = "list-ul"
        label = "Use case"


class FAQBlock(StructBlock):
    """Single FAQ item within the faq ListBlock."""

    question = CharBlock(help_text="FAQ question (sentence case, ends with '?').")
    answer = RichTextBlock(
        features=["bold", "italic", "link", "ol", "ul"],
        help_text="Concise answer. Aim for two to four sentences.",
    )

    class Meta:  # type: ignore[override]
        icon = "help"
        label = "FAQ item"


# ─── Page models ──────────────────────────────────────────────────────────────

class ToolIndexPage(BasePage):
    """
    The /tools/ directory page — lists all ToolDetailPage children.

    Wagtail tree structure:
        Root → HomePage → ToolIndexPage → ToolDetailPage (many)

    Created once in the Wagtail admin. The Next.js listing page fetches
    tools from the Wagtail Pages API filtered by page type and category.
    """

    intro = RichTextField(
        blank=True,
        help_text="Introduction text displayed above the tool grid.",
    )

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
    ]

    api_fields = [
        APIField("intro"),
    ]

    subpage_types = ["tools.ToolDetailPage"]
    max_count = 1  # One tools index per site.

    class Meta:
        verbose_name = "Tools directory"

    def get_context(
        self, request: HttpRequest, *args: Any, **kwargs: Any
    ) -> dict[str, Any]:
        """
        Extend context with live tool pages for non-headless rendering.

        Args:
            request: The incoming HTTP request.
            *args: Forwarded positional arguments.
            **kwargs: Forwarded keyword arguments.

        Returns:
            Context dict with `tools` queryset.
        """
        context = super().get_context(request, *args, **kwargs)
        context["tools"] = (
            ToolDetailPage.objects.live()
            .descendant_of(self)
            .order_by("title")
        )
        return context


class ToolDetailPage(BasePage):
    """
    Individual calculator tool page.

    Each instance represents one calculator. The page has two layers:
    1. CMS content (description, formulas, use cases, FAQ) — managed in
       the Wagtail admin via StreamField blocks.
    2. Live calculator widget — a React component in Next.js identified
       by `calculator_slug`. The component calls POST /api/v1/tools/compute/
       {calculator_slug}/ with user inputs and receives computed results.

    This separation means content editors can update the explanatory
    text, SEO metadata, and FAQs without touching any code, while
    developers add new calculators by registering a slug + function
    in CALCULATOR_REGISTRY (views.py) and a React component.
    """

    # ── Identity fields ───────────────────────────────────────────
    category = models.CharField(
        max_length=30,
        choices=ToolCategory.choices,
        default=ToolCategory.OTHER,
        db_index=True,
        help_text="Tool category — used for /tools/{category}/ routing in Next.js.",
    )
    calculator_slug = models.SlugField(
        unique=True,
        help_text=(
            "Machine-readable identifier linking this page to its React component "
            "and backend compute function (e.g. 'compound-interest'). "
            "Must exactly match a key in CALCULATOR_REGISTRY in apps/tools/views.py."
        ),
    )
    icon = models.CharField(
        max_length=50,
        blank=True,
        help_text=(
            "Lucide icon name displayed on tool cards (e.g. 'calculator', 'heart-pulse'). "
            "Browse available icons at https://lucide.dev/icons/"
        ),
    )
    hero_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Hero image for the tool detail page (served at 800×400).",
    )
    is_featured = models.BooleanField(
        default=False,
        db_index=True,
        help_text="Featured tools appear prominently on the /tools/ homepage grid.",
    )

    # ── Body StreamField ──────────────────────────────────────────
    body = StreamField(
        [
            (
                "intro",
                RichTextBlock(
                    features=["bold", "italic", "link", "ol", "ul"],
                    label="Introduction",
                    help_text="Tool introduction (two to four paragraphs). Appears above the calculator widget.",
                ),
            ),
            ("formula_block", FormulaBlock()),
            (
                "use_cases",
                ListBlock(
                    UseCaseBlock(),
                    label="Use cases",
                    help_text="List of real-world scenarios where this calculator is useful.",
                ),
            ),
            (
                "faq",
                ListBlock(
                    FAQBlock(),
                    label="FAQ",
                    help_text="Frequently asked questions about this calculator. Rendered as schema.org FAQPage.",
                ),
            ),
            ("image", ImageChooserBlock()),
            (
                "paragraph",
                RichTextBlock(
                    features=["h2", "h3", "bold", "italic", "link", "ol", "ul"],
                    label="Rich text paragraph",
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
                FieldPanel("category"),
                FieldPanel("calculator_slug"),
                FieldPanel("icon"),
                FieldPanel("is_featured"),
            ],
            heading="Tool settings",
            help_text="Core identity fields. The calculator_slug must match CALCULATOR_REGISTRY.",
        ),
        FieldPanel("hero_image"),
        FieldPanel("body"),
    ]

    promote_panels = Page.promote_panels

    # ── Wagtail headless API fields ───────────────────────────────
    api_fields = [
        APIField("category"),
        APIField("calculator_slug"),
        APIField("icon"),
        APIField("is_featured"),
        APIField("body"),
        APIField(
            "hero_image_thumbnail",
            serializer=ImageRenditionField("fill-800x400"),
        ),
    ]

    # ── Search index fields ───────────────────────────────────────
    search_fields = Page.search_fields + [
        index.SearchField("body"),
        index.FilterField("category"),
        index.FilterField("is_featured"),
        index.FilterField("calculator_slug"),
    ]

    # ── Wagtail page tree constraints ─────────────────────────────
    parent_page_types = ["tools.ToolIndexPage"]
    subpage_types = []

    class Meta:
        verbose_name = "Calculator tool"
        ordering = ["title"]

    def __str__(self) -> str:
        """Return the page title as the string representation."""
        return self.title