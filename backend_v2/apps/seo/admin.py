"""
Django Admin Configuration for SEO Application.

Provides admin interfaces for PostSEO companion data, redirect management,
audit log viewing, and SEO dashboard. Extends the blog app's PostAdmin
with SEO inline editing and bulk actions.

Note:
    This module uses dynamic Post model retrieval via apps.get_model()
    to prevent circular imports with the blog app.
"""

import logging
from typing import Any, List, Optional

from django import forms
from django.apps import apps
from django.contrib import admin, messages
from django.contrib.admin import SimpleListFilter
from django.db.models import QuerySet
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.urls import path
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from admin_numeric_filter.admin import RangeNumericFilter

from .models import PostSEO, PostRedirect, PostSEOAuditLog
from .forms import PostSEOForm, SEOQuickEditForm
from .services import (
    analyze_post_seo,
    bulk_reanalyze_posts,
    get_seo_dashboard_data,
    find_orphan_posts,
)
from .tasks import compute_seo_scores_task

logger = logging.getLogger(__name__)


# =============================================================================
# CUSTOM LIST FILTERS
# =============================================================================

class SEOScoreRangeFilter(SimpleListFilter):
    title = 'SEO Score'
    parameter_name = 'seo_score'

    def lookups(self, request, model_admin):
        return (
            ('0-49', 'Poor (0-49)'),
            ('50-69', 'Needs Improvement (50-69)'),
            ('70-100', 'Good (70-100)'),
        )

    def queryset(self, request, queryset):
        if self.value() == '0-49':
            return queryset.filter(seo_score__gte=0, seo_score__lte=49)
        if self.value() == '50-69':
            return queryset.filter(seo_score__gte=50, seo_score__lte=69)
        if self.value() == '70-100':
            return queryset.filter(seo_score__gte=70, seo_score__lte=100)
        elif self.value() == 'unscored':
            return queryset.filter(seo__seo_score__isnull=True)
        return queryset

    # def queryset(self, request: HttpRequest, queryset: QuerySet) -> QuerySet:
    #     if self.value() == 'excellent':
    #         return queryset.filter(seo__seo_score__gte=70)
    #     elif self.value() == 'good':
    #         return queryset.filter(seo__seo_score__range=(50, 69))
    #     elif self.value() == 'poor':
    #         return queryset.filter(seo__seo_score__range=(0, 49))
    #     elif self.value() == 'unscored':
    #         return queryset.filter(seo__seo_score__isnull=True)
    #     return queryset


class ReadabilityScoreListFilter(SimpleListFilter):
    """
    Filter posts by readability score ranges.
    """
    title = 'Readability'
    parameter_name = 'readability_range'

    def lookups(self, request: HttpRequest, model_admin: Any) -> List[tuple]:
        return [
            ('easy', 'Easy (60+)'),
            ('medium', 'Medium (40-59)'),
            ('difficult', 'Difficult (<40)'),
            ('unscored', 'Not Scored'),
        ]

    def queryset(self, request: HttpRequest, queryset: QuerySet) -> QuerySet:
        if self.value() == 'easy':
            return queryset.filter(seo__readability_score__gte=60)
        elif self.value() == 'medium':
            return queryset.filter(seo__readability_score__range=(40, 59))
        elif self.value() == 'difficult':
            return queryset.filter(seo__readability_score__lt=40)
        elif self.value() == 'unscored':
            return queryset.filter(seo__readability_score__isnull=True)
        return queryset


class CornerstoneListFilter(SimpleListFilter):
    """
    Filter by cornerstone/pillar content status.
    """
    title = 'Cornerstone Content'
    parameter_name = 'cornerstone'

    def lookups(self, request: HttpRequest, model_admin: Any) -> List[tuple]:
        return [
            ('yes', 'Cornerstone'),
            ('no', 'Regular'),
        ]

    def queryset(self, request: HttpRequest, queryset: QuerySet) -> QuerySet:
        if self.value() == 'yes':
            return queryset.filter(seo__is_cornerstone=True)
        elif self.value() == 'no':
            return queryset.filter(seo__is_cornerstone=False)
        return queryset


class SchemaTypeListFilter(SimpleListFilter):
    """
    Filter by Schema.org type.
    """
    title = 'Schema Type'
    parameter_name = 'schema_type'

    def lookups(self, request: HttpRequest, model_admin: Any) -> List[tuple]:
        from .constants import SCHEMA_TYPE_CHOICES
        return SCHEMA_TYPE_CHOICES

    def queryset(self, request: HttpRequest, queryset: QuerySet) -> QuerySet:
        if self.value():
            return queryset.filter(seo__schema_type=self.value())
        return queryset


# =============================================================================
# INLINE ADMIN
# =============================================================================

