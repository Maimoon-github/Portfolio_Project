"""
Django Forms for SEO Application.

Provides ModelForms for PostSEO data entry with client-side and server-side
validation. Includes character counters, schema consistency validation,
and uniqueness checks for SEO metadata across published posts.
"""

import json
import logging
from typing import Any, Dict, List, Optional

from django import forms
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _

from .models import PostSEO
from .constants import (
    MAX_SEO_TITLE_LENGTH,
    MAX_META_DESCRIPTION_LENGTH,
    ROBOTS_CHOICES,
    SCHEMA_TYPE_CHOICES,
    CHANGEFREQ_CHOICES,
    KEYPHRASE_DENSITY_MIN,
    KEYPHRASE_DENSITY_MAX,
)
from .analysis.utils import extract_headings

logger = logging.getLogger(__name__)


# =============================================================================
# WIDGETS
# =============================================================================

class CharacterCountWidget(forms.TextInput):
    """
    Text input with data attributes for JavaScript character counting.
    """
    def __init__(self, max_length: int, attrs: Optional[Dict] = None, **kwargs):
        self.max_length = max_length
        default_attrs = {
            'data-max-length': max_length,
            'data-char-count': 'true',
            'class': 'vTextField char-count-field',
        }
        if attrs:
            default_attrs.update(attrs)
        super().__init__(attrs=default_attrs, **kwargs)


class CharacterCountTextarea(forms.Textarea):
    """
    Textarea with data attributes for JavaScript character counting.
    """
    def __init__(self, max_length: int, rows: int = 3, attrs: Optional[Dict] = None, **kwargs):
        self.max_length = max_length
        default_attrs = {
            'data-max-length': max_length,
            'data-char-count': 'true',
            'rows': rows,
            'class': 'vLargeTextField char-count-field',
        }
        if attrs:
            default_attrs.update(attrs)
        super().__init__(attrs=default_attrs, **kwargs)


# =============================================================================
# MAIN SEO FORM
# =============================================================================

