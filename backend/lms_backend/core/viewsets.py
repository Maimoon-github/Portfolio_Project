"""
Core API mixins and base viewset classes.
"""

import logging
from django.utils import timezone
from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

# Configure logger for content access
content_access_logger = logging.getLogger('content_access')


class PublishedContentMixin:
    """
    Mixin to ensure only published content is visible to public.
    """
    
    def get_queryset(self):
        """Return only published content for non-admin users."""
        model = self.serializer_class.Meta.model
        
        # Use the published manager to filter content
        queryset = model.published.all()
        
        # Log content access with count for monitoring
        count = queryset.count()
        content_access_logger.info(
            f"PublishedContentMixin: {model.__name__} | Count: {count} | "
            f"User: {self.request.user}"
        )
        
        return queryset


class AdminContentMixin:
    """
    Mixin to provide admin users with access to all non-deleted content.
    """
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def get_queryset(self):
        """Return all non-deleted content for admin users."""
        model = self.serializer_class.Meta.model
        return model.admin.all()


class BaseContentViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Base viewset for content types with filtering and search.
    """
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'  # Use slug for detail lookups by default
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        
        # Determine if unpublished content should be included
        context['include_unpublished'] = self.request.user.is_staff
        
        # Check if preview mode is requested (for admin users)
        context['preview_mode'] = (
            self.request.user.is_staff and
            self.request.query_params.get('preview', 'false').lower() == 'true'
        )
        
        # Include SEO fields for admin users
        context['include_seo_fields'] = self.request.user.is_staff
        
        return context


class PublishedContentViewSet(PublishedContentMixin, BaseContentViewSet):
    """
    ViewSet for public-facing content endpoints.
    Only returns published content.
    """
    pass


class AdminContentViewSet(AdminContentMixin, viewsets.ModelViewSet):
    """
    ViewSet for admin content management.
    Provides full CRUD operations for admin users.
    """
    pass


class DashboardContentSyncViewSet(viewsets.ViewSet):
    """
    API endpoint for monitoring backend-frontend content synchronization.
    """
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def list(self, request):
        """Get content synchronization status information."""
        from django.utils import timezone
        from lms_backend.pages.models import Page
        from lms_backend.courses.models import Course
        from lms_backend.blog.models import BlogPost
        from lms_backend.news.models import NewsItem
        from lms_backend.projects.models import Project
        import logging
        
        # Get logger for sync issues
        sync_logger = logging.getLogger('sync_issues')
        
        try:
            # Get pending publications (content that will be published soon)
            now = timezone.now()
            one_day_future = now + timezone.timedelta(days=1)
            pending_publications = {
                'pages': Page.admin.filter(status='published', published_at__gt=now, published_at__lt=one_day_future).count(),
                'courses': Course.admin.filter(status='published', published_at__gt=now, published_at__lt=one_day_future).count(),
                'blog_posts': BlogPost.admin.filter(status='published', published_at__gt=now, published_at__lt=one_day_future).count(),
                'news_items': NewsItem.admin.filter(status='published', published_at__gt=now, published_at__lt=one_day_future).count(),
                'projects': Project.admin.filter(status='published', published_at__gt=now, published_at__lt=one_day_future).count(),
            }
            
            # Get recently published content (in the last day)
            one_day_ago = now - timezone.timedelta(days=1)
            recent_publications = {
                'pages': Page.admin.filter(status='published', published_at__range=(one_day_ago, now)).count(),
                'courses': Course.admin.filter(status='published', published_at__range=(one_day_ago, now)).count(),
                'blog_posts': BlogPost.admin.filter(status='published', published_at__range=(one_day_ago, now)).count(),
                'news_items': NewsItem.admin.filter(status='published', published_at__range=(one_day_ago, now)).count(),
                'projects': Project.admin.filter(status='published', published_at__range=(one_day_ago, now)).count(),
            }
            
            # Get content with missing SEO fields
            missing_seo = {
                'pages': Page.admin.filter(meta_description='').count(),
                'courses': Course.admin.filter(meta_description='').count(),
                'blog_posts': BlogPost.admin.filter(meta_description='').count(),
                'news_items': NewsItem.admin.filter(meta_description='').count(),
                'projects': Project.admin.filter(meta_description='').count(),
            }
            
            # Get total published content count
            content_status_summary = {
                'pages': {
                    'published': Page.published.count(),
                    'draft': Page.admin.filter(status='draft').count(),
                    'archived': Page.admin.filter(status='archived').count(),
                },
                'courses': {
                    'published': Course.published.count(),
                    'draft': Course.admin.filter(status='draft').count(),
                    'archived': Course.admin.filter(status='archived').count(),
                },
                'blog_posts': {
                    'published': BlogPost.published.count(),
                    'draft': BlogPost.admin.filter(status='draft').count(),
                    'archived': BlogPost.admin.filter(status='archived').count(),
                },
                'news_items': {
                    'published': NewsItem.published.count(),
                    'draft': NewsItem.admin.filter(status='draft').count(),
                    'archived': NewsItem.admin.filter(status='archived').count(),
                },
                'projects': {
                    'published': Project.published.count(),
                    'draft': Project.admin.filter(status='draft').count(),
                    'archived': Project.admin.filter(status='archived').count(),
                },
            }
            
            # Get last sync time and recent errors (simplified implementation)
            # In a production environment, this would be more sophisticated
            last_sync = timezone.now()
            sync_errors = []
            
            return Response({
                'last_sync': last_sync,
                'pending_publications': pending_publications,
                'recent_publications': recent_publications,
                'missing_seo': missing_seo,
                'sync_errors': sync_errors,
                'content_status_summary': content_status_summary,
                'timestamp': timezone.now().isoformat(),
            })
            
        except Exception as e:
            sync_logger.error(f"Error in content sync dashboard: {str(e)}")
            return Response(
                {"error": f"Error generating dashboard data: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
