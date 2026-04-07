"""
Django Models for the SEO Application.

This module defines the database models for comprehensive SEO management,
including the PostSEO companion model (OneToOne with blog.Post), redirect
management for slug changes, and audit logging for score history tracking.
All models use database indexes optimized for query performance in admin
and frontend contexts.
"""

from typing import Any, Dict, List, Optional, Union

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.urls import reverse
from django.utils.timezone import now

from .constants import (
    CHANGEFREQ_CHOICES,
    ROBOTS_CHOICES,
    SCHEMA_TYPE_CHOICES,
    DEFAULT_SITEMAP_PRIORITY,
    DEFAULT_CHANGEFREQ,
    MAX_SEO_TITLE_LENGTH,
    MAX_META_DESCRIPTION_LENGTH,
    CONTENT_HASH_ALGORITHM,
)


def get_og_image_upload_path(instance: Any, filename: str) -> str:
    """
    Generate upload path for Open Graph images.

    Organizes files by year/month to prevent directory overcrowding.

    Args:
        instance: The PostSEO instance being saved.
        filename: Original filename from the upload.

    Returns:
        Path string in format 'seo/og_images/%Y/%m/<filename>'.
    """
    from datetime import datetime
    current = datetime.now()
    return f'seo/og_images/{current.strftime("%Y/%m")}/{filename}'


