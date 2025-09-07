"""
Blog views for the LMS backend.
"""

from django.db import models
from django.utils import timezone
from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as django_filters

from .models import BlogPost
from .serializers import (
    BlogPostListSerializer, BlogPostDetailSerializer,
    BlogPostCreateUpdateSerializer, BlogPostAdminSerializer
)
from lms_backend.core.viewsets import PublishedContentMixin, AdminContentMixin
from lms_backend.courses.models import Category, Tag


class BlogPostFilter(django_filters.FilterSet):
    """Custom filter for blog posts."""
    
    category = django_filters.ModelChoiceFilter(
        field_name='categories',
        queryset=Category.objects.all(),
        to_field_name='slug'
    )
    tag = django_filters.ModelChoiceFilter(
        field_name='tags',
        queryset=Tag.objects.all(),
        to_field_name='slug'
    )
    author = django_filters.CharFilter(field_name='author__email', lookup_expr='iexact')
    featured = django_filters.BooleanFilter()
    published_after = django_filters.DateTimeFilter(field_name='published_at', lookup_expr='gte')
    published_before = django_filters.DateTimeFilter(field_name='published_at', lookup_expr='lte')
    
    class Meta:
        model = BlogPost
        fields = ['category', 'tag', 'author', 'featured', 'status']


