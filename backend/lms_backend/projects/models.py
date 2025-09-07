"""
Project models for portfolio showcase.
"""

from django.db import models
from lms_backend.core.models import BaseContentModel


class Technology(models.Model):
    """Technology model for project tech stack."""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50, blank=True)
    
    class Meta:
        verbose_name_plural = 'technologies'
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Project(BaseContentModel):
    """Project model for portfolio."""
    
    # Project type choices
    PROJECT_TYPE_CHOICES = (
        ('web', 'Web Development'),
        ('mobile', 'Mobile Application'),
        ('desktop', 'Desktop Application'),
        ('ml', 'Machine Learning'),
        ('data', 'Data Science'),
    )
    
    # Difficulty level choices
    DIFFICULTY_CHOICES = (
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    )
    
    summary = models.CharField(max_length=300)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to='project_thumbnails/')
    tech_stack = models.ManyToManyField(Technology)
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    demo_video = models.URLField(blank=True)
    project_type = models.CharField(max_length=10, choices=PROJECT_TYPE_CHOICES)
    completion_date = models.DateField(null=True, blank=True)
    featured = models.BooleanField(default=False)
    difficulty = models.CharField(max_length=15, choices=DIFFICULTY_CHOICES, default='intermediate')
    
    class Meta:
        ordering = ['-featured', '-completion_date']
    
    def __str__(self):
        return self.title
    
    def get_content_for_seo_analysis(self):
        """Return project description for SEO analysis."""
        return self.description
    
    def get_excerpt(self):
        """Get project excerpt for meta description."""
        return self.summary
