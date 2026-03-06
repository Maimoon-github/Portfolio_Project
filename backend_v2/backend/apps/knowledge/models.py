# apps/knowledge/models.py
from django.db import models
from django.contrib.auth.models import User
from core.mixins import TimestampMixin, SEOMixin

class Course(TimestampMixin, SEOMixin):
    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='beginner')
    estimated_hours = models.PositiveSmallIntegerField(help_text="Approximate time to complete")
    featured = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['difficulty', 'order', 'title']
        verbose_name = "Course"
        verbose_name_plural = "Courses"

    def __str__(self):
        return self.title

class Lesson(TimestampMixin):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    content = models.TextField(blank=True, help_text="Lesson content (markdown or HTML)")
    video_url = models.URLField(blank=True, help_text="Optional video URL")
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']
        unique_together = [['course', 'order']]
        verbose_name = "Lesson"
        verbose_name_plural = "Lessons"

    def __str__(self):
        return f"{self.course.title} - {self.title}"

class ToolCategory(TimestampMixin):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = "Tool Category"
        verbose_name_plural = "Tool Categories"

    def __str__(self):
        return self.name

class Tool(TimestampMixin, SEOMixin):
    category = models.ForeignKey(ToolCategory, on_delete=models.CASCADE, related_name='tools')
    name = models.CharField(max_length=100)
    description = models.TextField()
    website_url = models.URLField(blank=True)
    logo = models.ImageField(upload_to='tools/', blank=True, null=True)
    featured = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['category__order', 'order', 'name']
        unique_together = [['name', 'category']]
        verbose_name = "Tool"
        verbose_name_plural = "Tools"

    def __str__(self):
        return self.name

class Resource(TimestampMixin):
    title = models.CharField(max_length=200)
    url = models.URLField()
    description = models.TextField(blank=True)
    resource_type = models.CharField(
        max_length=50,
        choices=[
            ('article', 'Article'),
            ('video', 'Video'),
            ('book', 'Book'),
            ('course', 'Course'),
            ('tool', 'Tool'),
        ],
        default='article'
    )
    tags = models.CharField(max_length=200, blank=True, help_text="Comma-separated tags")
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order', 'title']
        verbose_name = "Resource"
        verbose_name_plural = "Resources"

    def __str__(self):
        return self.title