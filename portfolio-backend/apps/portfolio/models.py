from django.db import models
from django.utils.text import slugify
from apps.core.models import TimeStampedModel, SEOModel  # Abstract bases as specified in Phase 1

class Project(TimeStampedModel, SEOModel):
    """
    Portfolio project model. Inherits timestamps + SEO fields from core.
    Used for projects page, home featured grid, and detail views.
    """
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, max_length=255)
    description = models.TextField(help_text="Short description for cards")
    long_description = models.TextField(blank=True, help_text="Full project details")
    thumbnail = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Project thumbnail (optimized via Wagtail)"
    )
    demo_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    tech_stack = models.JSONField(default=list, blank=True)  # e.g. ["Next.js", "Django", "TypeScript"]
    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    published_at = models.DateField()

    class Meta:
        ordering = ["order", "-published_at"]
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)[:200]
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Skill(TimeStampedModel):
    """
    Skills for About page summary and skills section.
    """
    CATEGORY_CHOICES = [
        ("frontend", "Frontend"),
        ("backend", "Backend"),
        ("tools", "Tools & DevOps"),
        ("design", "Design & UX"),
    ]
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    proficiency = models.PositiveIntegerField(default=80, help_text="0-100")
    icon = models.CharField(max_length=50, blank=True)  # Lucide icon name
    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Skill"
        verbose_name_plural = "Skills"

    def __str__(self):
        return self.name


class Experience(TimeStampedModel):
    """
    Timeline entries for About page.
    """
    position = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    company_url = models.URLField(blank=True)
    location = models.CharField(max_length=100, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True)
    current = models.BooleanField(default=False)
    tech_stack = models.JSONField(default=list, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["-start_date", "order"]
        verbose_name = "Experience"
        verbose_name_plural = "Experiences"

    def __str__(self):
        return f"{self.position} at {self.company}"