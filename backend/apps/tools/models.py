from django.db import models
from wagtail.models import Page
from wagtail.fields import StreamField, RichTextField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.api import APIField
from wagtail.images.api.fields import ImageRenditionField
from wagtail import blocks as wagtail_blocks
from wagtail.images.blocks import ImageChooserBlock


class ToolCategory(models.TextChoices):
    FINANCIAL = "financial", "Financial"
    HEALTH = "health", "Health & Fitness"
    SCIENTIFIC = "scientific", "Scientific"
    PRODUCTIVITY = "productivity", "Productivity"
    OTHER = "other", "Other"


class ToolIndexPage(Page):
    """
    The /tools/ directory page.
    Children: ToolDetailPage.
    """
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [FieldPanel("intro")]

    api_fields = [APIField("intro")]
    subpage_types = ["tools.ToolDetailPage"]

    class Meta:
        verbose_name = "Tools directory"


class ToolDetailPage(Page):
    """
    One page per calculator. Contains:
    - Wagtail-managed content (description, formula guide, use cases)
    - calculator_slug → maps to a React component on the frontend
    - category → for navigation/filtering
    """
    # ─── Tool identity ─────────────────────────────────────────────
    category = models.CharField(
        max_length=30,
        choices=ToolCategory.choices,
        default=ToolCategory.OTHER,
        db_index=True,
    )
    calculator_slug = models.SlugField(
        unique=True,
        help_text="Identifies the React calculator component (e.g. compound-interest)",
    )
    icon = models.CharField(max_length=50, blank=True, help_text="Lucide icon name")
    hero_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    is_featured = models.BooleanField(default=False, db_index=True)

    # ─── Rich content (Wagtail StreamField) ────────────────────────
    body = StreamField(
        [
            ("intro", wagtail_blocks.RichTextBlock(label="Introduction")),
            ("formula_block", wagtail_blocks.StructBlock([
                ("title", wagtail_blocks.CharBlock()),
                ("formula", wagtail_blocks.TextBlock(help_text="LaTeX or plain text")),
                ("explanation", wagtail_blocks.RichTextBlock()),
            ], label="Formula explanation")),
            ("use_cases", wagtail_blocks.ListBlock(
                wagtail_blocks.StructBlock([
                    ("title", wagtail_blocks.CharBlock()),
                    ("description", wagtail_blocks.TextBlock()),
                ]),
                label="Use cases",
            )),
            ("faq", wagtail_blocks.ListBlock(
                wagtail_blocks.StructBlock([
                    ("question", wagtail_blocks.CharBlock()),
                    ("answer", wagtail_blocks.RichTextBlock()),
                ]),
                label="FAQ",
            )),
            ("image", ImageChooserBlock()),
            ("paragraph", wagtail_blocks.RichTextBlock()),
        ],
        use_json_field=True,
        blank=True,
    )

    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel("category"),
            FieldPanel("calculator_slug"),
            FieldPanel("icon"),
            FieldPanel("is_featured"),
        ], heading="Tool settings"),
        FieldPanel("hero_image"),
        FieldPanel("body"),
    ]

    api_fields = [
        APIField("category"),
        APIField("calculator_slug"),
        APIField("icon"),
        APIField("is_featured"),
        APIField("body"),
        APIField("hero_image_thumbnail", serializer=ImageRenditionField("fill-800x400")),
    ]

    parent_page_types = ["tools.ToolIndexPage"]
    subpage_types = []

    class Meta:
        verbose_name = "Calculator tool"
        ordering = ["title"]
