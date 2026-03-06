from django.db import models
from core.mixins import TimestampMixin, SEOMixin

class ProjectCategory(TimestampMixin, SEOMixin):
    """
    Lookup model for project categories.
    """
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = "Project Category"
        verbose_name_plural = "Project Categories"

    def __str__(self):
        return self.name


class TechTag(TimestampMixin, SEOMixin):
    """
    Lookup model for technology tags.
    """
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name = "Tech Tag"
        verbose_name_plural = "Tech Tags"

    def __str__(self):
        return self.name


class Project(TimestampMixin, SEOMixin):
    """
    Core project entity.
    """
    title = models.CharField(max_length=200)
    summary = models.TextField(max_length=500, help_text="Brief overview")
    description = models.TextField()

    categories = models.ManyToManyField(ProjectCategory, related_name='projects')
    tags = models.ManyToManyField(TechTag, related_name='projects', blank=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self):
        return self.title


class ProjectImage(TimestampMixin):
    """
    Gallery images for a project.
    """
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='projects/')
    alt_text = models.CharField(max_length=200, blank=True, help_text="Accessibility description")
    order = models.PositiveSmallIntegerField(default=0, help_text="Display order")

    class Meta:
        ordering = ['order']
        verbose_name = "Project Image"
        verbose_name_plural = "Project Images"

    def __str__(self):
        return f"Image for {self.project.title}"