class PostSEOForm(forms.ModelForm):
    """
    Comprehensive form for editing PostSEO metadata.
    
    Provides validation for:
    - Character limits on titles and descriptions
    - Unique SEO titles across published posts
    - Schema type consistency (HowTo requires step indicators)
    - Sitemap priority range validation
    - Keyphrase density warnings
    """
    
    class Meta:
        model = PostSEO
        fields = [
            'seo_title',
            'meta_description',
            'focus_keyphrase',
            'secondary_keyphrases',
            'canonical_url',
            'robots',
            'og_title',
            'og_description',
            'og_image',
            'twitter_title',
            'twitter_description',
            'twitter_image',
            'schema_type',
            'schema_extra',
            'is_cornerstone',
            'sitemap_priority',
            'sitemap_changefreq',
        ]
        widgets = {
            'seo_title': CharacterCountWidget(
                max_length=MAX_SEO_TITLE_LENGTH,
                attrs={'placeholder': _('Leave blank to use post title')}
            ),
            'meta_description': CharacterCountTextarea(
                max_length=MAX_META_DESCRIPTION_LENGTH,
                rows=3,
                attrs={'placeholder': _('Enter meta description (120-160 chars optimal)')}
            ),
            'focus_keyphrase': forms.TextInput(attrs={
                'placeholder': _('Primary keyword for this post'),
                'class': 'vTextField',
            }),
            'secondary_keyphrases': forms.Textarea(attrs={
                'rows': 2,
                'placeholder': _('JSON array format: ["keyword1", "keyword2"]'),
                'class': 'vLargeTextField',
            }),
            'canonical_url': forms.URLInput(attrs={
                'placeholder': _('Leave blank for default permalink'),
                'class': 'vTextField',
            }),
            'robots': forms.Select(choices=ROBOTS_CHOICES),
            'og_title': forms.TextInput(attrs={
                'placeholder': _('Leave blank to use SEO title'),
                'class': 'vTextField',
            }),
            'og_description': forms.Textarea(attrs={
                'rows': 2,
                'placeholder': _('Leave blank to use meta description'),
                'class': 'vLargeTextField',
            }),
            'og_image': forms.ClearableFileInput(attrs={
                'accept': 'image/*',
            }),
            'twitter_title': forms.TextInput(attrs={
                'placeholder': _('Leave blank to use OG title'),
                'class': 'vTextField',
            }),
            'twitter_description': forms.Textarea(attrs={
                'rows': 2,
                'placeholder': _('Leave blank to use OG description'),
                'class': 'vLargeTextField',
            }),
            'twitter_image': forms.ClearableFileInput(attrs={
                'accept': 'image/*',
            }),
            'schema_type': forms.Select(choices=SCHEMA_TYPE_CHOICES),
            'schema_extra': forms.Textarea(attrs={
                'rows': 3,
                'placeholder': _('Additional JSON-LD properties as JSON object'),
                'class': 'vLargeTextField',
            }),
            'is_cornerstone': forms.CheckboxInput(attrs={
                'class': 'vCheckboxLabel',
            }),
            'sitemap_priority': forms.NumberInput(attrs={
                'min': '0.0',
                'max': '1.0',
                'step': '0.1',
                'class': 'vTextField',
            }),
            'sitemap_changefreq': forms.Select(choices=CHANGEFREQ_CHOICES),
        }
        help_texts = {
            'seo_title': _('Max 70 characters. Displayed in browser tab and search results.'),
            'meta_description': _('Max 165 characters. Optimal: 120-160 characters for SERP display.'),
            'focus_keyphrase': _('The main keyword you want this post to rank for.'),
            'secondary_keyphrases': _('Additional target keywords as JSON array.'),
            'canonical_url': _('Override only if this content appears elsewhere.'),
            'schema_type': _('Structured data type for rich snippets in search results.'),
            'is_cornerstone': _('Mark as pillar content for internal linking priority.'),
            'sitemap_priority': _('Priority from 0.0 to 1.0 (default: 0.7).'),
        }
    
    def __init__(self, *args, **kwargs):
        """
        Initialize form with optional post instance for contextual validation.
        
        The 'post' kwarg should be passed when editing to enable:
        - Uniqueness checks excluding current post
        - Schema validation against post content
        """
        self.post_instance = kwargs.pop('post', None)
        super().__init__(*args, **kwargs)
        
        # Make certain fields optional with clear fallbacks
        self.fields['seo_title'].required = False
        self.fields['meta_description'].required = False
        self.fields['canonical_url'].required = False
        self.fields['og_title'].required = False
        self.fields['og_description'].required = False
        self.fields['twitter_title'].required = False
        self.fields['twitter_description'].required = False
        self.fields['schema_extra'].required = False
        
        # Add CSS classes for admin styling
        for field in self.fields.values():
            if 'class' not in field.widget.attrs:
                field.widget.attrs['class'] = 'vTextField'
    
    def clean_seo_title(self) -> str:
        """
        Validate SEO title length and uniqueness.
        
        Raises:
            ValidationError: If title exceeds max length or duplicates existing.
        """
        title = self.cleaned_data.get('seo_title', '')
        
        if len(title) > MAX_SEO_TITLE_LENGTH:
            raise ValidationError(
                _('Title exceeds %(max)d characters (currently %(count)d).') % {
                    'max': MAX_SEO_TITLE_LENGTH,
                    'count': len(title)
                }
            )
        
        # Check uniqueness against other published posts
        if title:
            from django.apps import apps
            Post = apps.get_model('blog', 'Post')
            
            # Query for duplicate SEO titles
            duplicate_query = PostSEO.objects.filter(
                seo_title__iexact=title
            ).exclude(
                post_id=getattr(self.instance, 'post_id', None)
            ).filter(
                post__status='published'  # Only check against published posts
            )
            
            # Exclude current post if updating
            if self.post_instance and self.post_instance.pk:
                duplicate_query = duplicate_query.exclude(post=self.post_instance)
            
            if duplicate_query.exists():
                raise ValidationError(
                    _('This SEO title is already used by another published post. '
                      'Choose a unique title.')
                )
        
        return title
    
    def clean_meta_description(self) -> str:
        """
        Validate meta description length.
        """
        description = self.cleaned_data.get('meta_description', '')
        
        if len(description) > MAX_META_DESCRIPTION_LENGTH:
            raise ValidationError(
                _('Description exceeds %(max)d characters (currently %(count)d).') % {
                    'max': MAX_META_DESCRIPTION_LENGTH,
                    'count': len(description)
                }
            )
        
        return description
    
    def clean_secondary_keyphrases(self) -> List[str]:
        """
        Validate secondary keyphrases is valid JSON array.
        """
        data = self.cleaned_data.get('secondary_keyphrases', [])
        
        if isinstance(data, list):
            return data
        
        if isinstance(data, str):
            try:
                parsed = json.loads(data)
                if not isinstance(parsed, list):
                    raise ValidationError(_('Secondary keyphrases must be a JSON array.'))
                return parsed
            except json.JSONDecodeError:
                raise ValidationError(_('Invalid JSON format for secondary keyphrases.'))
        
        return []
    
    def clean_schema_extra(self) -> Dict[str, Any]:
        """
        Validate schema_extra is valid JSON object.
        """
        data = self.cleaned_data.get('schema_extra', {})
        
        if isinstance(data, dict):
            return data
        
        if isinstance(data, str):
            try:
                parsed = json.loads(data)
                if not isinstance(parsed, dict):
                    raise ValidationError(_('Schema extra must be a JSON object.'))
                return parsed
            except json.JSONDecodeError:
                raise ValidationError(_('Invalid JSON format for schema extra.'))
        
        return {}
    
    def clean_schema_type(self) -> str:
        """
        Validate schema type consistency with post content.
        
        HowTo schema requires step indicators in content.
        FAQPage requires question patterns.
        """
        schema_type = self.cleaned_data.get('schema_type', 'BlogPosting')
        
        # Get post body for validation
        body = ''
        if self.post_instance:
            body = getattr(self.post_instance, 'body', '') or ''
        elif self.instance and self.instance.post_id:
            # Fetch post body if not provided
            try:
                from django.apps import apps
                Post = apps.get_model('blog', 'Post')
                post = Post.objects.filter(pk=self.instance.post_id).first()
                if post:
                    body = getattr(post, 'body', '') or ''
            except Exception:
                pass
        
        if schema_type == 'HowTo':
            # Check for step indicators
            headings = extract_headings(body) if body else []
            has_steps = any(
                'step' in h.get('text', '').lower() or 
                h.get('text', '').lower().startswith(('1.', '2.', 'step 1', 'step 2'))
                for h in headings
            )
            
            if not has_steps and body:
                # Check for ordered lists
                from bs4 import BeautifulSoup
                soup = BeautifulSoup(body, 'html.parser')
                has_ol = len(soup.find_all('ol')) > 0
                
                if not has_ol:
                    raise ValidationError(
                        _('HowTo schema requires numbered steps or ordered lists in content. '
                          'Add step headings (e.g., "Step 1: ...") or an ordered list.')
                    )
        
        elif schema_type == 'FAQPage':
            # Check for question patterns
            headings = extract_headings(body) if body else []
            questions = [
                h for h in headings 
                if h.get('text', '').endswith('?') or
                h.get('text', '').lower().startswith(('what', 'how', 'why', 'when', 'where', 'who'))
            ]
            
            if len(questions) < 2 and body:
                raise ValidationError(
                    _('FAQPage schema requires at least 2 question-answer pairs. '
                      'Add headings ending with ? or starting with question words.')
                )
        
        return schema_type
    
    def clean_sitemap_priority(self) -> float:
        """
        Validate sitemap priority is within 0.0-1.0 range.
        """
        priority = self.cleaned_data.get('sitemap_priority', 0.7)
        
        if not (0.0 <= priority <= 1.0):
            raise ValidationError(
                _('Priority must be between 0.0 and 1.0.')
            )
        
        return priority
    
    def clean_focus_keyphrase(self) -> str:
        """
        Validate focus keyphrase and provide density warnings.
        """
        keyphrase = self.cleaned_data.get('focus_keyphrase', '').strip().lower()
        
        if not keyphrase:
            return keyphrase
        
        # Basic validation: no special characters
        if any(char in keyphrase for char in ['<', '>', '&', '"', "'"]):
            raise ValidationError(_('Keyphrase contains invalid characters.'))
        
        # Check length
        if len(keyphrase) > 100:
            raise ValidationError(_('Keyphrase is too long (max 100 characters).'))
        
        # Density check against post content (warning only, not validation error)
        body = ''
        if self.post_instance:
            body = getattr(self.post_instance, 'body', '') or ''
        
        if body and keyphrase:
            from seo.analysis.utils import count_words, find_keyphrase_positions
            word_count = count_words(body)
            keyphrase_words = len(keyphrase.split())
            occurrences = len(find_keyphrase_positions(body.lower(), keyphrase))
            
            if word_count > 0:
                density = ((occurrences * keyphrase_words) / word_count) * 100
                
                if density > KEYPHRASE_DENSITY_MAX:
                    # Add warning but don't fail validation
                    self.add_warning(
                        'focus_keyphrase',
                        _('Keyphrase density (%.1f%%) exceeds recommended maximum (%.1f%%). '
                          'Risk of over-optimization.') % (density, KEYPHRASE_DENSITY_MAX)
                    )
                elif density < KEYPHRASE_DENSITY_MIN:
                    self.add_warning(
                        'focus_keyphrase',
                        _('Keyphrase density (%.1f%%) is below recommended minimum (%.1f%%).') % 
                        (density, KEYPHRASE_DENSITY_MIN)
                    )
        
        return keyphrase
    
    def add_warning(self, field: str, message: str) -> None:
        """
        Add non-blocking warning to a field.
        
        Warnings are stored and can be displayed to users without
        preventing form submission.
        """
        if not hasattr(self, '_warnings'):
            self._warnings = {}
        
        if field not in self._warnings:
            self._warnings[field] = []
        
        self._warnings[field].append(message)
    
    def get_warnings(self) -> Dict[str, List[str]]:
        """
        Retrieve all field warnings.
        """
        return getattr(self, '_warnings', {})


