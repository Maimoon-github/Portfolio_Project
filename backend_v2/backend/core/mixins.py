from django.db import models
from django.utils.text import slugify
from django.core.exceptions import ImproperlyConfigured


class TimestampMixin(models.Model):
    """
    Provides automatic timestamp fields: created_at (indexed) and updated_at.
    """

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SlugMixin(models.Model):
    """
    Provides a unique slug field and automatic slug generation from title or name.
    The slug is generated only if not already set; expects the concrete model
    to have a 'title' or 'name' attribute.
    """

    slug = models.SlugField(max_length=255, unique=True, blank=True)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if not self.slug:
            source = getattr(self, 'title', None) or getattr(self, 'name', None)
            if not source:
                raise ImproperlyConfigured(
                    f"{self.__class__.__name__} must have a 'title' or 'name' field "
                    "to auto-generate slug when slug is empty."
                )
            self.slug = slugify(source)[:255]
        super().save(*args, **kwargs)


class SEOMixin(SlugMixin):
    """
    Extends SlugMixin with basic SEO metadata fields: meta_title and meta_desc.
    Inherits slug behavior from SlugMixin.
    """

    meta_title = models.CharField(max_length=60, blank=True)
    meta_desc = models.CharField(max_length=160, blank=True)

    class Meta:
        abstract = True