# apps/blog/models.py
from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django.contrib.auth.models import User
from core.mixins import TimestampMixin, SEOMixin
from core.utils import sanitize_html

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=60, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Post(TimestampMixin, SEOMixin, models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=275, unique=True, blank=True)
    body = models.TextField()
    excerpt = models.TextField(blank=True, help_text="Optional short summary")
    read_time = models.PositiveIntegerField(editable=False, default=0)
    featured = models.BooleanField(default=False)
    published_date = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.PROTECT, related_name='blog_posts')
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='posts')
    tags = models.ManyToManyField(Tag, blank=True, related_name='posts')

    def save(self, *args, **kwargs):
        # Sanitize body
        self.body = sanitize_html(self.body)
        # Auto-generate excerpt if not provided
        if not self.excerpt and self.body:
            self.excerpt = self.body[:200] + '...'
        # Compute read time (average 200 words per minute)
        word_count = len(self.body.split())
        self.read_time = max(1, round(word_count / 200))
        # Auto-slug if missing
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-published_date']

class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='blog/')
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']