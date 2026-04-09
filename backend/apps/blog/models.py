from django.conf import settings
from django.db import models
from django.db.models import F
from django.urls import reverse
from django.utils import timezone
from django.utils.text import slugify
from meta.models import ModelMeta  # Add django-meta

from core.mixins import TimestampMixin, SEOMixin
from core.utils import sanitize_html


class PublishedManager(models.Manager):
    """Returns only published posts with publish_date <= now."""

    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .filter(status="published", publish_date__lte=timezone.now())
        )


class Category(TimestampMixin, SEOMixin):
    """Blog post category with SEO support."""

    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("blog:category_posts", kwargs={"category_slug": self.slug})


class Tag(TimestampMixin, SEOMixin):
    """Lightweight tag for posts with SEO support."""

    name = models.CharField(max_length=60, unique=True)
    slug = models.SlugField(max_length=60, unique=True, blank=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Tag"
        verbose_name_plural = "Tags"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("blog:tag_posts", kwargs={"tag_slug": self.slug})


class Post(TimestampMixin, SEOMixin, ModelMeta):  # Add ModelMeta mixin
    """Blog post with draft/published/scheduled workflow, multiple images, and SEO."""

    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"
        SCHEDULED = "scheduled", "Scheduled"

    # Core fields
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250, unique_for_date="publish_date", blank=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="blog_posts",
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="posts",
    )
    tags = models.ManyToManyField(Tag, blank=True, related_name="posts")
    content = models.TextField(help_text="Main post content (HTML sanitized on save)")
    excerpt = models.TextField(
        max_length=500,
        blank=True,
        help_text="Short summary for listings and SEO (auto-generated if blank)."
    )
    featured_image = models.ImageField(upload_to="posts/%Y/%m/", blank=True)

    # Publishing & status
    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.DRAFT,
        db_index=True,
    )
    publish_date = models.DateTimeField(default=timezone.now, db_index=True)
    featured = models.BooleanField(default=False, help_text="Mark as featured post")

    # Statistics
    read_time = models.PositiveSmallIntegerField(
        editable=False,
        help_text="Estimated reading time in minutes (auto-calculated)"
    )
    view_count = models.PositiveIntegerField(default=0, editable=False)

    # Managers
    objects = models.Manager()  # default manager
    published = PublishedManager()  # Post.published.all()

    # django-meta configuration
    _metadata = {
        'title': 'get_meta_title',
        'description': 'get_meta_description',
        'og_description': 'get_meta_description',
        'image': 'get_meta_image',
        'url': 'get_absolute_url',
        'object_type': 'Article',
        'keywords': 'get_meta_keywords',
        'twitter_site': '@yourhandle',  # Update with your Twitter handle
        'twitter_creator': 'get_author_twitter',
    }

    class Meta:
        ordering = ["-publish_date"]
        verbose_name = "Post"
        verbose_name_plural = "Posts"
        indexes = [
            models.Index(fields=["-publish_date"]),
            models.Index(fields=["slug"]),
            models.Index(fields=["status", "-publish_date"]),
        ]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Slug generation with uniqueness check
        if not self.slug:
            self.slug = slugify(self.title)
            original_slug = self.slug
            counter = 1
            while Post.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
                self.slug = f"{original_slug}-{counter}"
                counter += 1

        # Auto-generate excerpt from content if missing
        if not self.excerpt and self.content:
            if len(self.content) > 497:
                self.excerpt = self.content[:497] + "..."
            else:
                self.excerpt = self.content

        # Sanitize HTML content before saving
        self.content = sanitize_html(self.content)

        # Calculate read time based on word count (assumes 200 words per minute)
        word_count = len(self.content.split())
        self.read_time = max(1, round(word_count / 200))

        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("blog:post_detail", kwargs={"slug": self.slug})

    def increment_views(self):
        """Atomic increment of view counter."""
        Post.objects.filter(pk=self.pk).update(view_count=F("view_count") + 1)

    @property
    def is_published(self):
        return self.status == self.Status.PUBLISHED and self.publish_date <= timezone.now()

    # django-meta methods
    def get_meta_title(self):
        """Return SEO title from PostSEO or fallback."""
        if hasattr(self, 'seo') and self.seo.seo_title:
            return self.seo.seo_title
        return self.meta_title or self.title

    def get_meta_description(self):
        """Return meta description from PostSEO or fallback."""
        if hasattr(self, 'seo') and self.seo.meta_description:
            return self.seo.meta_description
        return self.meta_description or self.excerpt[:160]

    def get_meta_image(self):
        """Return featured image URL for OG tags."""
        if self.featured_image:
            return self.featured_image.url
        return None

    def get_meta_keywords(self):
        """Return focus keyphrase as keywords."""
        if hasattr(self, 'seo') and self.seo.focus_keyphrase:
            return self.seo.focus_keyphrase
        return ''

    def get_author_twitter(self):
        """Return author's Twitter handle if available."""
        if hasattr(self.author, 'profile') and hasattr(self.author.profile, 'twitter_handle'):
            return self.author.profile.twitter_handle
        return '@yourhandle'  # Default fallback


class PostImage(models.Model):
    """Additional images for a blog post (gallery)."""

    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="blog/")
    caption = models.CharField(max_length=200, blank=True, help_text="Optional caption text")
    alt_text = models.CharField(max_length=200, blank=True, help_text="Alternative text for accessibility")
    order = models.PositiveSmallIntegerField(default=0, help_text="Display order (ascending)")

    class Meta:
        ordering = ["order"]
        verbose_name = "Post Image"
        verbose_name_plural = "Post Images"

    def __str__(self):
        return f"Image for {self.post.title}"