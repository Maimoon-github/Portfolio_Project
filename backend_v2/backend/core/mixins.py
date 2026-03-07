from django.db import models
from django.utils.text import slugify
from django.core.exceptions import ImproperlyConfigured


class TimestampMixin(models.Model):
    """
    Provides automatic timestamp fields: created_at (indexed) and updated_at.

    Convenience properties allow using `published_date`/`updated_date` aliases
    so models using this mixin can be backward-compatible with legacy tests or
    serializers that expect those attributes.
    """

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    @property
    def published_date(self):
        # alias for created_at, used in filters and API contracts
        return self.created_at

    @property
    def updated_date(self):
        # alias for updated_at
        return self.updated_at


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
    Extends SlugMixin with basic SEO metadata fields: meta_title, meta_desc
    (description), and meta_keywords.  Includes convenience helper methods
    and alias properties used by tests and frontend consumers.
    """

    meta_title = models.CharField(max_length=60, blank=True)
    meta_desc = models.CharField(max_length=160, blank=True)
    meta_keywords = models.CharField(max_length=255, blank=True)

    class Meta:
        abstract = True

    # alias for legacy attribute
    @property
    def meta_description(self):
        return self.meta_desc

    @meta_description.setter
    def meta_description(self, value):
        self.meta_desc = value

    def get_meta_title(self):
        return self.meta_title or ""

    def get_meta_description(self):
        return self.meta_desc or ""

    def get_meta_keywords(self):
        return self.meta_keywords or ""

    def get_meta_robots(self):
        return "index, follow"