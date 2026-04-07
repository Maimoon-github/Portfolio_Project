"""
Django REST Framework Serializers for SEO Application.

Provides serializers for PostSEO data, SEO analysis requests/responses,
and validation logic for API endpoints. Mirrors form validation while
providing JSON-friendly interfaces for frontend integration.
"""

import json
import logging
from typing import Any, Dict, List, Optional

from rest_framework import serializers

from ..models import PostSEO, PostRedirect, PostSEOAuditLog
from ..constants import (
    MAX_SEO_TITLE_LENGTH,
    MAX_META_DESCRIPTION_LENGTH,
    KEYPHRASE_DENSITY_MIN,
    KEYPHRASE_DENSITY_MAX,
    ROBOTS_CHOICES,
    SCHEMA_TYPE_CHOICES,
    CHANGEFREQ_CHOICES,
)
from ..analysis.utils import extract_headings

logger = logging.getLogger(__name__)


# =============================================================================
# POST SEO SERIALIZER
# =============================================================================

class PostSEOSerializer(serializers.ModelSerializer):
    """
    Full serializer for PostSEO model.
    
    Provides complete serialization of SEO metadata with read-only
    protection for computed fields (scores, timestamps). Includes
    validation matching the PostSEOForm implementation.
    
    Attributes:
        computed_scores: Read-only nested representation of score data.
        social_preview: Computed social media metadata.
    """
    
    # Computed/read-only fields
    computed_scores = serializers.SerializerMethodField(read_only=True)
    social_preview = serializers.SerializerMethodField(read_only=True)
    schema_json_ld = serializers.SerializerMethodField(read_only=True)
    reading_time = serializers.SerializerMethodField(read_only=True)
    
    # Writeable fields with validation
    secondary_keyphrases = serializers.ListField(
        child=serializers.CharField(max_length=100),
        required=False,
        allow_empty=True,
        help_text="Additional target keywords as array"
    )
    schema_extra = serializers.DictField(
        required=False,
        allow_empty=True,
        help_text="Additional JSON-LD properties as object"
    )
    
    class Meta:
        model = PostSEO
        fields = [
            # Primary keys and relationships
            'id',
            'post',
            
            # Core metadata
            'seo_title',
            'meta_description',
            'focus_keyphrase',
            'secondary_keyphrases',
            'canonical_url',
            'robots',
            
            # Social media
            'og_title',
            'og_description',
            'og_image',
            'twitter_title',
            'twitter_description',
            'twitter_image',
            'social_preview',
            
            # Structured data
            'schema_type',
            'schema_extra',
            'schema_json_ld',
            
            # Content strategy
            'is_cornerstone',
            
            # Sitemap
            'sitemap_priority',
            'sitemap_changefreq',
            
            # Computed fields
            'seo_score',
            'readability_score',
            'computed_scores',
            'reading_time',
            'content_hash',
            'last_analyzed_at',
            
            # Timestamps
            'created_at',
            'updated_at',
        ]
        read_only_fields = [
            'id',
            'post',
            'seo_score',
            'readability_score',
            'content_hash',
            'last_analyzed_at',
            'created_at',
            'updated_at',
        ]
    
    def get_computed_scores(self, obj: PostSEO) -> Dict[str, Any]:
        """
        Return structured score data with status interpretation.
        """
        return {
            'seo_score': obj.seo_score,
            'readability_score': obj.readability_score,
            'seo_status': self._get_score_status(obj.seo_score),
            'readability_status': self._get_readability_status(obj.readability_score),
            'breakdown': obj.seo_score_breakdown or [],
        }
    
    def _get_score_status(self, score: Optional[int]) -> str:
        """Convert numeric score to status string."""
        if score is None:
            return 'unscored'
        elif score >= 70:
            return 'excellent'
        elif score >= 50:
            return 'good'
        else:
            return 'poor'
    
    def _get_readability_status(self, score: Optional[int]) -> str:
        """Convert readability score to status string."""
        if score is None:
            return 'unscored'
        elif score >= 60:
            return 'easy'
        elif score >= 40:
            return 'medium'
        else:
            return 'difficult'
    
    def get_social_preview(self, obj: PostSEO) -> Dict[str, Any]:
        """
        Compute social media preview metadata.
        """
        from ..services import get_social_preview_data
        try:
            return get_social_preview_data(obj.post)
        except Exception as e:
            logger.error(f"Error computing social preview: {e}")
            return {}
    
    def get_schema_json_ld(self, obj: PostSEO) -> str:
        """
        Generate JSON-LD schema markup.
        """
        from ..services import render_schema_json_ld
        try:
            return render_schema_json_ld(obj.post)
        except Exception as e:
            logger.error(f"Error rendering schema: {e}")
            return ""
    
    def get_reading_time(self, obj: PostSEO) -> int:
        """
        Compute estimated reading time in minutes.
        """
        from ..services import compute_reading_time
        try:
            return compute_reading_time(obj.post)
        except Exception as e:
            logger.error(f"Error computing reading time: {e}")
            return 0
    
    # =========================================================================
    # VALIDATION METHODS
    # =========================================================================
    
    def validate_seo_title(self, value: str) -> str:
        """
        Validate SEO title length and uniqueness.
        """
        if len(value) > MAX_SEO_TITLE_LENGTH:
            raise serializers.ValidationError(
                f"Title exceeds {MAX_SEO_TITLE_LENGTH} characters (currently {len(value)})."
            )
        
        # Uniqueness check (exclude current instance if updating)
        if value:
            queryset = PostSEO.objects.filter(seo_title__iexact=value)
            if self.instance:
                queryset = queryset.exclude(pk=self.instance.pk)
            
            # Only check against published posts
            queryset = queryset.filter(post__status='published')
            
            if queryset.exists():
                raise serializers.ValidationError(
                    "This SEO title is already used by another published post."
                )
        
        return value
    
    def validate_meta_description(self, value: str) -> str:
        """Validate meta description length."""
        if len(value) > MAX_META_DESCRIPTION_LENGTH:
            raise serializers.ValidationError(
                f"Description exceeds {MAX_META_DESCRIPTION_LENGTH} characters "
                f"(currently {len(value)})."
            )
        return value
    
    def validate_sitemap_priority(self, value: float) -> float:
        """Validate priority is within 0.0-1.0 range."""
        if not (0.0 <= value <= 1.0):
            raise serializers.ValidationError("Priority must be between 0.0 and 1.0.")
        return value
    
    def validate_secondary_keyphrases(self, value: List[str]) -> List[str]:
        """Validate secondary keyphrases list."""
        if len(value) > 10:
            raise serializers.ValidationError("Maximum 10 secondary keyphrases allowed.")
        
        for kp in value:
            if len(kp) > 100:
                raise serializers.ValidationError(
                    f"Keyphrase '{kp[:20]}...' exceeds 100 characters."
                )
        
        return value
    
    def validate_schema_type(self, value: str) -> str:
        """
        Validate schema type consistency with post content.
        """
        # Get post body from instance or context
        body = ''
        if self.instance:
            body = getattr(self.instance.post, 'body', '') or ''
        
        if value == 'HowTo':
            headings = extract_headings(body) if body else []
            has_steps = any(
                'step' in h.get('text', '').lower() or 
                h.get('text', '').lower().startswith(('1.', '2.', 'step 1', 'step 2'))
                for h in headings
            )
            
            if not has_steps and body:
                from bs4 import BeautifulSoup
                soup = BeautifulSoup(body, 'html.parser')
                if not soup.find_all('ol'):
                    raise serializers.ValidationError(
                        "HowTo schema requires numbered steps or ordered lists in content."
                    )
        
        elif value == 'FAQPage':
            headings = extract_headings(body) if body else []
            questions = [
                h for h in headings 
                if h.get('text', '').endswith('?') or
                h.get('text', '').lower().startswith(('what', 'how', 'why', 'when', 'where', 'who'))
            ]
            
            if len(questions) < 2 and body:
                raise serializers.ValidationError(
                    "FAQPage schema requires at least 2 question-answer pairs."
                )
        
        return value
    
    def validate(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Cross-field validation.
        """
        # Keyphrase density warning (non-blocking)
        keyphrase = data.get('focus_keyphrase', '')
        body = ''
        if self.instance:
            body = getattr(self.instance.post, 'body', '') or ''
        
        if keyphrase and body:
            from ..analysis.utils import count_words, find_keyphrase_positions
            word_count = count_words(body)
            keyphrase_words = len(keyphrase.split())
            occurrences = len(find_keyphrase_positions(body.lower(), keyphrase))
            
            if word_count > 0:
                density = ((occurrences * keyphrase_words) / word_count) * 100
                
                if density > KEYPHRASE_DENSITY_MAX:
                    # Add warning but don't fail
                    if 'warnings' not in data:
                        data['warnings'] = {}
                    data['warnings']['focus_keyphrase'] = (
                        f"Keyphrase density ({density:.1f}%) exceeds recommended "
                        f"maximum ({KEYPHRASE_DENSITY_MAX}%)."
                    )
        
        return data


# =============================================================================
# ANALYSIS REQUEST SERIALIZER
# =============================================================================

class SEOAnalysisRequestSerializer(serializers.Serializer):
    """
    Serializer for requesting SEO analysis of draft or existing content.
    
    All fields are optional to support analysis of partial/incomplete drafts.
    Used for real-time analysis in editor interfaces.
    """
    
    # Content fields (all optional for draft analysis)
    title = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=200,
        help_text="Post title (H1)"
    )
    slug = serializers.SlugField(
        required=False,
        allow_blank=True,
        max_length=255,
        help_text="URL slug"
    )
    body = serializers.CharField(
        required=False,
        allow_blank=True,
        help_text="HTML content body"
    )
    seo_title = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=MAX_SEO_TITLE_LENGTH,
        help_text="SEO title override"
    )
    meta_description = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=MAX_META_DESCRIPTION_LENGTH,
        help_text="Meta description"
    )
    focus_keyphrase = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=100,
        help_text="Primary target keyword"
    )
    
    # Optional existing post reference
    post_id = serializers.IntegerField(
        required=False,
        allow_null=True,
        help_text="Existing post ID (for comparison with stored scores)"
    )
    
    def validate(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Ensure at least some content is provided for analysis.
        """
        has_content = any([
            data.get('title', '').strip(),
            data.get('body', '').strip(),
        ])
        
        if not has_content:
            raise serializers.ValidationError(
                "At least title or body must be provided for analysis."
            )
        
        return data


# =============================================================================
# ANALYSIS RESPONSE SERIALIZER
# =============================================================================

class CheckResultSerializer(serializers.Serializer):
    """
    Serializer for individual SEO check results.
    """
    check_id = serializers.CharField()
    status = serializers.ChoiceField(choices=['pass', 'warning', 'fail'])
    message = serializers.CharField()
    weight = serializers.FloatField()
    score_contribution = serializers.FloatField()


class ReadabilityMetricsSerializer(serializers.Serializer):
    """
    Serializer for readability analysis results.
    """
    flesch_reading_ease = serializers.DictField()
    flesch_kincaid_grade = serializers.FloatField()
    sentence_metrics = serializers.DictField()
    passive_voice = serializers.DictField()
    transition_words = serializers.DictField()
    consecutive_starts = serializers.ListField(child=serializers.CharField())
    paragraph_metrics = serializers.DictField()
    overall_score = serializers.IntegerField()
    overall_status = serializers.CharField()
    word_count = serializers.IntegerField()


class KeyphraseAnalysisSerializer(serializers.Serializer):
    """
    Serializer for keyphrase placement analysis.
    """
    found_in_title = serializers.BooleanField()
    found_in_seo_title = serializers.BooleanField()
    found_in_meta = serializers.BooleanField()
    found_in_slug = serializers.BooleanField()
    found_in_h1 = serializers.BooleanField()
    found_in_first_para = serializers.BooleanField()
    found_in_headings = serializers.ListField()
    density = serializers.FloatField()
    occurrences = serializers.IntegerField()


class SEOAnalysisResponseSerializer(serializers.Serializer):
    """
    Serializer for complete SEO analysis response.
    
    Structured to match the output from analyze_post() in the analysis engine.
    """
    # Scores
    seo_score = serializers.IntegerField(min_value=0, max_value=100)
    readability_score = serializers.IntegerField(min_value=0, max_value=100)
    
    # Detailed results
    breakdown = CheckResultSerializer(many=True)
    readability_details = ReadabilityMetricsSerializer()
    keyphrase_analysis = KeyphraseAnalysisSerializer()
    
    # Recommendations
    schema_recommendation = serializers.ChoiceField(
        choices=['BlogPosting', 'Article', 'FAQPage', 'HowTo', 'NewsArticle']
    )
    suggestions = serializers.ListField(
        child=serializers.CharField(),
        help_text="List of actionable improvement suggestions"
    )
    
    # Metadata
    word_count = serializers.IntegerField()
    cached = serializers.BooleanField(default=False)
    last_analyzed = serializers.DateTimeField(required=False, allow_null=True)
    
    # Error handling
    error = serializers.CharField(required=False, allow_null=True)
    
    def get_suggestions(self, obj: Dict[str, Any]) -> List[str]:
        """
        Generate human-readable suggestions from check results.
        """
        suggestions = []
        
        breakdown = obj.get('breakdown', [])
        for check in breakdown:
            if check.get('status') in ('warning', 'fail'):
                suggestions.append(check.get('message', ''))
        
        # Add readability suggestions
        readability = obj.get('readability_details', {})
        if readability.get('overall_status') == 'fail':
            suggestions.append("Improve content readability for better engagement.")
        
        return [s for s in suggestions if s]


# =============================================================================
# AUDIT LOG SERIALIZER
# =============================================================================

class PostSEOAuditLogSerializer(serializers.ModelSerializer):
    """
    Serializer for audit log entries (read-only).
    """
    
    post_title = serializers.SerializerMethodField()
    score_trend = serializers.SerializerMethodField()
    
    class Meta:
        model = PostSEOAuditLog
        fields = [
            'id',
            'post_seo',
            'post_title',
            'seo_score',
            'readability_score',
            'triggering_event',
            'score_trend',
            'created_at',
        ]
        read_only_fields = fields
    
    def get_post_title(self, obj: PostSEOAuditLog) -> str:
        """Get post title through relationship."""
        try:
            return getattr(obj.post_seo.post, 'title', 'Unknown')
        except Exception:
            return 'Unknown'
    
    def get_score_trend(self, obj: PostSEOAuditLog) -> Optional[str]:
        """Determine if score improved, declined, or stayed stable."""
        return obj.get_score_trend()


# =============================================================================
# REDIRECT SERIALIZER
# =============================================================================

class PostRedirectSerializer(serializers.ModelSerializer):
    """
    Serializer for redirect management.
    """
    
    post_title = serializers.SerializerMethodField()
    redirect_url = serializers.SerializerMethodField()
    
    class Meta:
        model = PostRedirect
        fields = [
            'id',
            'post',
            'post_title',
            'old_slug',
            'new_slug',
            'status_code',
            'is_active',
            'redirect_url',
            'created_at',
        ]
        read_only_fields = ['created_at', 'redirect_url']
    
    def get_post_title(self, obj: PostRedirect) -> str:
        """Get post title."""
        try:
            return getattr(obj.post, 'title', 'Unknown')
        except Exception:
            return 'Unknown'
    
    def get_redirect_url(self, obj: PostRedirect) -> str:
        """Get current target URL."""
        try:
            return obj.get_redirect_url() or ''
        except Exception:
            return ''