"""
API views for page management.
"""

from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from lms_backend.core.viewsets import PublishedContentViewSet, AdminContentViewSet
from .models import Page
from .serializers import PageListSerializer, PageDetailSerializer, PageAdminSerializer


class PageViewSet(PublishedContentViewSet):
    """
    API endpoint for public pages.
    """
    serializer_class = PageListSerializer
    filterset_fields = ['template', 'parent', 'show_in_menu']
    search_fields = ['title', 'content']
    ordering_fields = ['page_order', 'title', 'published_at']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PageDetailSerializer
        return PageListSerializer


class PageAdminViewSet(AdminContentViewSet):
    """
    API endpoint for page administration.
    """
    serializer_class = PageAdminSerializer
    filterset_fields = ['status', 'template', 'parent', 'show_in_menu']
    search_fields = ['title', 'content', 'meta_title', 'meta_description']
    ordering_fields = ['page_order', 'title', 'published_at', 'seo_score']