# =============================================================================
# QUICK EDIT FORM
# =============================================================================

class SEOQuickEditForm(forms.ModelForm):
    """
    Simplified form for rapid SEO editing in list views or bulk operations.
    
    Includes only the most commonly modified fields for editorial workflow
    efficiency.
    """
    
    class Meta:
        model = PostSEO
        fields = [
            'seo_title',
            'meta_description',
            'focus_keyphrase',
            'is_cornerstone',
            'schema_type',
        ]
        widgets = {
            'seo_title': forms.TextInput(attrs={
                'class': 'vTextField',
                'size': '40',
            }),
            'meta_description': forms.Textarea(attrs={
                'rows': 2,
                'class': 'vLargeTextField',
            }),
            'focus_keyphrase': forms.TextInput(attrs={
                'class': 'vTextField',
            }),
            'is_cornerstone': forms.CheckboxInput(),
            'schema_type': forms.Select(choices=SCHEMA_TYPE_CHOICES),
        }
    
    def clean_seo_title(self) -> str:
        """Validate length only, skip uniqueness for quick edit."""
        title = self.cleaned_data.get('seo_title', '')
        
        if len(title) > MAX_SEO_TITLE_LENGTH:
            raise ValidationError(
                _('Title exceeds %(max)d characters.') % {'max': MAX_SEO_TITLE_LENGTH}
            )
        
        return title
    
    def clean_meta_description(self) -> str:
        """Validate length."""
        description = self.cleaned_data.get('meta_description', '')
        
        if len(description) > MAX_META_DESCRIPTION_LENGTH:
            raise ValidationError(
                _('Description exceeds %(max)d characters.') % {'max': MAX_META_DESCRIPTION_LENGTH}
            )
        
        return description


# =============================================================================
# ANALYSIS REQUEST FORM
# =============================================================================

class SEOAnalysisRequestForm(forms.Form):
    """
    Form for triggering on-demand SEO analysis.
    
    Used in admin actions and API endpoints to request fresh analysis
    with specific triggering event context.
    """
    
    TRIGGER_CHOICES = [
        ('manual', _('Manual Request')),
        ('scheduled', _('Scheduled Analysis')),
        ('bulk', _('Bulk Reanalysis')),
    ]
    
    triggering_event = forms.ChoiceField(
        choices=TRIGGER_CHOICES,
        initial='manual',
        widget=forms.Select(),
        help_text=_('Context for this analysis run (affects audit logging).')
    )
    
    force_reanalysis = forms.BooleanField(
        required=False,
        initial=False,
        widget=forms.CheckboxInput(),
        help_text=_('Force reanalysis even if content hash matches cached version.')
    )
    
    def clean(self) -> Dict[str, Any]:
        """
        Validate form data.
        """
        cleaned_data = super().clean()
        return cleaned_data