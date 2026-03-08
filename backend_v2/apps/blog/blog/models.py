from django.conf import settings
from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.utils.text import slugify


class Category(models.Model):
    """Blog post category."""

    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "category"
        verbose_name_plural = "categories"
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def get_absolute_url(self) -> str:
        return reverse("blog:category_posts", kwargs={"category_slug": self.slug})


class Tag(models.Model):
    """Lightweight tag for posts."""

    name = models.CharField(max_length=60, unique=True)
    slug = models.SlugField(max_length=60, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def get_absolute_url(self) -> str:
        return reverse("blog:tag_posts", kwargs={"tag_slug": self.slug})


class PublishedManager(models.Manager):
    """Returns only published posts with publish_date <= now."""

    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .filter(status="published", publish_date__lte=timezone.now())
        )


class Post(models.Model):
    """Blog post with draft/published/scheduled workflow."""

    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"
        SCHEDULED = "scheduled", "Scheduled"

    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250, unique_for_date="publish_date")
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="blog_posts",
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="posts",
    )
    tags = models.ManyToManyField(Tag, blank=True, related_name="posts")
    content = models.TextField()
    excerpt = models.TextField(max_length=500, blank=True, help_text="Short summary for listings and SEO.")
    featured_image = models.ImageField(upload_to="posts/%Y/%m/", blank=True)
    status = models.CharField(
        max_length=10, choices=Status.choices, default=Status.DRAFT, db_index=True
    )
    publish_date = models.DateTimeField(default=timezone.now, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    view_count = models.PositiveIntegerField(default=0)

    # SEO fields
    meta_title = models.CharField(max_length=70, blank=True, help_text="Override title tag (max 70 chars).")
    meta_description = models.CharField(max_length=160, blank=True, help_text="Meta description (max 160 chars).")

    # Managers
    objects = models.Manager()  # Default
    published = PublishedManager()  # Post.published.all()

    class Meta:
        ordering = ["-publish_date"]
        indexes = [
            models.Index(fields=["-publish_date"]),
            models.Index(fields=["slug"]),
            models.Index(fields=["status", "-publish_date"]),
        ]

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
            # Ensure uniqueness
            original_slug = self.slug
            counter = 1
            while Post.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
                self.slug = f"{original_slug}-{counter}"
                counter += 1
        if not self.excerpt and self.content:
            self.excerpt = self.content[:497] + "..." if len(self.content) > 500 else self.content
        super().save(*args, **kwargs)

    def get_absolute_url(self) -> str:
        return reverse("blog:post_detail", kwargs={"slug": self.slug})

    def increment_views(self) -> None:
        """Atomic view counter increment."""
        Post.objects.filter(pk=self.pk).update(view_count=models.F("view_count") + 1)

    @property
    def is_published(self) -> bool:
        return self.status == self.Status.PUBLISHED and self.publish_date <= timezone.now()

    @property
    def seo_title(self) -> str:
        return self.meta_title or self.title

    @property
    def seo_description(self) -> str:
        return self.meta_description or self.excerpt[:160]

    @property
    def approved_comments_count(self) -> int:
        return self.comments.filter(approved=True).count()
