from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from core.mixins import TimestampMixin, SEOMixin
from core.utils import sanitize_html

class Category(TimestampMixin, SEOMixin):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Tag(TimestampMixin, SEOMixin):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name = "Tag"
        verbose_name_plural = "Tags"

    def __str__(self):
        return self.name

class Post(TimestampMixin, SEOMixin):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(User, on_delete=models.PROTECT, related_name='blog_posts')
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='posts')
    tags = models.ManyToManyField(Tag, related_name='posts', blank=True)
    published_date = models.DateTimeField(default=timezone.now, db_index=True)
    featured = models.BooleanField(default=False)
    read_time = models.PositiveSmallIntegerField(help_text="Estimated reading time in minutes")
    excerpt = models.CharField(max_length=150, help_text="Short summary for lists")
    body = models.TextField()

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Post"
        verbose_name_plural = "Posts"

    def save(self, *args, **kwargs):
        # Sanitize HTML content before saving
        self.body = sanitize_html(self.body)

        # Calculate read time based on word count (assuming 200 words per minute)
        word_count = len(self.body.split())
        self.read_time = max(1, round(word_count / 200))

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='blog/')
    caption = models.CharField(max_length=200, blank=True, help_text="Optional caption text")
    alt_text = models.CharField(max_length=200, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Post Image"
        verbose_name_plural = "Post Images"

    def __str__(self):
        return f"Image for {self.post.title}"