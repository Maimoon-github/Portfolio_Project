"""
News models for announcements and updates.
"""

from django.db import models
from lms_backend.core.models import BaseContentModel


class NewsCategory(models.Model):
    """Category model for news items."""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    
    class Meta:
        verbose_name_plural = 'news categories'
        ordering = ['name']
    
    def __str__(self):
        return self.name


class NewsItem(BaseContentModel):
    """News item model for announcements and updates."""
    
    # Priority choices
    PRIORITY_CHOICES = (
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    )
    
    body = models.TextField()
    source_url = models.URLField(blank=True)
    source_name = models.CharField(max_length=100, blank=True)
    category = models.ForeignKey(NewsCategory, on_delete=models.PROTECT)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    featured = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-priority', '-published_at']
    
    def __str__(self):
        return self.title
    
    def get_content_for_seo_analysis(self):
        """Return news body for SEO analysis."""
        return self.body
    
    def get_excerpt(self):
        """Get news excerpt for meta description."""
        # Get first 200 characters of body
        return self.body[:200] + ('...' if len(self.body) > 200 else '')
    
    def get_absolute_url(self):
        """Generate frontend URL for this news item."""
        return f"/news/{self.slug}/"