class PostSEO(models.Model):
    """
    Comprehensive SEO metadata companion model for blog posts.

    Maintains a OneToOne relationship with blog.Post, storing all SEO-related
    metadata including titles, descriptions, schema markup configuration,
    social media previews, and cached analysis scores.

    Attributes:
        post: OneToOne relationship to blog.Post.
        seo_title: Optimized title for search engines (max 70 chars).
        meta_description: Meta description for SERP snippets (max 165 chars).
        focus_keyphrase: Primary target keyword for the post.
        secondary_keyphrases: Additional target keywords (JSON list).
        canonical_url: Override for canonical link element.
        robots: Meta robots directive for indexing control.
        og_title: Open Graph title override.
        og_description: Open Graph description override.
        og_image: Featured image for social sharing.
        twitter_title: Twitter Card title override.
        twitter_description: Twitter Card description override.
        twitter_image: Twitter Card image override.
        schema_type: Schema.org structured data type.
        schema_extra: Additional schema properties as JSON.
        is_cornerstone: Flag for pillar content priority.
        sitemap_priority: XML sitemap priority value (0.0-1.0).
        sitemap_changefreq: Content update frequency for sitemaps.
        seo_score: Cached aggregate SEO score (0-100).
        readability_score: Cached readability score (0-100).
        seo_score_breakdown: Detailed check results as JSON.
        content_hash: SHA-256 hash for change detection.
        last_analyzed_at: Timestamp of last analysis run.
        created_at: Record creation timestamp.
        updated_at: Last modification timestamp.
    """

    # Relationship
    post = models.OneToOneField(
        'blog.Post',
        on_delete=models.CASCADE,
        related_name='seo',
        verbose_name='Blog Post',
        help_text='The associated blog post for these SEO settings.'
    )

    # Core Metadata
    seo_title = models.CharField(
        max_length=MAX_SEO_TITLE_LENGTH,
        blank=True,
        verbose_name='SEO Title',
        help_text=f'Title tag for search engines (max {MAX_SEO_TITLE_LENGTH} chars). '
                  f'Leave blank to use post title.'
    )
    meta_description = models.TextField(
        max_length=MAX_META_DESCRIPTION_LENGTH,
        blank=True,
        verbose_name='Meta Description',
        help_text=f'SERP snippet description (max {MAX_META_DESCRIPTION_LENGTH} chars). '
                  f'Optimal: 120-160 characters.'
    )
    focus_keyphrase = models.CharField(
        max_length=100,
        blank=True,
        db_index=True,
        verbose_name='Focus Keyphrase',
        help_text='Primary keyword this post targets for ranking.'
    )
    secondary_keyphrases = models.JSONField(
        default=list,
        blank=True,
        verbose_name='Secondary Keyphrases',
        help_text='Additional target keywords (JSON array format).'
    )

    # URL & Indexing Control
    canonical_url = models.URLField(
        blank=True,
        verbose_name='Canonical URL',
        help_text='Override canonical URL. Leave blank for default permalink.'
    )
    robots = models.CharField(
        max_length=50,
        choices=ROBOTS_CHOICES,
        default='index,follow',
        verbose_name='Meta Robots',
        help_text='Search engine crawling and indexing directives.'
    )

    # Open Graph (Facebook, LinkedIn, etc.)
    og_title = models.CharField(
        max_length=100,
        blank=True,
        verbose_name='OG Title',
        help_text='Open Graph title for social sharing. Defaults to SEO title.'
    )
    og_description = models.TextField(
        max_length=300,
        blank=True,
        verbose_name='OG Description',
        help_text='Open Graph description. Defaults to meta description.'
    )
    og_image = models.ImageField(
        upload_to=get_og_image_upload_path,
        blank=True,
        verbose_name='OG Image',
        help_text='Recommended size: 1200×630px for optimal social display.'
    )

    # Twitter Cards
    twitter_title = models.CharField(
        max_length=100,
        blank=True,
        verbose_name='Twitter Title',
        help_text='Twitter Card title. Defaults to OG title.'
    )
    twitter_description = models.TextField(
        max_length=300,
        blank=True,
        verbose_name='Twitter Description',
        help_text='Twitter Card description. Defaults to OG description.'
    )
    twitter_image = models.ImageField(
        upload_to=get_og_image_upload_path,
        blank=True,
        verbose_name='Twitter Image',
        help_text='Twitter Card image. Defaults to OG image.'
    )

    # Structured Data
    schema_type = models.CharField(
        max_length=20,
        choices=SCHEMA_TYPE_CHOICES,
        default='BlogPosting',
        db_index=True,
        verbose_name='Schema Type',
        help_text='Schema.org structured data type for rich snippets.'
    )
    schema_extra = models.JSONField(
        default=dict,
        blank=True,
        verbose_name='Extra Schema Properties',
        help_text='Additional JSON-LD properties not covered by standard fields.'
    )

    # Content Strategy
    is_cornerstone = models.BooleanField(
        default=False,
        db_index=True,
        verbose_name='Cornerstone Content',
        help_text='Mark as pillar content for internal linking priority.'
    )

    # Sitemap Configuration
    sitemap_priority = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        default=DEFAULT_SITEMAP_PRIORITY,
        validators=[MinValueValidator(0.0), MaxValueValidator(1.0)],
        verbose_name='Sitemap Priority',
        help_text='Priority value from 0.0 to 1.0 (default: 0.7).'
    )
    sitemap_changefreq = models.CharField(
        max_length=10,
        choices=CHANGEFREQ_CHOICES,
        default=DEFAULT_CHANGEFREQ,
        verbose_name='Change Frequency',
        help_text='How frequently content is likely to change.'
    )

    # Cached Analysis Results
    seo_score = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
        db_index=True,
        verbose_name='SEO Score',
        help_text='Aggregated SEO health score (0-100).',
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    readability_score = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
        verbose_name='Readability Score',
        help_text='Flesch-Kincaid based readability score (0-100).',
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    seo_score_breakdown = models.JSONField(
        default=dict,
        blank=True,
        verbose_name='Score Breakdown',
        help_text='Detailed check results: passed, warnings, failures.'
    )
    content_hash = models.CharField(
        max_length=64,
        blank=True,
        verbose_name='Content Hash',
        help_text=f'{CONTENT_HASH_ALGORITHM} hash for change detection.'
    )
    last_analyzed_at = models.DateTimeField(
        null=True,
        blank=True,
        db_index=True,
        verbose_name='Last Analyzed',
        help_text='Timestamp of most recent SEO analysis.'
    )

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Created')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Updated')

    class Meta:
        """
        Model metadata configuration.
        """
        verbose_name = 'Post SEO'
        verbose_name_plural = 'Post SEO Entries'
        indexes = [
            models.Index(fields=['seo_score', 'readability_score']),
            models.Index(fields=['last_analyzed_at', 'seo_score']),
            models.Index(fields=['focus_keyphrase', 'seo_score']),
            models.Index(fields=['is_cornerstone', 'seo_score']),
            models.Index(fields=['schema_type', 'seo_score']),
        ]
        ordering = ['-updated_at']

    def __str__(self) -> str:
        """
        String representation of the SEO entry.

        Returns:
            Descriptive string including post title and focus keyphrase.
        """
        post_title = getattr(self.post, 'title', 'Unknown Post')
        return f'SEO: {post_title}'

    def get_absolute_url(self) -> str:
        """
        Return the canonical URL for the associated post.

        Returns:
            Absolute URL path from the related post model.
        """
        if self.post:
            return self.post.get_absolute_url()
        return ''

    def get_meta_title(self) -> str:
        """
        Return effective meta title with fallback chain.

        Resolution order:
        1. seo_title field
        2. Post.title field
        3. Empty string

        Returns:
            The effective title to use in <title> tag.
        """
        if self.seo_title:
            return self.seo_title
        if self.post:
            return getattr(self.post, 'title', '')
        return ''

    def get_meta_description(self) -> str:
        """
        Return effective meta description with fallback.

        Returns:
            The effective description or empty string if none set.
        """
        return self.meta_description or ''

    def get_og_title(self) -> str:
        """
        Return Open Graph title with fallback chain.

        Resolution order:
        1. og_title field
        2. seo_title field
        3. Post.title field

        Returns:
            The effective OG title.
        """
        if self.og_title:
            return self.og_title
        return self.get_meta_title()

    def get_og_description(self) -> str:
        """
        Return Open Graph description with fallback chain.

        Resolution order:
        1. og_description field
        2. meta_description field

        Returns:
            The effective OG description.
        """
        return self.og_description or self.meta_description or ''

    def get_og_image_url(self) -> Optional[str]:
        """
        Return Open Graph image URL with fallback chain.

        Resolution order:
        1. og_image field
        2. Post.featured_image field

        Returns:
            Image URL string or None.
        """
        if self.og_image:
            return self.og_image.url
        if self.post and hasattr(self.post, 'featured_image'):
            featured = getattr(self.post, 'featured_image', None)
            if featured:
                return featured.url
        return None

    def get_twitter_title(self) -> str:
        """
        Return Twitter Card title with fallback to OG title.

        Returns:
            The effective Twitter title.
        """
        return self.twitter_title or self.get_og_title()

    def get_twitter_description(self) -> str:
        """
        Return Twitter Card description with fallback.

        Returns:
            The effective Twitter description.
        """
        return self.twitter_description or self.get_og_description()

    def get_twitter_image_url(self) -> Optional[str]:
        """
        Return Twitter Card image URL with fallback to OG image.

        Returns:
            Image URL string or None.
        """
        if self.twitter_image:
            return self.twitter_image.url
        return self.get_og_image_url()

    def needs_reanalysis(self) -> bool:
        """
        Determine if content has changed since last analysis.

        Compares stored content_hash with current post content hash
        to determine if SEO scores are stale.

        Returns:
            True if analysis is needed, False if up to date.
        """
        if not self.last_analyzed_at:
            return True
        
        if not self.post:
            return False
            
        from .services import compute_content_hash
        current_hash = compute_content_hash(self.post)
        return current_hash != self.content_hash


