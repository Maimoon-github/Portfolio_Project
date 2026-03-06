from django.db import models
from core.mixins import TimestampMixin

class SkillCategory(TimestampMixin):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    order = models.PositiveSmallIntegerField(default=0, help_text="Display order")

    class Meta:
        ordering = ['order', 'name']
        verbose_name = "Skill Category"
        verbose_name_plural = "Skill Categories"

    def __str__(self):
        return self.name

class Skill(TimestampMixin):
    PROFICIENCY_CHOICES = [
        (1, "Beginner"),
        (2, "Elementary"),
        (3, "Intermediate"),
        (4, "Advanced"),
        (5, "Expert"),
    ]

    name = models.CharField(max_length=100)
    category = models.ForeignKey(
        SkillCategory,
        on_delete=models.CASCADE,
        related_name='skills'
    )
    proficiency = models.PositiveSmallIntegerField(
        choices=PROFICIENCY_CHOICES,
        default=3,
        help_text="Self-rated proficiency level"
    )
    icon = models.CharField(max_length=50, blank=True, help_text="Icon class name (e.g., Font Awesome)")
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['category__order', 'order', 'name']
        unique_together = [['name', 'category']]
        verbose_name = "Skill"
        verbose_name_plural = "Skills"

    def __str__(self):
        return self.name

class Experience(TimestampMixin):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=100, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    current = models.BooleanField(default=False, help_text="Currently working here")
    description = models.TextField()
    achievements = models.TextField(blank=True, help_text="Key accomplishments (bullet points)")
    order = models.PositiveSmallIntegerField(default=0, help_text="Display order (newest first)")

    class Meta:
        ordering = ['-start_date', 'order']
        verbose_name = "Experience"
        verbose_name_plural = "Experiences"

    def __str__(self):
        return f"{self.title} at {self.company}"

class Education(TimestampMixin):
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    location = models.CharField(max_length=100, blank=True)
    start_date = models.DateField() 
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField(blank=True, help_text="Additional details (honors, thesis, etc.)")
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['-start_date', 'order']
        verbose_name = "Education"
        verbose_name_plural = "Educations"

    def __str__(self):
        return f"{self.degree} at {self.institution}"

class Certification(TimestampMixin):
    name = models.CharField(max_length=200)
    issuing_organization = models.CharField(max_length=200)
    issue_date = models.DateField()
    expiration_date = models.DateField(null=True, blank=True)
    credential_id = models.CharField(max_length=100, blank=True)
    credential_url = models.URLField(blank=True, verbose_name="Verification URL")
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['-issue_date', 'order']
        verbose_name = "Certification"
        verbose_name_plural = "Certifications"

    def __str__(self):
        return self.name