class BlogPostViewSet(PublishedContentMixin, viewsets.ModelViewSet):
    """
    ViewSet for blog posts - public API for frontend consumption.
    """
    serializer_class = BlogPostListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = BlogPostFilter
    search_fields = ['title', 'excerpt', 'content']
    ordering_fields = ['published_at', 'title', 'reading_time_minutes']
    ordering = ['-published_at']
    lookup_field = 'slug'
    
    def get_queryset(self):
        """Return published blog posts with related data."""
        return BlogPost.published.select_related('author').prefetch_related(
            'categories', 'tags'
        )
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action == 'retrieve':
            return BlogPostDetailSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return BlogPostCreateUpdateSerializer
        return BlogPostListSerializer
    
    def get_permissions(self):
        """Set permissions based on action."""
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured blog posts."""
        featured_posts = self.get_queryset().filter(featured=True)[:6]
        serializer = self.get_serializer(featured_posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Get most recent blog posts."""
        recent_posts = self.get_queryset()[:10]
        serializer = self.get_serializer(recent_posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """Get all categories used by published blog posts."""
        categories = Category.objects.filter(
            blogpost__status='published'
        ).distinct().order_by('name')
        
        data = [{'id': cat.id, 'name': cat.name, 'slug': cat.slug} for cat in categories]
        return Response(data)
    
    @action(detail=False, methods=['get'])
    def tags(self, request):
        """Get all tags used by published blog posts."""
        tags = Tag.objects.filter(
            blogpost__status='published'
        ).distinct().order_by('name')
        
        data = [{'id': tag.id, 'name': tag.name, 'slug': tag.slug} for tag in tags]
        return Response(data)
    
    @action(detail=True, methods=['post'])
    def toggle_featured(self, request, slug=None):
        """Toggle featured status of blog post."""
        blog_post = self.get_object()
        blog_post.featured = not blog_post.featured
        blog_post.save()
        
        return Response({
            'featured': blog_post.featured,
            'message': f'Blog post {"featured" if blog_post.featured else "unfeatured"} successfully'
        })
    
    @action(detail=True, methods=['get'])
    def seo_preview(self, request, slug=None):
        """Get SEO preview data for social media sharing."""
        blog_post = self.get_object()
        
        preview_data = {
            'title': blog_post.social_media_title or blog_post.meta_title or blog_post.title,
            'description': blog_post.social_media_description or blog_post.meta_description or blog_post.excerpt,
            'image': request.build_absolute_uri(blog_post.og_image.url) if blog_post.og_image else None,
            'url': request.build_absolute_uri(f'/blog/{blog_post.slug}/'),
            'type': 'article',
            'twitter_card': blog_post.twitter_card_type,
        }
        
        return Response(preview_data)


class AdminBlogPostViewSet(AdminContentMixin, viewsets.ModelViewSet):
    """
    Admin ViewSet for blog posts - backend management.
    """
    serializer_class = BlogPostAdminSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = BlogPostFilter
    search_fields = ['title', 'excerpt', 'content', 'author__email']
    ordering_fields = ['created_at', 'updated_at', 'published_at', 'title']
    ordering = ['-created_at']
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def get_queryset(self):
        """Return all blog posts for admin."""
        return BlogPost.admin.select_related('author').prefetch_related(
            'categories', 'tags'
        )
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action in ['create', 'update', 'partial_update']:
            return BlogPostCreateUpdateSerializer
        return BlogPostAdminSerializer
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get blog statistics for admin dashboard."""
        total_posts = BlogPost.admin.count()
        published_posts = BlogPost.published.count()
        draft_posts = BlogPost.admin.filter(status='draft').count()
        featured_posts = BlogPost.published.filter(featured=True).count()
        
        # Posts published this month
        now = timezone.now()
        start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        posts_this_month = BlogPost.published.filter(
            published_at__gte=start_of_month
        ).count()
        
        return Response({
            'total_posts': total_posts,
            'published_posts': published_posts,
            'draft_posts': draft_posts,
            'featured_posts': featured_posts,
            'posts_this_month': posts_this_month,
        })
    
    @action(detail=True, methods=['post'])
    def publish(self, request, pk=None):
        """Publish a draft blog post."""
        blog_post = self.get_object()
        
        if blog_post.status == 'published':
            return Response(
                {'error': 'Blog post is already published'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        blog_post.status = 'published'
        blog_post.published_at = timezone.now()
        blog_post.save()
        
        return Response({
            'message': 'Blog post published successfully',
            'published_at': blog_post.published_at
        })
    
    @action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        """Archive a blog post."""
        blog_post = self.get_object()
        blog_post.status = 'archived'
        blog_post.save()
        
        return Response({'message': 'Blog post archived successfully'})
    
    @action(detail=True, methods=['post'])
    def soft_delete(self, request, pk=None):
        """Soft delete a blog post."""
        blog_post = self.get_object()
        blog_post.soft_delete()
        
        return Response({'message': 'Blog post deleted successfully'})
    
    @action(detail=True, methods=['post'])
    def restore(self, request, pk=None):
        """Restore a soft-deleted blog post."""
        blog_post = self.get_object()
        blog_post.restore()
        
        return Response({'message': 'Blog post restored successfully'})
    
    @action(detail=True, methods=['get'])
    def seo_analysis(self, request, pk=None):
        """Get detailed SEO analysis for a blog post."""
        blog_post = self.get_object()
        
        analysis = {
            'overall_score': blog_post.seo_score,
            'readability_score': blog_post.readability_score,
            'title_analysis': {
                'length': len(blog_post.title),
                'optimal_range': '50-60 characters',
                'is_optimal': 50 <= len(blog_post.title) <= 60
            },
            'meta_description_analysis': {
                'length': len(blog_post.meta_description) if blog_post.meta_description else 0,
                'optimal_range': '140-160 characters',
                'is_optimal': blog_post.meta_description and 140 <= len(blog_post.meta_description) <= 160
            },
            'keyword_analysis': {
                'focus_keyword': blog_post.focus_keyword,
                'keyword_in_title': blog_post.focus_keyword.lower() in blog_post.title.lower() if blog_post.focus_keyword else False,
                'keyword_in_content': blog_post.focus_keyword.lower() in blog_post.content.lower() if blog_post.focus_keyword else False,
                'secondary_keywords': blog_post.secondary_keywords.split(',') if blog_post.secondary_keywords else []
            },
            'content_analysis': {
                'word_count': len(blog_post.content.split()) if blog_post.content else 0,
                'reading_time': blog_post.reading_time_minutes,
                'has_cover_image': bool(blog_post.cover_image),
                'has_og_image': bool(blog_post.og_image)
            }
        }
        
        return Response(analysis)