class PostRedirect(models.Model):
    """
    Manage URL redirects for slug changes and content moves.

    Maintains a history of slug changes for posts to ensure inbound links
    remain functional through 301/302 redirects. Automatically created
    when post slugs change after publication.

    Attributes:
        post: ForeignKey to the affected post.
        old_slug: Previous slug value (indexed for fast lookup).
        new_slug: Current/target slug value.
        status_code: HTTP redirect status (301 permanent, 302 temporary).
        created_at: When the redirect was created.
        is_active: Whether this redirect rule is currently enforced.
    """

    post = models.ForeignKey(
        'blog.Post',
        on_delete=models.CASCADE,
        related_name='redirects',
        verbose_name='Blog Post'
    )
    old_slug = models.SlugField(
        max_length=255,
        db_index=True,
        verbose_name='Old Slug',
        help_text='Previous URL slug that should redirect.'
    )
    new_slug = models.SlugField(
        max_length=255,
        verbose_name='New Slug',
        help_text='Target slug to redirect to.'
    )
    status_code = models.PositiveSmallIntegerField(
        choices=[
            (301, 'Permanent (301)'),
            (302, 'Temporary (302)'),
        ],
        default=301,
        verbose_name='Status Code',
        help_text='301 for permanent moves, 302 for temporary redirects.'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Created')
    is_active = models.BooleanField(
        default=True,
        verbose_name='Active',
        help_text='Inactive redirects are ignored by the middleware.'
    )

    class Meta:
        """
        Model metadata with unique constraint preventing duplicate redirects.
        """
        verbose_name = 'Post Redirect'
        verbose_name_plural = 'Post Redirects'
        unique_together = ['post', 'old_slug']
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['old_slug', 'is_active']),
            models.Index(fields=['post', 'created_at']),
        ]

    def __str__(self) -> str:
        """
        Return descriptive redirect representation.

        Returns:
            String showing old -> new slug mapping.
        """
        return f'{self.old_slug} → {self.new_slug} ({self.get_status_code_display()})'

    def get_redirect_url(self) -> Optional[str]:
        """
        Construct the target URL for this redirect.

        Returns:
            Absolute URL path for the new slug.
        """
        if self.post:
            # Assuming post has get_absolute_url() that uses current slug
            return self.post.get_absolute_url()
        return None


