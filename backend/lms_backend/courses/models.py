"""
Course models for the LMS backend.
"""

from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.utils import timezone
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


class Lesson(BaseContentModel):
    """
    Lesson model for course content.
    """
    
    # Lesson type choices
    LESSON_TYPE_CHOICES = (
        ('video', 'Video Lesson'),
        ('text', 'Text Lesson'),
        ('quiz', 'Quiz'),
        ('assignment', 'Assignment'),
    )
    
    # Basic lesson info
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    lesson_type = models.CharField(max_length=20, choices=LESSON_TYPE_CHOICES, default='video')
    content = models.TextField()
    
    # Media content
    video_url = models.URLField(blank=True)
    duration_minutes = models.PositiveIntegerField(default=0)
    
    # Ordering
    order = models.PositiveIntegerField(default=0)
    
    # Required to complete
    is_required = models.BooleanField(default=True)
    
    # Access control
    is_preview = models.BooleanField(default=False, help_text="Available in course preview")
    
    class Meta:
        ordering = ['course', 'order', 'title']
    
    def __str__(self):
        return f"{self.course.title} - {self.title}"
    
    def get_content_for_seo_analysis(self):
        """Return lesson content for SEO analysis."""
        return self.content
    
    def get_excerpt(self):
        """Get lesson excerpt for meta description."""
        return self.content[:200] + ('...' if len(self.content) > 200 else '')


class LessonCompletion(models.Model):
    """
    Tracks which lessons a student has completed.
    """
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='completions')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='completed_lessons')
    completed_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['lesson', 'user']
        ordering = ['completed_at']
    
    def __str__(self):
        return f"{self.user} completed {self.lesson}"


class Enrollment(models.Model):
    """
    Student enrollment in a course.
    """
    # Status choices
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('expired', 'Expired'),
        ('refunded', 'Refunded'),
    )
    
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='enrollments')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    enrolled_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    # Payment information
    payment_id = models.CharField(max_length=100, blank=True)
    amount_paid = models.IntegerField(default=0)  # in cents
    
    # Progress tracking
    progress_percent = models.IntegerField(default=0)
    last_accessed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        unique_together = ['course', 'user']
        ordering = ['-enrolled_at']
    
    def __str__(self):
        return f"{self.user} enrolled in {self.course}"
        
    def update_progress(self):
        """Update the user's progress in this course."""
        total_lessons = self.course.lessons.filter(is_required=True).count()
        if total_lessons == 0:
            self.progress_percent = 100
            return
            
        completed_lessons = LessonCompletion.objects.filter(
            user=self.user,
            lesson__course=self.course,
            lesson__is_required=True
        ).count()
        
        self.progress_percent = int((completed_lessons / total_lessons) * 100)
        self.save(update_fields=['progress_percent'])
        
        # Mark as completed if 100%
        if self.progress_percent == 100 and not self.completed_at:
            self.completed_at = timezone.now()
            self.status = 'completed'
            self.save(update_fields=['completed_at', 'status'])


class Review(models.Model):
    """
    Course review by enrolled students.
    """
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['course', 'user']
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user} review for {self.course}"
        
    def clean(self):
        """Validate the rating is between 1 and 5."""
        if self.rating < 1 or self.rating > 5:
            raise ValidationError({'rating': 'Rating must be between 1 and 5.'})
