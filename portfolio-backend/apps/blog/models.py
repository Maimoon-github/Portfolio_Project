from django.db import models
from wagtail.models import Page
from wagtail.fields import RichTextField, StreamField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.search import index
from wagtail.blocks import RichTextBlock
from wagtail.images.blocks import ImageChooserBlock
from wagtail.snippets.models import register_snippet
from modelcluster.fields import ParentalKey
from modelcluster.contrib.taggit import ClusterTaggableManager
from taggit.models import TaggedItemBase
from apps.core.models import TimeStampedModel, SEOModel  # Reuse existing abstract bases


@register_snippet
class BlogCategory(models.Model):
    """Wagtail snippet for blog post categories."""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=100)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name = "Blog Category"
        verbose_name_plural = "Blog Categories"

    def __str__(self):
        return self.name


class BlogPostTag(TaggedItemBase):
    """Through model for tags on BlogPost."""
    content_object = ParentalKey("BlogPost", related_name="tagged_items", on_delete=models.CASCADE)


class BlogIndexPage(Page):
    """Blog index page that lists all published posts."""
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
    ]

    subpage_types = ["blog.BlogPost"]

    class Meta:
        verbose_name = "Blog Index Page"


class BlogPost(Page, SEOModel, TimeStampedModel):
    """Full blog post page with all required fields."""
    subtitle = models.CharField(max_length=255, blank=True)
    hero_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    intro = models.TextField(max_length=500, blank=True)
    body = StreamField([
        ("paragraph", RichTextBlock()),
        ("image", ImageChooserBlock()),
    ], use_json_field=True, blank=True)

    # Taxonomy
    category = models.ForeignKey(
        BlogCategory,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="posts",
    )
    tags = ClusterTaggableManager(through=BlogPostTag, blank=True)

    # Auto-calculated
    reading_time = models.PositiveIntegerField(editable=False, default=0)

    # SEO extras (inherits seo_title/search_description from SEOModel + Page)
    og_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    canonical_url = models.URLField(blank=True)

    # Search
    search_fields = Page.search_fields + [
        index.SearchField("subtitle"),
        index.SearchField("intro"),
        index.SearchField("body"),
    ]

    content_panels = Page.content_panels + [
        FieldPanel("subtitle"),
        FieldPanel("hero_image"),
        FieldPanel("intro"),
        FieldPanel("body"),
        MultiFieldPanel([
            FieldPanel("category"),
            FieldPanel("tags"),
        ], heading="Taxonomy"),
    ]

    promote_panels = Page.promote_panels + [
        FieldPanel("og_image"),
        FieldPanel("canonical_url"),
    ]

    def save(self, *args, **kwargs):
        """Auto-calculate reading time from body content."""
        if self.body:
            text = str(self.body).replace("<", " ").replace(">", " ")
            word_count = len(text.split())
            self.reading_time = max(1, word_count // 200)
        super().save(*args, **kwargs)

    def get_hero_image_url(self) -> str | None:
        """Optimized hero image for frontend."""
        if self.hero_image:
            rendition = self.hero_image.get_rendition("fill-1200x630|format-webp|webpquality-90")
            return rendition.url
        return None

    def get_og_image_url(self) -> str | None:
        """OG image fallback to hero_image."""
        if self.og_image:
            rendition = self.og_image.get_rendition("fill-1200x630|format-webp|webpquality-90")
            return rendition.url
        return self.get_hero_image_url()

    class Meta:
        verbose_name = "Blog Post"
        verbose_name_plural = "Blog Posts"