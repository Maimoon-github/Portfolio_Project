"""
Django REST Framework API Views for SEO Application.

Provides RESTful endpoints for real-time SEO analysis, PostSEO CRUD operations,
and internal link suggestions. All endpoints use service layer functions and
include proper authentication, authorization, and rate limiting.

Rate Limiting:
    - Analysis endpoints: 10 requests per minute per user
    - Uses django-ratelimit with fallback to DRF throttling
"""

import logging
from typing import Any, Dict, List, Optional

from django.apps import apps
from django.core.exceptions import ObjectDoesNotExist, PermissionDenied
from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from django.db.models import Q   # <-- Add this line

from rest_framework import status, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

# Service layer imports
from ..services import (
    analyze_post_seo,
    get_internal_link_suggestions,
    get_seo_dashboard_data,
    get_or_create_post_seo,
    bulk_reanalyze_posts,
    find_orphan_posts,
)
from ..tasks import compute_seo_scores_task
from ..analysis.engine import analyze_post

# Serializers
from .serializers import (
    PostSEOSerializer,
    SEOAnalysisRequestSerializer,
    SEOAnalysisResponseSerializer,
    PostSEOAuditLogSerializer,
)

# Models (import directly since we're in api/views.py)
from ..models import PostSEO, PostSEOAuditLog

logger = logging.getLogger(__name__)

# Try to import ratelimit, fallback to DRF throttling if unavailable
try:
    from ratelimit.decorators import ratelimit  # type: ignore
    from ratelimit.exceptions import Ratelimited  # type: ignore
    HAS_RATELIMIT = True
except ImportError:
    HAS_RATELIMIT = False
    Ratelimited = Exception
    # Create no-op decorator
    def ratelimit(*args, **kwargs):
        def decorator(func):
            return func
        return decorator


# =============================================================================
# REAL-TIME ANALYSIS API
# =============================================================================

