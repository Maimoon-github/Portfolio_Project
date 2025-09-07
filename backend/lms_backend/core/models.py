"""
Core models for the LMS backend.
"""

import uuid
from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator
import textstat


class PublishedContentManager(models.Manager):
    """Manager to return only published content."""
    
    def get_queryset(self):
        return super().get_queryset().filter(
            status='published',
            published_at__lte=timezone.now(),
            deleted_at__isnull=True
        )


class AdminContentManager(models.Manager):
    """Manager to return all non-deleted content for admin interfaces."""
    
    def get_queryset(self):
        return super().get_queryset().filter(deleted_at__isnull=True)


class BaseContentModel(models.Model):
    """
    Abstract base model for all content types with SEO fields and visibility control.
    """
    
    # Status choices for content
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    )
    
    # Twitter card type choices
    TWITTER_CARD_CHOICES = (
        ('summary', 'Summary'),
        ('summary_large_image', 'Summary with Large Image'),
    )
    
    # Primary fields
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=200, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    
    # SEO fields
    meta_title = models.CharField(max_length=60, blank=True)
    meta_description = models.TextField(max_length=160, blank=True)
    og_image = models.ImageField(upload_to='og_images/', blank=True)
    focus_keyword = models.CharField(max_length=100, blank=True)
    secondary_keywords = models.TextField(blank=True)
    readability_score = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True)
    seo_score = models.IntegerField(
        null=True, 
        blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    
    # Social media fields
    social_media_title = models.CharField(max_length=60, blank=True)
    social_media_description = models.TextField(max_length=160, blank=True)
    twitter_card_type = models.CharField(
        max_length=20, 
        choices=TWITTER_CARD_CHOICES,
        default='summary'
    )
    
    # Timestamps
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    
    # Managers
    objects = models.Manager()  # Default manager
    published = PublishedContentManager()  # Published content manager
    admin = AdminContentManager()  # Admin interface manager
    
    class Meta:
        abstract = True
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['status']),
            models.Index(fields=['published_at']),
            models.Index(fields=['deleted_at']),
        ]
        ordering = ['-published_at', '-created_at']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # Generate slug if not provided
        if not self.slug:
            self.slug = slugify(self.title)
            
        # Auto-generate SEO fields if empty
        if not self.meta_title:
            self.meta_title = self.title[:60]
            
        if not self.meta_description and hasattr(self, 'get_excerpt'):
            self.meta_description = self.get_excerpt()[:160]
            
        if not self.social_media_title:
            self.social_media_title = self.meta_title
            
        if not self.social_media_description:
            self.social_media_description = self.meta_description
            
        # Set published_at when status changes to published
        if self.status == 'published' and not self.published_at:
            self.published_at = timezone.now()
            
        # Calculate SEO score and readability if content exists
        if hasattr(self, 'get_content_for_seo_analysis'):
            content = self.get_content_for_seo_analysis()
            if content:
                self.calculate_readability_score(content)
                self.calculate_seo_score(content)
                
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        """Generate frontend URL for this content."""
        model_name = self._meta.model_name
        return f"/{model_name}/{self.slug}/"
    
    def calculate_readability_score(self, content):
        """Calculate and store the Flesch reading ease score."""
        if content and len(content) > 50:
            self.readability_score = textstat.flesch_reading_ease(content)
    
    def calculate_seo_score(self, content):
        """Calculate and store SEO score based on various factors."""
        score = 0
        max_score = 0
        
        # Title length (ideal: 50-60 chars)
        max_score += 10
        if self.title:
            title_len = len(self.title)
            if 50 <= title_len <= 60:
                score += 10
            elif 40 <= title_len < 50 or 60 < title_len <= 70:
                score += 7
            elif 30 <= title_len < 40 or 70 < title_len <= 80:
                score += 5
            else:
                score += 2
                
        # Meta description (ideal: 140-160 chars)
        max_score += 10
        if self.meta_description:
            desc_len = len(self.meta_description)
            if 140 <= desc_len <= 160:
                score += 10
            elif 120 <= desc_len < 140 or 160 < desc_len <= 180:
                score += 7
            elif 100 <= desc_len < 120 or 180 < desc_len <= 200:
                score += 5
            else:
                score += 2
        
        # Focus keyword presence
        max_score += 10
        if self.focus_keyword and content:
            keyword = self.focus_keyword.lower()
            if keyword in self.title.lower():
                score += 5
            if keyword in content.lower():
                score += 5
        
        # Readability score
        max_score += 10
        if self.readability_score:
            if self.readability_score >= 70:
                score += 10
            elif self.readability_score >= 60:
                score += 8
            elif self.readability_score >= 50:
                score += 6
            elif self.readability_score >= 40:
                score += 4
            else:
                score += 2
        
        # OG Image presence
        max_score += 5
        if self.og_image:
            score += 5
        
        # Secondary keywords presence
        max_score += 5
        if self.secondary_keywords:
            score += 5
        
        # Convert to 0-100 scale
        if max_score > 0:
            self.seo_score = int((score / max_score) * 100)
        else:
            self.seo_score = 0
    
    def is_published(self):
        """Check if the content is published and should be visible."""
        if self.status != 'published':
            return False
        if self.published_at and self.published_at > timezone.now():
            return False
        if self.deleted_at:
            return False
        return True
    
    def soft_delete(self):
        """Soft delete the content by setting deleted_at timestamp."""
        self.deleted_at = timezone.now()
        self.save()
        
    def restore(self):
        """Restore soft-deleted content."""
        self.deleted_at = None
        self.save()
