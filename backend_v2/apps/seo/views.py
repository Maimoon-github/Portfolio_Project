"""
Django Views and Middleware for SEO Application.

Provides views for SEO analysis display and middleware for handling
slug-based redirects. All views use the service layer for business logic
and include proper error handling.
"""

import logging
from typing import Any, Optional

from django import forms
from django.apps import apps
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.core.exceptions import ObjectDoesNotExist, PermissionDenied
from django.http import Http404, HttpRequest, HttpResponse, HttpResponsePermanentRedirect, HttpResponseRedirect
from django.shortcuts import get_object_or_404, redirect, render
from django.utils.deprecation import MiddlewareMixin
from django.views.generic import DetailView, TemplateView, View

from seo.models import PostSEO, PostRedirect
from seo.services import (
    analyze_post_seo,
    get_or_create_post_seo,
    get_social_preview_data,
    render_schema_json_ld,
    compute_reading_time,
    get_internal_link_suggestions,
)
from seo.cache import get_cached_metadata, set_cached_metadata

logger = logging.getLogger(__name__)


# =============================================================================
# SEO ANALYSIS VIEW
# =============================================================================

class SEOAnalysisView(LoginRequiredMixin, DetailView):
    """
    Detail view displaying comprehensive SEO analysis for a blog post.
    
    Provides editors and administrators with detailed breakdown of SEO scores,
    readability metrics, and actionable recommendations for content optimization.
    
    Attributes:
        template_name: Path to analysis display template.
        context_object_name: Name for post object in template context.
    """
    template_name: str = 'seo/analysis_detail.html'
    context_object_name: str = 'post'
    permission_required: str = 'blog.view_post'  # Adjust to your permission
    
    def get_object(self, queryset: Optional[Any] = None) -> Any:
        """
        Retrieve post by PK from URL kwargs.
        
        Uses apps.get_model() for lazy loading to prevent circular imports.
        
        Returns:
            Post model instance.
            
        Raises:
            Http404: If post not found.
        """
        try:
            Post = apps.get_model('blog', 'Post')
            post_id = self.kwargs.get('pk') or self.kwargs.get('post_id')
            
            if not post_id:
                raise Http404("No post ID provided")
            
            return get_object_or_404(Post, pk=post_id)
            
        except LookupError:
            logger.error("Blog Post model not found")
            raise Http404("Post model unavailable")
    
    def get_context_data(self, **kwargs: Any) -> dict:
        """
        Build context with SEO analysis data.
        
        Includes:
            - post: The blog post
            - post_seo: Companion SEO record
            - analysis: Full analysis results (triggers if stale)
            - score_breakdown: Individual check results
            - readability_details: Flesch-Kincaid metrics
            - social_preview: Open Graph/Twitter Card data
            - schema_json_ld: Structured data markup
            - reading_time: Estimated minutes to read
            - internal_link_suggestions: Related posts for linking
            
        Returns:
            Dictionary of context variables.
        """
        context = super().get_context_data(**kwargs)
        post = self.object
        
        # Get or create SEO companion
        try:
            post_seo = get_or_create_post_seo(post)
        except Exception as e:
            logger.error(f"Error retrieving PostSEO for {post.pk}: {e}")
            post_seo = None
        
        # Ensure fresh analysis (or get cached)
        analysis = {}
        if post_seo and post_seo.needs_reanalysis():
            try:
                analysis = analyze_post_seo(post.pk, triggering_event='manual')
            except Exception as e:
                logger.error(f"Error analyzing post {post.pk}: {e}")
                analysis = {'error': str(e)}
        elif post_seo:
            # Use cached data
            analysis = {
                'seo_score': post_seo.seo_score,
                'readability_score': post_seo.readability_score,
                'breakdown': post_seo.seo_score_breakdown or [],
                'cached': True,
            }
        
        # Get readability details from analysis or fallback
        readability_details = analysis.get('readability_details', {})
        if not readability_details and post_seo:
            # Re-run just readability if needed
            from seo.analysis.readability import analyze_readability
            readability_details = analyze_readability(getattr(post, 'body', ''))
        
        # Social preview data
        try:
            social_preview = get_social_preview_data(post)
        except Exception as e:
            logger.error(f"Error getting social preview: {e}")
            social_preview = {}
        
        # Schema markup
        try:
            schema_json_ld = render_schema_json_ld(post) if post_seo else ''
        except Exception as e:
            logger.error(f"Error rendering schema: {e}")
            schema_json_ld = ''
        
        # Reading time
        try:
            reading_time = compute_reading_time(post)
        except Exception as e:
            logger.error(f"Error computing reading time: {e}")
            reading_time = 0
        
        # Internal link suggestions (limit to 5)
        try:
            link_suggestions = get_internal_link_suggestions(post, limit=5)
        except Exception as e:
            logger.error(f"Error getting link suggestions: {e}")
            link_suggestions = []
        
        # Compile score breakdown
        score_breakdown = analysis.get('breakdown', []) or \
                         (post_seo.seo_score_breakdown if post_seo else [])
        
        context.update({
            'post_seo': post_seo,
            'analysis': analysis,
            'score_breakdown': score_breakdown,
            'readability_details': readability_details,
            'social_preview': social_preview,
            'schema_json_ld': schema_json_ld,
            'reading_time': reading_time,
            'link_suggestions': link_suggestions,
            'needs_attention': self._needs_attention(analysis, post_seo),
        })
        
        return context
    
    def _needs_attention(self, analysis: dict, post_seo: Optional[PostSEO]) -> bool:
        """
        Determine if post needs editorial attention based on scores.
        
        Args:
            analysis: Analysis results dictionary.
            post_seo: PostSEO instance.
            
        Returns:
            True if scores below thresholds or analysis stale.
        """
        if not post_seo:
            return True
        
        seo_score = analysis.get('seo_score') or post_seo.seo_score or 0
        readability_score = analysis.get('readability_score') or post_seo.readability_score or 0
        
        # Thresholds: SEO < 70 or Readability < 60 needs work
        if seo_score < 70 or readability_score < 60:
            return True
        
        # No analysis ever run
        if post_seo.last_analyzed_at is None:
            return True
        
        return False


