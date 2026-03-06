# core/mixins.py
from django.db import models
from django.utils import timezone
from django.utils.text import slugify

class TimestampMixin(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class SlugMixin(models.Model):
    slug = models.SlugField(max_length=255, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug and hasattr(self, 'get_slug_source'):
            source = self.get_slug_source()
            self.slug = slugify(source)
        super().save(*args, **kwargs)

    class Meta:
        abstract = True

class SEOMixin(models.Model):
    meta_title = models.CharField(max_length=255, blank=True)
    meta_description = models.TextField(blank=True)
    meta_keywords = models.CharField(max_length=255, blank=True)

    class Meta:
        abstract = True