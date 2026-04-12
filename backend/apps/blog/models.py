from django.db import models
from django.utils.text import slugify
from wagtail.models import Page
from wagtail.fields import StreamField, RichTextField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.api import APIField
from wagtail.images.api.fields import ImageRenditionField
from wagtail import blocks as wagtail_blocks
from wagtail.images.blocks import ImageChooserBlock
from wagtail.embeds.blocks import EmbedBlock
from modelcluster.fields import ParentalManyToManyField
from taggit.models import TaggedItemBase
from modelcluster.contrib.taggit import ClusterTaggableManager
import json


class BlogIndexPage(Page):
    """
    The /blog/ landing page. Lists all BlogDetailPage children.
    Parent: RootPage. Children: BlogDetailPage.
    """
    intro = RichTextField(blank=True)
    hero_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
        FieldPanel("hero_image"),
    ]

    # Wagtail API fields — these are the fields exposed to Next.js
    api_fields = [
        APIField("intro"),
        APIField("hero_image_url", serializer=ImageRenditionField("fill-1200x600")),
    ]

    subpage_types = ["blog.BlogDetailPage"]

    class Meta:
        verbose_name = "Blog index"

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context["posts"] = (
            BlogDetailPage.objects.live()
            .descendant_of(self)
            .order_by("-first_published_at")
        )
        return context


class BlogDetailPage(Page):
    """
    Individual blog post. Rendered by Next.js via ISR + Wagtail headless API.
    """
    # ─── Metadata ──────────────────────────────────────────────────
    subtitle = models.CharField(max_length=250, blank=True)
    reading_time = models.PositiveSmallIntegerField(default=5, help_text="Minutes")
    hero_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    tags = ClusterTaggableManager(through="blog.BlogPageTag", blank=True)
    category = models.CharField(max_length=100, blank=True, db_index=True)

    # ─── Body (StreamField) ────────────────────────────────────────
    body = StreamField(
        [
            ("heading", wagtail_blocks.CharBlock(form_classname="title", icon="title")),
            ("paragraph", wagtail_blocks.RichTextBlock(features=[
                "h2", "h3", "bold", "italic", "link", "ol", "ul", "blockquote", "code",
            ])),
            ("image", ImageChooserBlock()),
            ("code", wagtail_blocks.StructBlock([
                ("language", wagtail_blocks.CharBlock(default="python")),
                ("code", wagtail_blocks.TextBlock()),
            ], icon="code")),
            ("callout", wagtail_blocks.StructBlock([
                ("type", wagtail_blocks.ChoiceBlock(choices=[
                    ("info", "Info"), ("warning", "Warning"), ("tip", "Tip"),
                ])),
                ("text", wagtail_blocks.RichTextBlock()),
            ], icon="info-circle")),
            ("embed", EmbedBlock(icon="media")),
            ("raw_html", wagtail_blocks.RawHTMLBlock(icon="code", label="Raw HTML (use sparingly)")),
        ],
        use_json_field=True,
        blank=True,
    )

    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel("subtitle"),
            FieldPanel("reading_time"),
            FieldPanel("category"),
            FieldPanel("tags"),
        ], heading="Post metadata"),
        FieldPanel("hero_image"),
        FieldPanel("body"),
    ]

    promote_panels = Page.promote_panels  # includes seo_title, search_description

    api_fields = [
        APIField("subtitle"),
        APIField("reading_time"),
        APIField("category"),
        APIField("hero_image_thumbnail", serializer=ImageRenditionField("fill-800x400")),
        APIField("hero_image_og", serializer=ImageRenditionField("fill-1200x630")),
        APIField("body"),
        APIField("tags"),
    ]

    parent_page_types = ["blog.BlogIndexPage"]
    subpage_types = []

    class Meta:
        verbose_name = "Blog post"
        ordering = ["-first_published_at"]


class BlogPageTag(TaggedItemBase):
    content_object = models.ForeignKey(BlogDetailPage, on_delete=models.CASCADE, related_name="tagged_items")
