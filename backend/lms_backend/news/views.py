"""
News views for the LMS backend.
"""

from django.db import models
from django.utils import timezone
from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as django_filters

from .models import NewsItem, NewsCategory
from .serializers import (
    NewsItemListSerializer, NewsItemDetailSerializer,
    NewsItemCreateUpdateSerializer, NewsItemAdminSerializer,
    NewsCategorySerializer
)
from lms_backend.core.viewsets import PublishedContentMixin, AdminContentMixin


class NewsItemFilter(django_filters.FilterSet):
    """Custom filter for news items."""
    
    category = django_filters.ModelChoiceFilter(
        queryset=NewsCategory.objects.all(),
        to_field_name='slug'
    )
    priority = django_filters.ChoiceFilter(choices=NewsItem.PRIORITY_CHOICES)
    featured = django_filters.BooleanFilter()
    published_after = django_filters.DateTimeFilter(field_name='published_at', lookup_expr='gte')
    published_before = django_filters.DateTimeFilter(field_name='published_at', lookup_expr='lte')
    
    class Meta:
        model = NewsItem
        fields = ['category', 'priority', 'featured', 'status']


class NewsItemViewSet(PublishedContentMixin, viewsets.ModelViewSet):
    """
    ViewSet for news items - public API for frontend consumption.
    """
    serializer_class = NewsItemListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = NewsItemFilter
    search_fields = ['title', 'body']
    ordering_fields = ['published_at', 'priority', 'title']
    ordering = ['-priority', '-published_at']
    lookup_field = 'slug'
    
    def get_queryset(self):
        """Return published news items with related data."""
        return NewsItem.published.select_related('category')
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action == 'retrieve':
            return NewsItemDetailSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return NewsItemCreateUpdateSerializer
        return NewsItemListSerializer
    
    def get_permissions(self):
        """Set permissions based on action."""
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured news items."""
        featured_news = self.get_queryset().filter(featured=True)[:5]
        serializer = self.get_serializer(featured_news, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def urgent(self, request):
        """Get urgent news items."""
        urgent_news = self.get_queryset().filter(priority='urgent')[:3]
        serializer = self.get_serializer(urgent_news, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Get most recent news items."""
        recent_news = self.get_queryset()[:10]
        serializer = self.get_serializer(recent_news, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """Get all categories used by published news items."""
        categories = NewsCategory.objects.filter(
            newsitem__status='published'
        ).distinct().order_by('name')
        
        serializer = NewsCategorySerializer(categories, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_priority(self, request):
        """Get news items grouped by priority."""
        news_by_priority = {}
        for choice in NewsItem.PRIORITY_CHOICES:
            priority_key = choice[0]
            priority_name = choice[1]
            news_items = self.get_queryset().filter(priority=priority_key)[:5]
            news_by_priority[priority_key] = {
                'name': priority_name,
                'items': self.get_serializer(news_items, many=True).data
            }
        return Response(news_by_priority)
    
    @action(detail=True, methods=['post'])
    def toggle_featured(self, request, slug=None):
        """Toggle featured status of news item."""
        news_item = self.get_object()
        news_item.featured = not news_item.featured
        news_item.save()
        
        return Response({
            'featured': news_item.featured,
            'message': f'News item {"featured" if news_item.featured else "unfeatured"} successfully'
        })
    
    @action(detail=True, methods=['get'])
    def seo_preview(self, request, slug=None):
        """Get SEO preview data for social media sharing."""
        news_item = self.get_object()
        
        preview_data = {
            'title': news_item.social_media_title or news_item.meta_title or news_item.title,
            'description': news_item.social_media_description or news_item.meta_description or news_item.get_excerpt(),
            'image': request.build_absolute_uri(news_item.og_image.url) if news_item.og_image else None,
            'url': request.build_absolute_uri(f'/news/{news_item.slug}/'),
            'type': 'article',
            'twitter_card': news_item.twitter_card_type,
        }
        
        return Response(preview_data)


class AdminNewsItemViewSet(AdminContentMixin, viewsets.ModelViewSet):
    """
    Admin ViewSet for news items - backend management.
    """
    serializer_class = NewsItemAdminSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = NewsItemFilter
    search_fields = ['title', 'body']
    ordering_fields = ['created_at', 'updated_at', 'published_at', 'priority', 'title']
    ordering = ['-created_at']
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def get_queryset(self):
        """Return all news items for admin."""
        return NewsItem.admin.select_related('category')
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action in ['create', 'update', 'partial_update']:
            return NewsItemCreateUpdateSerializer
        return NewsItemAdminSerializer
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get news statistics for admin dashboard."""
        total_news = NewsItem.admin.count()
        published_news = NewsItem.published.count()
        draft_news = NewsItem.admin.filter(status='draft').count()
        featured_news = NewsItem.published.filter(featured=True).count()
        urgent_news = NewsItem.published.filter(priority='urgent').count()
        
        # News by priority
        news_by_priority = {}
        for choice in NewsItem.PRIORITY_CHOICES:
            priority_key = choice[0]
            priority_name = choice[1]
            count = NewsItem.published.filter(priority=priority_key).count()
            news_by_priority[priority_key] = {
                'name': priority_name,
                'count': count
            }
        
        # News published this month
        now = timezone.now()
        start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        news_this_month = NewsItem.published.filter(
            published_at__gte=start_of_month
        ).count()
        
        return Response({
            'total_news': total_news,
            'published_news': published_news,
            'draft_news': draft_news,
            'featured_news': featured_news,
            'urgent_news': urgent_news,
            'news_by_priority': news_by_priority,
            'news_this_month': news_this_month,
        })
    
    @action(detail=True, methods=['post'])
    def publish(self, request, pk=None):
        """Publish a draft news item."""
        news_item = self.get_object()
        
        if news_item.status == 'published':
            return Response(
                {'error': 'News item is already published'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        news_item.status = 'published'
        news_item.published_at = timezone.now()
        news_item.save()
        
        return Response({
            'message': 'News item published successfully',
            'published_at': news_item.published_at
        })
    
    @action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        """Archive a news item."""
        news_item = self.get_object()
        news_item.status = 'archived'
        news_item.save()
        
        return Response({'message': 'News item archived successfully'})


class NewsCategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing news categories.
    """
    queryset = NewsCategory.objects.all()
    serializer_class = NewsCategorySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering = ['name']
    lookup_field = 'slug'
    
    def get_permissions(self):
        """Set permissions based on action."""
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAuthenticated, IsAdminUser]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]