# =============================================================================
# SEO DASHBOARD VIEW (for editors)
# =============================================================================

class SEODashboardView(LoginRequiredMixin, PermissionRequiredMixin, TemplateView):
    """
    Dashboard view showing SEO statistics and content needing attention.
    
    Requires 'seo.view_dashboard' permission.
    """
    template_name: str = 'seo/dashboard.html'
    permission_required: str = 'seo.view_dashboard'
    
    def get_context_data(self, **kwargs: Any) -> dict:
        """
        Load dashboard data from service layer.
        """
        from seo.services import get_seo_dashboard_data, find_orphan_posts
        
        context = super().get_context_data(**kwargs)
        
        try:
            dashboard_data = get_seo_dashboard_data()
            orphan_count = find_orphan_posts().count()
            
            context.update({
                'dashboard_data': dashboard_data,
                'orphan_count': orphan_count,
                'needs_attention_count': (
                    dashboard_data.get('score_distribution', {}).get('poor', 0) +
                    dashboard_data.get('score_distribution', {}).get('unscored', 0)
                ),
            })
        except Exception as e:
            logger.error(f"Error loading dashboard: {e}")
            context['error'] = str(e)
        
        return context


# =============================================================================
# REDIRECT MIDDLEWARE
# =============================================================================

class PostRedirectMiddleware(MiddlewareMixin):
    """
    Middleware handling slug-based redirects for moved posts.
    
    Intercepts incoming requests and checks if the URL path matches
    an old slug stored in PostRedirect. If found and active, issues
    the appropriate redirect (301/302) to the current post URL.
    
    Processing Order:
        1. Check if path matches /post/<slug>/ or /<slug>/ pattern
        2. Query PostRedirect for active old_slug match
        3. If found, redirect to post.get_absolute_url()
        4. Otherwise, pass through to next middleware/view
    
    Attributes:
        redirect_status_codes: Mapping of status codes to response classes.
    """
    
    redirect_status_codes = {
        301: HttpResponsePermanentRedirect,
        302: HttpResponseRedirect,
    }
    
    def process_request(self, request: HttpRequest) -> Optional[HttpResponse]:
        """
        Process incoming request for redirect matches.
        
        Args:
            request: Django HTTP request object.
            
        Returns:
            HttpResponseRedirect if redirect found, None otherwise.
        """
        # Only process GET/HEAD requests
        if request.method not in ('GET', 'HEAD'):
            return None
        
        path = request.path_info
        
        # Extract potential slug from URL patterns
        # Supports: /post/<slug>/, /<slug>/, /blog/<slug>/
        slug = self._extract_slug_from_path(path)
        
        if not slug:
            return None
        
        try:
            # Check for active redirect
            redirect_record = PostRedirect.objects.filter(
                old_slug=slug,
                is_active=True
            ).select_related('post').first()
            
            if redirect_record and redirect_record.post:
                # Get target URL from post
                target_url = redirect_record.post.get_absolute_url()
                
                # Preserve query string if present
                if request.META.get('QUERY_STRING'):
                    target_url += '?' + request.META['QUERY_STRING']
                
                # Determine response class based on status code
                response_class = self.redirect_status_codes.get(
                    redirect_record.status_code,
                    HttpResponsePermanentRedirect
                )
                
                logger.info(
                    f"Redirecting from '{slug}' to '{target_url}' "
                    f"({redirect_record.status_code})"
                )
                
                return response_class(target_url)
                
        except Exception as e:
            logger.error(f"Error processing redirect for path '{path}': {e}")
            # Fail silently - let request proceed to normal view
        
        return None
    
    def _extract_slug_from_path(self, path: str) -> Optional[str]:
        """
        Extract post slug from URL path.
        
        Handles common URL patterns:
            - /post/my-post-slug/
            - /blog/my-post-slug/
            - /my-post-slug/
            - /category/post-slug/ (returns post-slug)
        
        Args:
            path: URL path (e.g., '/post/hello-world/').
            
        Returns:
            Extracted slug or None.
        """
        # Remove leading/trailing slashes and split
        parts = path.strip('/').split('/')
        
        if not parts:
            return None
        
        # Common patterns where slug is last segment
        # or second-to-last if last is empty
        slug = parts[-1] if parts[-1] else (parts[-2] if len(parts) > 1 else None)
        
        # Validate slug format (rough check)
        if slug and '-' in slug and not slug.endswith(('.jpg', '.png', '.css', '.js')):
            return slug
        
        return None