class PostSEOInline(admin.StackedInline):
    """
    Inline editing of SEO metadata on Post admin page.
    
    Provides comprehensive SEO editing with score display and field
    organization into logical groupings.
    """
    model = PostSEO
    fk_name = 'post'
    extra = 0
    max_num = 1
    form = PostSEOForm
    can_delete = False
    
    readonly_fields = [
        'seo_score',
        'readability_score',
        'last_analyzed_at',
        'content_hash',
    ]
    
    fieldsets = (
        ('Basic SEO', {
            'fields': [
                'seo_title',
                'meta_description',
                'focus_keyphrase',
                'secondary_keyphrases',
            ],
            'description': 'Core SEO metadata for search engine visibility.'
        }),
        ('Advanced', {
            'fields': [
                'canonical_url',
                'robots',
                'is_cornerstone',
            ],
            'classes': ('collapse',),
            'description': 'Advanced indexing and content strategy settings.'
        }),
        ('Social Media', {
            'fields': [
                'og_title',
                'og_description',
                'og_image',
                'twitter_title',
                'twitter_description',
                'twitter_image',
            ],
            'classes': ('collapse',),
            'description': 'Open Graph and Twitter Card metadata for social sharing.'
        }),
        ('Schema & Sitemap', {
            'fields': [
                'schema_type',
                'schema_extra',
                'sitemap_priority',
                'sitemap_changefreq',
            ],
            'classes': ('collapse',),
            'description': 'Structured data and XML sitemap configuration.'
        }),
        ('Analysis Results', {
            'fields': [
                'seo_score',
                'readability_score',
                'last_analyzed_at',
                'content_hash',
            ],
            'description': 'Computed SEO scores and analysis timestamps.'
        }),
    )
    
    def get_formset(self, request: Any, obj: Any = None, **kwargs: Any) -> Any:
        """
        Pass post instance to form for contextual validation.
        """
        formset = super().get_formset(request, obj, **kwargs)
        
        # Store post reference for form validation
        class FormSetWithPost(formset):
            def _construct_form(self, i: int, **kwargs: Any) -> Any:
                form = super()._construct_form(i, **kwargs)
                form.post_instance = obj
                return form
        
        return FormSetWithPost


# =============================================================================
# POST ADMIN EXTENSION
# =============================================================================

