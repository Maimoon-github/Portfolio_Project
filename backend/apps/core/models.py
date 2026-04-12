"""
Abstract base models shared across all apps.
"""
from django.db import models


class TimeStampedModel(models.Model):
    """Adds created_at and updated_at to any model."""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SEOModel(models.Model):
    """
    Mixin for pages/objects that need SEO metadata.
    For Wagtail pages, rely on Page.seo_title / search_description instead.
    Use this for DRF-served non-Wagtail objects.
    """
    meta_title = models.CharField(max_length=60, blank=True)
    meta_description = models.CharField(max_length=160, blank=True)
    og_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    class Meta:
        abstract = True