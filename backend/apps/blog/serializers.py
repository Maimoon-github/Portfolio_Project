# backend/apps/blog/serializers.py
"""
Supplementary DRF serializers for the blog application.

These serializers mirror the shape of the Wagtail v2 Pages API responses.
They are NOT the primary data delivery mechanism — that is the Wagtail
headless API at /api/v2/pages/. Their purposes are:

1. OpenAPI schema generation via drf-spectacular (type documentation).
2. Typing reference for the frontend TypeScript types in
   frontend/src/lib/api/types.ts.
3. Any custom non-Wagtail REST endpoints added in future (e.g. a
   dedicated search endpoint that aggregates across multiple page types).

The primary data source for Next.js is always:
    GET /api/v2/pages/?type=blog.BlogDetailPage&fields=*
"""

from __future__ import annotations

# Standard Library
from typing import Any

# Third-Party
from rest_framework import serializers


class TagSerializer(serializers.Serializer):
    """
    Serializer for a single taggit Tag instance.

    Used as a nested serializer within BlogPostListSerializer to represent
    the tags array returned by the Wagtail Pages API.

    Fields:
        id: Primary key of the tag.
        name: Human-readable tag label (e.g. "Python").
        slug: URL-safe tag identifier (e.g. "python").
    """

    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(read_only=True)
    slug = serializers.CharField(read_only=True)


class BlogPostListSerializer(serializers.Serializer):
    """
    Read-only serializer mirroring the Wagtail v2 Pages API list response.

    Design decision — mirrors rather than extends Wagtail output:
    The Wagtail headless API serializes pages through its own pipeline
    (wagtail.api.v2). Extending those serializers would couple this DRF
    layer to Wagtail internals that change across minor versions. Instead,
    we mirror the output shape here so drf-spectacular can generate correct
    OpenAPI documentation and the frontend TypeScript types stay accurate.

    Fields:
        id: Wagtail page ID.
        title: Page title (h1).
        slug: URL slug (from Wagtail Page.slug).
        subtitle: Short deck text.
        reading_time: Estimated reading time in minutes.
        category: Primary category slug for /blog/category/ routing.
        first_published_at: ISO 8601 datetime string or null.
        tags: List of TagSerializer instances.
    """

    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(read_only=True)
    slug = serializers.CharField(read_only=True)
    subtitle = serializers.CharField(read_only=True, allow_blank=True)
    reading_time = serializers.IntegerField(read_only=True)
    category = serializers.CharField(read_only=True, allow_blank=True)
    first_published_at = serializers.DateTimeField(read_only=True, allow_null=True)
    tags = TagSerializer(many=True, read_only=True)


class BlogPostDetailSerializer(BlogPostListSerializer):
    """
    Extended serializer for full blog post detail responses.

    Adds the StreamField body and both hero image renditions to the
    list serializer. The body is a list of typed block dicts — its
    exact shape depends on the StreamField block type (heading,
    paragraph, code, callout, embed, raw_html).

    Fields (in addition to BlogPostListSerializer):
        body: List of StreamField block dicts (type + value + id).
        hero_image_thumbnail: Dict with url, width, height (800×400 crop).
        hero_image_og: Dict with url, width, height (1200×630 crop).
        seo_title: Wagtail SEO title override (from Page.seo_title).
        search_description: Meta description text (from Page.search_description).
    """

    body = serializers.ListField(
        child=serializers.DictField(),
        read_only=True,
        help_text="StreamField body blocks. Each item has 'type', 'value', and 'id' keys.",
    )
    hero_image_thumbnail = serializers.DictField(
        read_only=True,
        allow_null=True,
        help_text="Hero image at 800×400. Keys: url, width, height.",
    )
    hero_image_og = serializers.DictField(
        read_only=True,
        allow_null=True,
        help_text="Hero image at 1200×630 for OpenGraph meta tags.",
    )
    seo_title = serializers.CharField(
        read_only=True,
        allow_blank=True,
        help_text="SEO title override. Falls back to title if blank.",
    )
    search_description = serializers.CharField(
        read_only=True,
        allow_blank=True,
        help_text="Meta description. Truncated to 160 chars by convention.",
    )