def extend_post_admin() -> None:
    """
    Dynamically extend the blog app's PostAdmin with SEO features.
    
    This function should be called from AppConfig.ready() to ensure
    the blog app is fully loaded first.
    """
    try:
        Post = apps.get_model('blog', 'Post')
        
        # Get existing PostAdmin if registered
        if Post in admin.site._registry:
            post_admin_class = admin.site._registry[Post].__class__
            
            # Add inline
            if not hasattr(post_admin_class, 'inlines'):
                post_admin_class.inlines = []
            
            if PostSEOInline not in post_admin_class.inlines:
                post_admin_class.inlines = list(post_admin_class.inlines) + [PostSEOInline]
            
            # Add list display methods
            def seo_score_display(self, obj: Any) -> str:
                """Display SEO score with color coding."""
                score = getattr(obj.seo, 'seo_score', None)
                if score is None:
                    return format_html('<span style="color: gray;">—</span>')
                elif score >= 70:
                    return format_html('<span style="color: green; font-weight: bold;">{}</span>', score)
                elif score >= 50:
                    return format_html('<span style="color: orange;">{}</span>', score)
                else:
                    return format_html('<span style="color: red;">{}</span>', score)
            seo_score_display.short_description = 'SEO Score'
            
            def readability_score_display(self, obj: Any) -> str:
                """Display readability score."""
                score = getattr(obj.seo, 'readability_score', None)
                if score is None:
                    return format_html('<span style="color: gray;">—</span>')
                return format_html('<span>{}</span>', score)
            readability_score_display.short_description = 'Readability'
            
            def focus_keyphrase_display(self, obj: Any) -> str:
                """Display focus keyphrase."""
                keyphrase = getattr(obj.seo, 'focus_keyphrase', '')
                if keyphrase:
                    return format_html('<code>{}</code>', keyphrase[:50])
                return '—'
            focus_keyphrase_display.short_description = 'Keyphrase'
            
            # Add methods to class
            post_admin_class.seo_score_display = seo_score_display
            post_admin_class.readability_score_display = readability_score_display
            post_admin_class.focus_keyphrase_display = focus_keyphrase_display
            
            # Extend list_display
            if hasattr(post_admin_class, 'list_display'):
                post_admin_class.list_display = list(post_admin_class.list_display) + [
                    'seo_score_display',
                    'readability_score_display',
                    'focus_keyphrase_display',
                ]
            
            # Add filters
            if not hasattr(post_admin_class, 'list_filter'):
                post_admin_class.list_filter = []
            
            post_admin_class.list_filter = list(post_admin_class.list_filter) + [
                SEOScoreRangeFilter,
                ReadabilityScoreListFilter,
                CornerstoneListFilter,
                SchemaTypeListFilter,
            ]
            
            # Add actions
            def reanalyze_selected_posts(self, request: HttpRequest, queryset: QuerySet) -> None:
                """Admin action to reanalyze SEO for selected posts."""
                count = queryset.count()
                post_ids = list(queryset.values_list('id', flat=True))
                
                # Queue async tasks
                for post_id in post_ids:
                    compute_seo_scores_task.delay(post_id, triggering_event='manual')
                
                self.message_user(
                    request,
                    f'Queued SEO reanalysis for {count} post(s).',
                    messages.SUCCESS
                )
            reanalyze_selected_posts.short_description = 'Reanalyze SEO for selected posts'
            
            def mark_as_cornerstone(self, request: HttpRequest, queryset: QuerySet) -> None:
                """Mark selected posts as cornerstone content."""
                from seo.services import get_or_create_post_seo
                
                count = 0
                for post in queryset:
                    try:
                        seo = get_or_create_post_seo(post)
                        seo.is_cornerstone = True
                        seo.save(update_fields=['is_cornerstone', 'updated_at'])
                        count += 1
                    except Exception as e:
                        logger.error(f"Error marking post {post.pk} as cornerstone: {e}")
                
                self.message_user(
                    request,
                    f'Marked {count} post(s) as cornerstone content.',
                    messages.SUCCESS
                )
            mark_as_cornerstone.short_description = 'Mark as cornerstone content'
            
            def remove_cornerstone(self, request: HttpRequest, queryset: QuerySet) -> None:
                """Remove cornerstone status from selected posts."""
                from seo.services import get_or_create_post_seo
                
                count = 0
                for post in queryset:
                    try:
                        seo = get_or_create_post_seo(post)
                        seo.is_cornerstone = False
                        seo.save(update_fields=['is_cornerstone', 'updated_at'])
                        count += 1
                    except Exception as e:
                        logger.error(f"Error removing cornerstone from post {post.pk}: {e}")
                
                self.message_user(
                    request,
                    f'Removed cornerstone status from {count} post(s).',
                    messages.SUCCESS
                )
            remove_cornerstone.short_description = 'Remove cornerstone status'
            
            # Add action methods to class
            post_admin_class.reanalyze_selected_posts = reanalyze_selected_posts
            post_admin_class.mark_as_cornerstone = mark_as_cornerstone
            post_admin_class.remove_cornerstone = remove_cornerstone
            
            if not hasattr(post_admin_class, 'actions'):
                post_admin_class.actions = []
            
            post_admin_class.actions = list(post_admin_class.actions) + [
                'reanalyze_selected_posts',
                'mark_as_cornerstone',
                'remove_cornerstone',
            ]
            
            # Optimize queryset
            original_get_queryset = post_admin_class.get_queryset
            
            def get_queryset_with_seo(self, request: HttpRequest) -> QuerySet:
                """Prefetch SEO data to prevent N+1 queries."""
                qs = original_get_queryset(self, request)
                return qs.select_related('seo')
            
            post_admin_class.get_queryset = get_queryset_with_seo
            
            logger.debug("Extended PostAdmin with SEO features")
            
    except LookupError:
        logger.warning("Blog Post model not found, skipping PostAdmin extension")
    except Exception as e:
        logger.error(f"Error extending PostAdmin: {e}")


# =============================================================================
# STANDALONE ADMIN CLASSES
# =============================================================================

@admin.register(PostRedirect)
class PostRedirectAdmin(admin.ModelAdmin):
    """
    Admin interface for managing URL redirects.
    """
    list_display = [
        'post',
        'old_slug',
        'new_slug',
        'status_code',
        'is_active',
        'created_at',
        'redirect_link',
    ]
    list_filter = [
        'status_code',
        'is_active',
        'created_at',
    ]
    search_fields = [
        'old_slug',
        'new_slug',
        'post__title',
    ]
    readonly_fields = [
        'created_at',
    ]
    date_hierarchy = 'created_at'
    
    def redirect_link(self, obj: PostRedirect) -> str:
        """Display clickable link to test redirect."""
        if obj.post:
            url = obj.post.get_absolute_url()
            return format_html(
                '<a href="{}" target="_blank">Test Redirect →</a>',
                url
            )
        return '—'
    redirect_link.short_description = 'Test'
    
    actions = ['activate_redirects', 'deactivate_redirects']
    
    def activate_redirects(self, request: HttpRequest, queryset: QuerySet) -> None:
        """Bulk activate selected redirects."""
        count = queryset.update(is_active=True)
        self.message_user(request, f'Activated {count} redirect(s).', messages.SUCCESS)
    activate_redirects.short_description = 'Activate selected redirects'
    
    def deactivate_redirects(self, request: HttpRequest, queryset: QuerySet) -> None:
        """Bulk deactivate selected redirects."""
        count = queryset.update(is_active=False)
        self.message_user(request, f'Deactivated {count} redirect(s).', messages.SUCCESS)
    deactivate_redirects.short_description = 'Deactivate selected redirects'


