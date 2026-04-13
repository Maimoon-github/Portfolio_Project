# backend/apps/pages/models.py
"""
Wagtail page models for the static marketing pages.

Architecture decisions:
- HomePage acts as the single root marketing page (max_count=1) with hero section
  and featured tools teaser — optimized for Next.js homepage ISR.
- AboutPage and ContactPage are strict children of HomePage (parent_page_types)
  to enforce clean site hierarchy and SEO-friendly URL structure.
- StreamField uses use_json_field=True for PostgreSQL-native JSONB storage
  (better indexing, no migration hell on block changes).
- All hero/SEO fields are exposed via Wagtail's headless API (api_fields)
  so Next.js can fetch complete page data in a single request with no extra
  image API round-trips.
- ImageRenditionField pre-generates optimised crops server-side for Core Web Vitals.
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
    RichTextBlock,
    StructBlock,
    TextBlock,
)
from wagtail.fields import RichTextField, StreamField
from wagtail.images.api.fields import ImageRenditionField
from wagtail.images.blocks import ImageChooserBlock
from wagtail.models import Page
# from wagtail_seo.models import SeoMixin
from wagtailseo.models import SeoMixin    # ← correct


class BasePage(SeoMixin, Page):           # ← inherit from SeoMixin
    class Meta:
        abstract = True

# ─── Reusable StreamField blocks ──────────────────────────────────────────────

class TeamMemberBlock(StructBlock):
    """
    Team member card used in AboutPage.

    Photo is served as a responsive rendition on the frontend.
    """

    name = CharBlock(help_text="Full name of team member")
    role = CharBlock(help_text="Job title / role")
    bio = TextBlock(help_text="Short bio (2–4 sentences)")
    photo = ImageChooserBlock(help_text="Portrait photo (recommended 400×400)")

    class Meta:  # type: ignore[override]
        icon = "user"
        label = "Team member"


# ─── Page models ──────────────────────────────────────────────────────────────

class HomePage(BasePage):
    """
    The single homepage of the marketing site.

    Enforced as the only HomePage (max_count=1). Contains hero section
    and teaser for featured tools. All content is editable in Wagtail admin
    and consumed by Next.js via the Pages API.
    """

    # ── Hero section ──────────────────────────────────────────────
    hero_heading = models.CharField(
        max_length=120,
        help_text="Main headline displayed in the hero banner.",
    )
    hero_subheading = models.CharField(
        max_length=250,
        blank=True,
        help_text="Supporting subheadline (optional).",
    )
    hero_cta_text = models.CharField(
        max_length=40,
        blank=True,
        help_text="Call-to-action button text (e.g. 'Explore Tools').",
    )
    hero_cta_url = models.CharField(
        max_length=200,
        blank=True,
        help_text="Internal or external URL for the CTA button.",
    )
    hero_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Large hero background image (1920×1080 recommended).",
    )

    # ── Intro & featured tools teaser ─────────────────────────────
    intro_body = RichTextField(
        blank=True,
        help_text="Short introduction text shown below the hero.",
    )
    featured_tools_heading = models.CharField(
        max_length=100,
        blank=True,
        default="Featured Calculators",
        help_text="Heading for the featured tools grid on homepage.",
    )

    # ── CMS panels ────────────────────────────────────────────────
    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                FieldPanel("hero_heading"),
                FieldPanel("hero_subheading"),
                FieldPanel("hero_cta_text"),
                FieldPanel("hero_cta_url"),
                FieldPanel("hero_image"),
            ],
            heading="Hero Section",
        ),
        FieldPanel("intro_body"),
        FieldPanel("featured_tools_heading"),
    ]

    # ── Wagtail headless API fields ───────────────────────────────
    api_fields = [
        APIField("hero_heading"),
        APIField("hero_subheading"),
        APIField("hero_cta_text"),
        APIField("hero_cta_url"),
        APIField(
            "hero_image_url",
            serializer=ImageRenditionField("fill-1920x1080"),
        ),
        APIField("intro_body"),
        APIField("featured_tools_heading"),
    ]

    # ── Wagtail page tree constraints ─────────────────────────────
    subpage_types = [
        "pages.AboutPage",
        "pages.ContactPage",
        "blog.BlogIndexPage",
        "tools.ToolIndexPage",
    ]
    max_count = 1  # Only one homepage per site.

    class Meta:
        verbose_name = "Home page"

    def get_context(
        self, request: HttpRequest, *args: Any, **kwargs: Any
    ) -> dict[str, Any]:
        """
        Extend context for non-headless rendering (fallback only).
        Next.js uses the Wagtail Pages API instead.
        """
        context = super().get_context(request, *args, **kwargs)
        return context


class AboutPage(BasePage):
    """
    About / team page.

    Single instance allowed under HomePage. Uses a rich StreamField
    for flexible content layout including a team member grid.
    """

    # ── Body StreamField ──────────────────────────────────────────
    body = StreamField(
        [
            (
                "heading",
                CharBlock(
                    icon="title",
                    help_text="Section heading (renders as <h2>).",
                ),
            ),
            (
                "paragraph",
                RichTextBlock(
                    features=["bold", "italic", "link", "ol", "ul"],
                    help_text="Rich text paragraph.",
                ),
            ),
            ("image", ImageChooserBlock()),
            (
                "team_member",
                TeamMemberBlock(),
            ),
        ],
        use_json_field=True,
        blank=True,
        help_text="Main page content blocks.",
    )

    # ── CMS panels ────────────────────────────────────────────────
    content_panels = Page.content_panels + [
        FieldPanel("body"),
    ]

    # ── Wagtail headless API fields ───────────────────────────────
    api_fields = [
        APIField("body"),
    ]

    # ── Wagtail page tree constraints ─────────────────────────────
    parent_page_types = ["pages.HomePage"]
    subpage_types = []
    max_count = 1  # Only one About page.

    class Meta:
        verbose_name = "About page"


class ContactPage(BasePage):
    """
    Contact page with basic contact details and optional form toggle.

    Single instance allowed under HomePage. Content is fully managed
    in Wagtail and served to Next.js via the Pages API.
    """

    intro = RichTextField(
        blank=True,
        help_text="Introduction text above the contact details.",
    )
    email = models.EmailField(
        blank=True,
        help_text="Primary contact email address.",
    )
    phone = models.CharField(
        max_length=20,
        blank=True,
        help_text="Phone number with country code if needed.",
    )
    address = models.TextField(
        blank=True,
        help_text="Physical address or mailing address.",
    )
    show_contact_form = models.BooleanField(
        default=True,
        help_text="Whether to display the contact form on the frontend.",
    )

    # ── CMS panels ────────────────────────────────────────────────
    content_panels = Page.content_panels + [
        FieldPanel("intro"),
        MultiFieldPanel(
            [
                FieldPanel("email"),
                FieldPanel("phone"),
                FieldPanel("address"),
            ],
            heading="Contact Information",
        ),
        FieldPanel("show_contact_form"),
    ]

    # ── Wagtail headless API fields ───────────────────────────────
    api_fields = [
        APIField("intro"),
        APIField("email"),
        APIField("phone"),
        APIField("address"),
        APIField("show_contact_form"),
    ]

    # ── Wagtail page tree constraints ─────────────────────────────
    parent_page_types = ["pages.HomePage"]
    subpage_types = []
    max_count = 1  # Only one Contact page.

    class Meta:
        verbose_name = "Contact page"