# =============================================================================
# API ENDPOINTS (for AJAX/frontend integration)
# =============================================================================

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required


@login_required
@require_http_methods(["POST"])
def api_analyze_post(request: HttpRequest, post_id: int) -> JsonResponse:
    """
    API endpoint to trigger SEO analysis for a post.
    
    Returns JSON with analysis results for frontend consumption.
    """
    try:
        result = analyze_post_seo(post_id, triggering_event='api')
        return JsonResponse({
            'success': True,
            'data': result,
        })
    except Exception as e:
        logger.error(f"API analysis error for post {post_id}: {e}")
        return JsonResponse({
            'success': False,
            'error': str(e),
        }, status=500)


@login_required
@require_http_methods(["GET"])
def api_get_suggestions(request: HttpRequest, post_id: int) -> JsonResponse:
    """
    API endpoint to get internal link suggestions.
    """
    try:
        Post = apps.get_model('blog', 'Post')
        post = get_object_or_404(Post, pk=post_id)
        
        suggestions = get_internal_link_suggestions(post, limit=10)
        
        # Serialize suggestions
        data = [
            {
                'id': s.pk,
                'title': getattr(s, 'title', ''),
                'url': s.get_absolute_url(),
                'score': getattr(s, 'seo', None) and getattr(s.seo, 'seo_score', 0) or 0,
            }
            for s in suggestions
        ]
        
        return JsonResponse({
            'success': True,
            'suggestions': data,
        })
        
    except Exception as e:
        logger.error(f"API suggestions error for post {post_id}: {e}")
        return JsonResponse({
            'success': False,
            'error': str(e),
        }, status=500)


# =============================================================================
# SOCIAL PREVIEW VIEW
# =============================================================================

class SocialPreviewView(LoginRequiredMixin, DetailView):
    """
    View for previewing how post will appear on social platforms.
    
    Renders Facebook, Twitter, LinkedIn preview cards.
    """
    template_name: str = 'seo/social_preview.html'
    context_object_name: str = 'post'
    
    def get_object(self, queryset: Optional[Any] = None) -> Any:
        """Get post by PK."""
        Post = apps.get_model('blog', 'Post')
        return get_object_or_404(Post, pk=self.kwargs.get('pk'))
    
    def get_context_data(self, **kwargs: Any) -> dict:
        """Add social preview data to context."""
        context = super().get_context_data(**kwargs)
        post = self.object
        
        try:
            preview_data = get_social_preview_data(post)
            context['preview'] = preview_data
        except Exception as e:
            logger.error(f"Error getting social preview: {e}")
            context['error'] = str(e)
        
        return context