@admin.register(PostSEOAuditLog)
class PostSEOAuditLogAdmin(admin.ModelAdmin):
    """
    Read-only admin for viewing SEO analysis history.
    """
    list_display = [
        'post_seo',
        'seo_score_display',
        'readability_score_display',
        'triggering_event',
        'created_at',
    ]
    list_filter = [
        'triggering_event',
        'created_at',
        SEOScoreRangeFilter,
    ]
    readonly_fields = [
        'post_seo',
        'seo_score',
        'readability_score',
        'score_breakdown',
        'triggering_event',
        'created_at',
    ]
    date_hierarchy = 'created_at'
    search_fields = [
        'post_seo__post__title',
    ]
    
    def has_add_permission(self, request: HttpRequest) -> bool:
        """Audit logs are append-only."""
        return False
    
    def has_change_permission(self, request: HttpRequest, obj: Any = None) -> bool:
        """Audit logs are immutable."""
        return False
    
    def seo_score_display(self, obj: PostSEOAuditLog) -> str:
        """Color-coded score display."""
        if obj.seo_score is None:
            return '—'
        elif obj.seo_score >= 70:
            return format_html('<span style="color: green;">{}</span>', obj.seo_score)
        elif obj.seo_score >= 50:
            return format_html('<span style="color: orange;">{}</span>', obj.seo_score)
        else:
            return format_html('<span style="color: red;">{}</span>', obj.seo_score)
    seo_score_display.short_description = 'SEO Score'
    
    def readability_score_display(self, obj: PostSEOAuditLog) -> str:
        """Display readability score."""
        if obj.readability_score is None:
            return '—'
        return str(obj.readability_score)
    readability_score_display.short_description = 'Readability'
    
    def score_breakdown_display(self, obj: PostSEOAuditLog) -> str:
        """Pretty-print the score breakdown JSON."""
        import json
        try:
            if isinstance(obj.score_breakdown, dict):
                return format_html('<pre>{}</pre>', 
                    json.dumps(obj.score_breakdown, indent=2))
            return str(obj.score_breakdown)
        except Exception:
            return str(obj.score_breakdown)
    score_breakdown_display.short_description = 'Score Breakdown'


# =============================================================================
# CUSTOM DASHBOARD VIEW
# =============================================================================

class SEODashboardView(admin.ModelAdmin):
    """
    Custom admin view for SEO dashboard.
    
    Provides aggregated statistics and actionable insights for content
    optimization at a glance.
    """
    
    def get_urls(self) -> List:
        from django.urls import path
        urls = super().get_urls()
        custom_urls = [
            path('dashboard/', self.admin_site.admin_view(self.dashboard_view), name='seo_dashboard'),
        ]
        return custom_urls + urls
    
    def dashboard_view(self, request: HttpRequest) -> HttpResponse:
        """
        Render SEO dashboard with aggregated statistics.
        """
        # Get dashboard data from service
        dashboard_data = get_seo_dashboard_data()
        
        # Get orphan posts
        try:
            orphan_count = find_orphan_posts().count()
        except Exception:
            orphan_count = 0
        
        # Add orphan count to context
        context = {
            **self.admin_site.each_context(request),
            'title': 'SEO Dashboard',
            'dashboard_data': dashboard_data,
            'orphan_count': orphan_count,
            'needs_attention': dashboard_data.get('score_distribution', {}).get('poor', 0) +
                              dashboard_data.get('score_distribution', {}).get('unscored', 0),
        }
        return render(request, 'admin/seo/dashboard.html', context)


# =============================================================================
# INITIALIZATION
# =============================================================================

def register_seo_admin() -> None:
    """
    Register all SEO admin components.
    
    Called from AppConfig.ready() to ensure proper initialization order.
    """
    # Extend PostAdmin if available
    extend_post_admin()
    
    # Register standalone models (PostRedirect and PostSEOAuditLog use @admin.register)
    # SEODashboardView can be registered as a custom admin site or URL override
    
    logger.debug("SEO admin components registered")


# Call registration (will be called from apps.py ready() in production)
register_seo_admin()