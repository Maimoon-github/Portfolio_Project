from django.db import models
from django.utils import timezone

class TimeStampedModel(models.Model):
    """
    Abstract base class that adds created_at and updated_at timestamps.
    """
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SEOModel(models.Model):
    """
    Abstract base class providing standard SEO fields (used by Wagtail pages too).
    """
    seo_title = models.CharField(max_length=255, blank=True)
    search_description = models.TextField(blank=True)

    class Meta:
        abstract = True