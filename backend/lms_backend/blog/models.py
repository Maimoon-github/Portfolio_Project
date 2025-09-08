"""
Blog models for the LMS backend.
"""

from django.db import models
from django.conf import settings
from lms_backend.core.models import BaseContentModel
from lms_backend.courses.models import Category, Tag


class BlogPost(BaseContentModel):
    """Blog post model."""
    
    excerpt = models.TextField(max_length=300)
    content = models.TextField()
    cover_image = models.ImageField(upload_to='blog_covers/', blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    categories = models.ManyToManyField(Category, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    reading_time_minutes = models.IntegerField(null=True, blank=True)
    featured = models.BooleanField(default=False)
    allow_comments = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-published_at', 'title']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # Calculate reading time if content is provided
        if self.content and not self.reading_time_minutes:
            # Estimate reading time (average reading speed: 200 words per minute)
            word_count = len(self.content.split())
            self.reading_time_minutes = max(1, round(word_count / 200))
            
        super().save(*args, **kwargs)
    
    def get_content_for_seo_analysis(self):
        """Return blog content for SEO analysis."""
        return self.content
    
    def get_excerpt(self):
        """Get blog excerpt for meta description."""
        return self.excerpt