class PostSEOAuditLog(models.Model):
    """
    Historical record of SEO score changes and analysis events.

    Maintains an append-only log of all SEO analysis runs to track
    improvement trends, audit changes, and debug scoring issues.
    Useful for editorial teams to monitor content optimization progress.

    Attributes:
        post_seo: ForeignKey to the SEO record analyzed.
        seo_score: The aggregate SEO score at time of analysis.
        readability_score: The readability score at time of analysis.
        score_breakdown: Detailed JSON results of all checks.
        triggering_event: What caused this analysis (save, publish, etc.).
        created_at: When the analysis was performed.
    """

    EVENT_CHOICES = [
        ('save', 'Post Save'),
        ('publish', 'Publication'),
        ('manual', 'Manual Trigger'),
        ('bulk', 'Bulk Reanalysis'),
        ('scheduled', 'Scheduled Task'),
        ('api', 'API Call'),
    ]

    post_seo = models.ForeignKey(
        PostSEO,
        on_delete=models.CASCADE,
        related_name='audit_logs',
        verbose_name='Post SEO'
    )
    seo_score = models.PositiveSmallIntegerField(
        verbose_name='SEO Score',
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    readability_score = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
        verbose_name='Readability Score',
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    score_breakdown = models.JSONField(
        default=dict,
        verbose_name='Score Breakdown',
        help_text='Complete analysis results for this snapshot.'
    )
    triggering_event = models.CharField(
        max_length=50,
        choices=EVENT_CHOICES,
        verbose_name='Trigger',
        help_text='What event caused this analysis to run.'
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Created')

    class Meta:
        """
        Model metadata optimized for time-series queries.
        """
        verbose_name = 'SEO Audit Log'
        verbose_name_plural = 'SEO Audit Logs'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['post_seo', '-created_at']),
            models.Index(fields=['triggering_event', 'created_at']),
            models.Index(fields=['seo_score', 'created_at']),
        ]

    def __str__(self) -> str:
        """
        Return audit log entry description.

        Returns:
            String with post identifier and score.
        """
        return f'Audit {self.created_at.strftime("%Y-%m-%d %H:%M")}: Score {self.seo_score}'

    def get_score_trend(self) -> Optional[str]:
        """
        Compare this score with previous audit to determine trend.

        Returns:
            'improved', 'declined', 'stable', or None if no previous record.
        """
        previous = PostSEOAuditLog.objects.filter(
            post_seo=self.post_seo,
            created_at__lt=self.created_at
        ).exclude(id=self.id).first()

        if not previous:
            return None
        
        diff = self.seo_score - previous.seo_score
        if diff > 0:
            return 'improved'
        elif diff < 0:
            return 'declined'
        return 'stable'