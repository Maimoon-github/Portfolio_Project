"""
Core API mixins and base viewset classes.
"""

from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
import logging

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
