# backend/apps/core/models.py
"""
Shared abstract base models for the entire project.

These models are designed to be used via multiple inheritance (composition)
in any concrete model that needs timestamps or SEO fields.
"""
from django.db import models


class TimeStampedModel(models.Model):
    """
    Adds automatic created_at / updated_at timestamps to any model.

    Why? Eliminates boilerplate in every model while ensuring consistent
    audit fields across the entire project.
    """
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Timestamp when this record was first created.",
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        help_text="Timestamp when this record was last updated.",
    )

    class Meta:
        abstract = True


class SEOModel(models.Model):
    """
    SEO metadata mixin for non-Wagtail models.

    For Wagtail Page subclasses, use the built-in Page.seo_title and
    Page.search_description instead. This model is intended only for
    DRF-served objects (e.g. future API-only resources).
    """
    meta_title = models.CharField(
        max_length=60,
        blank=True,
        help_text="SEO title (max 60 chars recommended for Google).",
    )
    meta_description = models.CharField(
        max_length=160,
        blank=True,
        help_text="SEO meta description (max 160 chars recommended).",
    )
    og_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Open Graph / social sharing image.",
    )

    class Meta:
        abstract = True