class SEOAnalysisAPIView(APIView):
    """
    API endpoint for real-time SEO analysis of draft content.
    
    Accepts draft post data (title, body, keyphrase, etc.) and returns
    immediate SEO scores and recommendations without persisting to database.
    Useful for live editor previews and content optimization workflows.
    
    Rate Limit: 10 requests per minute per user.
    """
    permission_classes = [IsAuthenticated]
    
    def check_permissions(self, request: HttpRequest) -> None:
        """Add rate limiting check before standard permission checks."""
        super().check_permissions(request)
        
        # Apply rate limiting if django-ratelimit is available
        if HAS_RATELIMIT:
            # Check rate limit manually since we're in a class-based view
            from ratelimit.core import is_ratelimited  # type: ignore
            
            is_limited = is_ratelimited(
                request=request,
                group='seo_analysis',
                key='user',
                rate='10/m',
                increment=True
            )
            
            if is_limited:
                raise Ratelimited("Rate limit exceeded: 10 requests per minute")
    
    def post(self, request: HttpRequest, format: Optional[str] = None) -> Response:
        """
        Analyze draft content and return SEO scores.
        
        Request Body:
            - title: str (optional)
            - slug: str (optional)
            - body: str (optional)
            - seo_title: str (optional)
            - meta_description: str (optional)
            - focus_keyphrase: str (optional)
            - post_id: int (optional, for comparison with existing)
            
        Response:
            - seo_score: int (0-100)
            - readability_score: int (0-100)
            - breakdown: list of check results
            - readability_details: Flesch-Kincaid metrics
            - schema_recommendation: suggested schema type
            - suggestions: list of improvement suggestions
        """
        # Validate request data
        request_serializer = SEOAnalysisRequestSerializer(data=request.data)
        if not request_serializer.is_valid():
            return Response(
                {'error': 'Invalid request', 'details': request_serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        data = request_serializer.validated_data
        
        try:
            # Build post_data dict for analysis engine
            post_data = {
                'title': data.get('title', ''),
                'slug': data.get('slug', ''),
                'body': data.get('body', ''),
                'seo_title': data.get('seo_title', ''),
                'meta_description': data.get('meta_description', ''),
                'focus_keyphrase': data.get('focus_keyphrase', ''),
            }
            
            # If post_id provided, merge with existing data
            post_id = data.get('post_id')
            if post_id:
                try:
                    Post = apps.get_model('blog', 'Post')
                    existing_post = Post.objects.get(pk=post_id)
                    
                    # Use existing data as fallback for empty fields
                    post_data.setdefault('title', existing_post.title)
                    post_data.setdefault('slug', existing_post.slug)
                    post_data.setdefault('body', existing_post.body)
                    
                    # Get existing SEO data
                    try:
                        existing_seo = existing_post.seo
                        post_data.setdefault('seo_title', existing_seo.seo_title)
                        post_data.setdefault('meta_description', existing_seo.meta_description)
                        post_data.setdefault('focus_keyphrase', existing_seo.focus_keyphrase)
                    except (PostSEO.DoesNotExist, AttributeError):
                        pass
                        
                except ObjectDoesNotExist:
                    pass
            
            # Run analysis via pure Python engine (no DB writes)
            analysis_result = analyze_post(post_data)
            
            # Generate suggestions
            suggestions = self._generate_suggestions(analysis_result)
            analysis_result['suggestions'] = suggestions
            
            # Serialize response
            response_serializer = SEOAnalysisResponseSerializer(data=analysis_result)
            if response_serializer.is_valid():
                return Response(response_serializer.data, status=status.HTTP_200_OK)
            else:
                # Return raw result if serialization fails (shouldn't happen)
                logger.error(f"Response serialization failed: {response_serializer.errors}")
                return Response(analysis_result, status=status.HTTP_200_OK)
                
        except Exception as e:
            logger.exception(f"Error in analysis API: {e}")
            return Response(
                {'error': 'Analysis failed', 'message': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def _generate_suggestions(self, analysis: Dict[str, Any]) -> List[str]:
        """
        Generate actionable suggestions from analysis results.
        """
        suggestions = []
        
        # Check for failing checks
        breakdown = analysis.get('breakdown', [])
        for check in breakdown:
            if check.get('status') == 'fail':
                suggestions.append(check.get('message', ''))
            elif check.get('status') == 'warning':
                suggestions.append(f"Warning: {check.get('message', '')}")
        
        # Readability suggestions
        readability = analysis.get('readability_details', {})
        if readability.get('overall_status') == 'fail':
            flesch = readability.get('flesch_reading_ease', {})
            score = flesch.get('score', 0) if isinstance(flesch, dict) else flesch
            
            if isinstance(score, (int, float)) and score < 60:
                suggestions.append(
                    "Content readability is low. Use shorter sentences and simpler words."
                )
        
        # Keyphrase suggestions
        keyphrase_analysis = analysis.get('keyphrase_analysis', {})
        if not keyphrase_analysis.get('found_in_title', False):
            suggestions.append("Add focus keyphrase to the title.")
        if not keyphrase_analysis.get('found_in_first_para', False):
            suggestions.append("Include focus keyphrase in the first paragraph.")
        
        return [s for s in suggestions if s]


# =============================================================================
# POST SEO VIEWSET
# =============================================================================

class PostSEOViewSet(viewsets.ModelViewSet):
    """
    ViewSet for PostSEO CRUD operations and actions.
    
    Provides standard REST operations for SEO metadata management plus
    custom actions for reanalysis and dashboard statistics.
    
    Endpoints:
        GET    /api/seo/post-seo/           - List all SEO records
        POST   /api/seo/post-seo/           - Create new SEO record
        GET    /api/seo/post-seo/{id}/      - Retrieve specific record
        PUT    /api/seo/post-seo/{id}/      - Update record
        DELETE /api/seo/post-seo/{id}/      - Delete record
        POST   /api/seo/post-seo/{id}/reanalyze/ - Trigger reanalysis
        GET    /api/seo/post-seo/dashboard/ - Get dashboard stats
    """
    serializer_class = PostSEOSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'
    
    def get_queryset(self) -> Any:
        """
        Return queryset with related post data to prevent N+1.
        """
        return PostSEO.objects.select_related('post').all()
    
    def perform_create(self, serializer: Any) -> None:
        """
        Create new PostSEO instance.
        """
        serializer.save()
    
    def perform_update(self, serializer: Any) -> None:
        """
        Update PostSEO and trigger cache invalidation via signals.
        """
        serializer.save()
    
    @action(detail=True, methods=['post'], url_path='reanalyze')
    def reanalyze(self, request: HttpRequest, pk: Optional[int] = None) -> Response:
        """
        Trigger asynchronous SEO reanalysis for a specific post.
        
        Args:
            pk: PostSEO primary key (extracted from URL).
            
        Returns:
            202 Accepted with task ID if queued successfully.
            404 if PostSEO not found.
        """
        try:
            post_seo = self.get_object()
            post_id = post_seo.post_id
            
            # Queue async task
            task = compute_seo_scores_task.delay(
                post_id=post_id,
                triggering_event='api'
            )
            
            logger.info(f"Queued reanalysis for post {post_id} via API (task: {task.id})")
            
            return Response({
                'status': 'queued',
                'post_id': post_id,
                'task_id': task.id,
                'message': 'SEO analysis queued successfully'
            }, status=status.HTTP_202_ACCEPTED)
            
        except Exception as e:
            logger.error(f"Error queueing reanalysis for pk={pk}: {e}")
            return Response(
                {'error': 'Failed to queue analysis', 'message': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'], url_path='dashboard')
    def dashboard(self, request: HttpRequest) -> Response:
        """
        Return SEO dashboard statistics.
        
        Returns aggregated data including:
            - Total posts and analysis coverage
            - Score distributions
            - Orphan post count
            - Recent activity
        """
        try:
            data = get_seo_dashboard_data()
            
            # Add orphan count
            try:
                data['orphan_count'] = find_orphan_posts().count()
            except Exception:
                data['orphan_count'] = 0
            
            return Response(data, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Error generating dashboard data: {e}")
            return Response(
                {'error': 'Failed to generate dashboard', 'message': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['post'], url_path='bulk-reanalyze')
    def bulk_reanalyze(self, request: HttpRequest) -> Response:
        """
        Trigger bulk reanalysis for multiple posts.
        
        Request Body:
            post_ids: list[int] (optional, if omitted analyzes all posts)
        """
        post_ids = request.data.get('post_ids', None)
        
        try:
            result = bulk_reanalyze_posts(post_ids=post_ids)
            
            if 'error' in result:
                return Response(
                    {'error': result['error']},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            return Response({
                'status': 'queued',
                'message': result.get('message', 'Bulk reanalysis queued'),
                'queued_count': result.get('queued', 0)
            }, status=status.HTTP_202_ACCEPTED)
            
        except Exception as e:
            logger.error(f"Error in bulk reanalyze: {e}")
            return Response(
                {'error': 'Bulk reanalysis failed', 'message': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'], url_path='audit-logs')
    def audit_logs(self, request: HttpRequest) -> Response:
        """
        Retrieve recent SEO audit log entries.
        
        Query Parameters:
            post_id: int (optional, filter by specific post)
            limit: int (optional, default 50, max 200)
        """
        try:
            post_id = request.query_params.get('post_id')
            limit = min(int(request.query_params.get('limit', 50)), 200)
            
            queryset = PostSEOAuditLog.objects.select_related(
                'post_seo', 'post_seo__post'
            ).order_by('-created_at')
            
            if post_id:
                queryset = queryset.filter(post_seo__post_id=post_id)
            
            logs = queryset[:limit]
            serializer = PostSEOAuditLogSerializer(logs, many=True)
            
            return Response({
                'count': len(serializer.data),
                'results': serializer.data
            })
            
        except Exception as e:
            logger.error(f"Error retrieving audit logs: {e}")
            return Response(
                {'error': 'Failed to retrieve logs', 'message': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# =============================================================================
# INTERNAL LINK SUGGESTIONS API
# =============================================================================

class InternalLinkSuggestionsAPIView(APIView):
    """
    API endpoint for retrieving internal link suggestions.
    
    Provides related posts based on keyphrase matching, category alignment,
    and content similarity. Supports lookup by post_id or raw keyphrase.
    
    Query Parameters:
        post_id: int (optional) - Get suggestions for specific post
        keyphrase: str (optional) - Get suggestions matching this keyphrase
        limit: int (optional, default 5, max 20) - Number of suggestions
        
    At least one of post_id or keyphrase must be provided.
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request: HttpRequest, format: Optional[str] = None) -> Response:
        """
        Handle GET request for link suggestions.
        """
        post_id = request.query_params.get('post_id')
        keyphrase = request.query_params.get('keyphrase', '').strip()
        limit = min(int(request.query_params.get('limit', 5)), 20)
        
        if not post_id and not keyphrase:
            return Response(
                {
                    'error': 'Missing parameters',
                    'message': 'Provide either post_id or keyphrase'
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            suggestions = []
            
            if post_id:
                # Get suggestions based on existing post
                Post = apps.get_model('blog', 'Post')
                try:
                    post = Post.objects.get(pk=post_id)
                    suggestions = get_internal_link_suggestions(post, limit=limit)
                except ObjectDoesNotExist:
                    return Response(
                        {'error': f'Post {post_id} not found'},
                        status=status.HTTP_404_NOT_FOUND
                    )
            
            elif keyphrase:
                # Search for posts matching keyphrase
                Post = apps.get_model('blog', 'Post')
                suggestions = Post.objects.filter(
                    status='published'
                ).filter(
                    Q(title__icontains=keyphrase) |
                    Q(body__icontains=keyphrase) |
                    Q(seo__focus_keyphrase__icontains=keyphrase)
                ).select_related('seo').distinct()[:limit]
            
            # Serialize suggestions
            data = []
            for post in suggestions:
                seo_score = None
                try:
                    seo_score = post.seo.seo_score
                except (PostSEO.DoesNotExist, AttributeError):
                    pass
                
                data.append({
                    'id': post.pk,
                    'title': post.title,
                    'slug': post.slug,
                    'url': post.get_absolute_url(),
                    'excerpt': getattr(post, 'excerpt', '') or post.body[:200] if hasattr(post, 'body') else '',
                    'seo_score': seo_score,
                    'published_at': post.published_at.isoformat() if hasattr(post, 'published_at') and post.published_at else None,
                })
            
            return Response({
                'count': len(data),
                'post_id': post_id,
                'keyphrase': keyphrase if not post_id else None,
                'suggestions': data
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.exception(f"Error retrieving link suggestions: {e}")
            return Response(
                {'error': 'Failed to retrieve suggestions', 'message': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# =============================================================================
# UTILITY ENDPOINTS
# =============================================================================

class SchemaValidationAPIView(APIView):
    """
    API endpoint for validating Schema.org markup.
    
    Accepts HTML content and validates JSON-LD structured data using extruct.
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request: HttpRequest) -> Response:
        """
        Validate schema markup in provided HTML.
        
        Request Body:
            html: str - HTML content to validate
        """
        html_content = request.data.get('html', '')
        
        if not html_content:
            return Response(
                {'error': 'No HTML content provided'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            from ..schema import validate_schema_with_extruct
            
            result = validate_schema_with_extruct(html_content)
            
            return Response({
                'valid': 'error' not in result,
                'data': result
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Schema validation error: {e}")
            return Response(
                {'error': 'Validation failed', 'message': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# =============================================================================
# ERROR HANDLING
# =============================================================================

def ratelimit_error_handler(request: HttpRequest, exception: Exception) -> Response:
    """
    Handle ratelimit exceptions and return proper API response.
    """
    if isinstance(exception, Ratelimited):
        return Response(
            {
                'error': 'Rate limit exceeded',
                'message': 'Too many requests. Please try again later.',
                'retry_after': 60
            },
            status=status.HTTP_429_TOO_MANY_REQUESTS
        )
    return Response(
        {'error': 'Request failed'},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )