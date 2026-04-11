# cms/models.py

from django.db import models
from django.utils import timezone

from modelcluster.fields import ParentalKey
from modelcluster.contrib.taggit import ClusterTaggableManager
from taggit.models import TaggedItemBase

from wagtail.models import Page
from wagtail.fields import RichTextField, StreamField
from wagtail.admin.panels import (
    FieldPanel, MultiFieldPanel,
    TabbedInterface, ObjectList,
)
from wagtail.search import index
from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock
from wagtail.api import APIField  # <- Import APIField

from wagtailseo.models import SeoMixin

# from .serializers import BlogAuthorSerializer  # <- Import the serializer


# ─────────────────────────────────────────────────────────────────
# Author Snippet  (reusable author profile across posts)
# ─────────────────────────────────────────────────────────────────
class BlogAuthor(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    photo = models.ForeignKey(
        'wagtailimages.Image',
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
    )
    twitter = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'cms'               # Ensures correct admin grouping
        verbose_name = 'Blog Author'    # Combined Meta class
        verbose_name_plural = 'Blog Authors'


# ─────────────────────────────────────────────────────────────────
# Tag through model
# ─────────────────────────────────────────────────────────────────
class BlogPageTag(TaggedItemBase):
    content_object = ParentalKey(
        'BlogPage',
        related_name='tagged_items',
        on_delete=models.CASCADE,
    )


# ─────────────────────────────────────────────────────────────────
# Blog Index Page  (e.g. /blog/)
# ─────────────────────────────────────────────────────────────────
class BlogIndexPage(SeoMixin, Page):
    intro = RichTextField(blank=True)
    subpage_types = ['cms.BlogPage']

    content_panels = Page.content_panels + [
        FieldPanel('intro'),
    ]

    promote_panels = SeoMixin.seo_panels

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context['posts'] = (
            BlogPage.objects
            .live()
            .descendant_of(self)
            .order_by('-date_published')
        )
        return context

    class Meta:
        verbose_name = 'Blog Index Page'


# ─────────────────────────────────────────────────────────────────
# Blog Post Page  (e.g. /blog/my-post-title/)
# ─────────────────────────────────────────────────────────────────
class BlogPage(SeoMixin, Page):
    # ── Content fields ────────────────────────────────────────────
    date_published = models.DateField(
        "Published date",
        default=timezone.now,
    )
    author = models.ForeignKey(
        BlogAuthor,
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='posts',
    )
    category = models.CharField(max_length=100, blank=True)
    tags = ClusterTaggableManager(through=BlogPageTag, blank=True)
    featured_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
    )
    excerpt = models.TextField(
        blank=True,
        max_length=300,
        help_text="Short summary shown in listings. Used as meta description fallback.",
    )

    # ── StreamField body ──────────────────────────────────────────
    body = StreamField([
        ('heading', blocks.CharBlock(
            form_classname='title',
            icon='title',
        )),
        ('subheading', blocks.CharBlock(icon='title')),
        ('paragraph', blocks.RichTextBlock(
            features=[
                'h2', 'h3', 'bold', 'italic', 'link',
                'ol', 'ul', 'blockquote', 'image',
            ]
        )),
        ('image', blocks.StructBlock([
            ('image', ImageChooserBlock()),
            ('caption', blocks.CharBlock(required=False)),
            ('alignment', blocks.ChoiceBlock(choices=[
                ('left', 'Left'), ('center', 'Center'), ('right', 'Right'),
            ], default='center')),
        ], icon='image')),
        ('quote', blocks.StructBlock([
            ('text', blocks.TextBlock()),
            ('attribution', blocks.CharBlock(required=False)),
        ], icon='openquote')),
        ('code', blocks.StructBlock([
            ('language', blocks.ChoiceBlock(choices=[
                ('python', 'Python'), ('javascript', 'JavaScript'),
                ('typescript', 'TypeScript'), ('bash', 'Bash'),
                ('json', 'JSON'), ('css', 'CSS'), ('html', 'HTML'),
            ])),
            ('code', blocks.TextBlock()),
            ('filename', blocks.CharBlock(required=False)),
        ], icon='code')),
        ('callout', blocks.StructBlock([
            ('type', blocks.ChoiceBlock(choices=[
                ('info', 'Info'), ('warning', 'Warning'),
                ('success', 'Success'), ('danger', 'Danger'),
            ])),
            ('text', blocks.RichTextBlock()),
        ], icon='pick')),
        ('embed', blocks.URLBlock(
            help_text='YouTube, Vimeo, CodePen embed URL',
            icon='media',
        )),
    ], use_json_field=True)

    # ── Computed: reading time ─────────────────────────────────────
    @property
    def reading_time_minutes(self):
        total_words = 0
        for block in self.body:
            if hasattr(block.value, 'source'):
                total_words += len(str(block.value.source).split())
            else:
                total_words += len(str(block.value).split())
        return max(1, round(total_words / 200))

    # ── Related posts ─────────────────────────────────────────────
    def get_related_posts(self, count=3):
        return (
            BlogPage.objects.live()
            .exclude(pk=self.pk)
            .filter(category=self.category)
            .order_by('-date_published')[:count]
        )

    # ── Page hierarchy ────────────────────────────────────────────
    parent_page_types = ['cms.BlogIndexPage']
    subpage_types = []

    # ── Search index ──────────────────────────────────────────────
    search_fields = Page.search_fields + [
        index.SearchField('excerpt'),
        index.SearchField('body'),
        index.FilterField('date_published'),
        index.FilterField('category'),
        index.RelatedFields('author', [
            index.SearchField('name'),
        ]),
    ]

    # ── Admin panels ──────────────────────────────────────────────
    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel('date_published'),
            FieldPanel('author'),
        ], heading='Author & Date'),
        MultiFieldPanel([
            FieldPanel('category'),
            FieldPanel('tags'),
        ], heading='Categorization'),
        FieldPanel('featured_image'),
        FieldPanel('excerpt'),
        FieldPanel('body'),
    ]

    # SEO tab: Yoast-style panel from wagtail-seo
    promote_panels = SeoMixin.seo_panels

    edit_handler = TabbedInterface([
        ObjectList(content_panels, heading='Content'),
        ObjectList(promote_panels, heading='SEO & Promotion'),
    ])

    # ── API fields for headless CMS ──────────────────────────────
    # This tells Wagtail which fields to include in the API response
    api_fields = [
        APIField('date_published'),
        APIField('author', serializer='cms.serializers.BlogAuthorSerializer'),  # Use string path
        APIField('category'),
        APIField('tags'),
        APIField('featured_image'),
        APIField('excerpt'),
        APIField('body'),
        APIField('reading_time_minutes'),
    ]

    class Meta:
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'
        ordering = ['-date_published']