"""
Course models for the LMS backend.
"""

from django.db import models
from django.conf import settings
from lms_backend.core.models import BaseContentModel


class Category(models.Model):
    """Category model for courses, blog posts, etc."""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    
    class Meta:
        verbose_name_plural = 'categories'
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Tag(models.Model):
    """Tag model for courses, blog posts, etc."""
    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True)
    
    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Course(BaseContentModel):
    """Course model for LMS."""
    
    # Course level choices
    LEVEL_CHOICES = (
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    )
    
    # Basic course info
    subtitle = models.CharField(max_length=200, blank=True)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to='course_thumbnails/')
    price_cents = models.IntegerField(default=0)
    is_free = models.BooleanField(default=False)
    
    # Course details
    level = models.CharField(max_length=15, choices=LEVEL_CHOICES, default='beginner')
    language = models.CharField(max_length=10, default='en')
    duration_hours = models.DecimalField(max_digits=5, decimal_places=1)
    
    # Relationships
    instructor = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.PROTECT,
        limit_choices_to={'role': 'instructor'}
    )
    categories = models.ManyToManyField(Category, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    
    # Additional info
    prerequisites = models.TextField(blank=True)
    learning_outcomes = models.JSONField(default=list)
    certificate_available = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-published_at', 'title']
    
    def __str__(self):
        return self.title
    
    def get_content_for_seo_analysis(self):
        """Return course description for SEO analysis."""
        return self.description
    
    def get_excerpt(self):
        """Get course excerpt for meta description."""
        if self.subtitle:
            return self.subtitle
        
        # Get first 200 characters of description
        return self.description[:200] + ('...' if len(self.description) > 200 else '')


# Placeholder for models needed by health checks
class Lesson(models.Model):
    """Placeholder for Lesson model."""
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    
    def __str__(self):
        return self.title


class Enrollment(models.Model):
    """Placeholder for Enrollment model."""
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.user} enrolled in {self.course}"
