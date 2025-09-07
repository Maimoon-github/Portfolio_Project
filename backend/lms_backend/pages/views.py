"""
Page views for the LMS backend.
"""

from django.db import models
from django.utils import timezone
from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as django_filters

from .models import Page
from .serializers import PageListSerializer, PageDetailSerializer, PageAdminSerializer
from lms_backend.core.viewsets import PublishedContentMixin, AdminContentMixin


class PageFilter(django_filters.FilterSet):
    """Custom filter for pages."""
    
    template = django_filters.ChoiceFilter(choices=Page.TEMPLATE_CHOICES)
    parent = django_filters.ModelChoiceFilter(queryset=Page.objects.all())
    show_in_menu = django_filters.BooleanFilter()
    is_homepage = django_filters.BooleanFilter()
    level = django_filters.NumberFilter()
    
    class Meta:
        model = Page
        fields = ['template', 'parent', 'show_in_menu', 'is_homepage', 'status']


class PageViewSet(PublishedContentMixin, viewsets.ModelViewSet):
    """
    ViewSet for pages - public API for frontend consumption.
    """
    serializer_class = PageListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = PageFilter
    search_fields = ['title', 'content']
    ordering_fields = ['page_order', 'title', 'published_at']
    ordering = ['page_order', 'title']
    lookup_field = 'slug'
    
    def get_queryset(self):
        """Return published pages with tree structure."""
        return Page.published.all()
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action == 'retrieve':
            return PageDetailSerializer
        return PageListSerializer
    
    def get_permissions(self):
        """Set permissions based on action."""
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAuthenticated, IsAdminUser]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]
    
    @action(detail=False, methods=['get'])
    def navigation(self, request):
        """Get navigation structure for the frontend."""
        # Get root pages that should show in menu
        root_pages = self.get_queryset().filter(
            parent__isnull=True,
            show_in_menu=True
        ).order_by('page_order')
        
        def build_nav_tree(pages):
            nav_data = []
            for page in pages:
                children = page.get_children().filter(
                    status='published',
                    show_in_menu=True
                ).order_by('page_order')
                
                page_data = {
                    'id': page.id,
                    'title': page.menu_title or page.title,
                    'slug': page.slug,
                    'url': page.get_absolute_url(),
                    'is_homepage': page.is_homepage,
                    'children': build_nav_tree(children) if children.exists() else []
                }
                nav_data.append(page_data)
            return nav_data
        
        navigation = build_nav_tree(root_pages)
        return Response(navigation)
    
    @action(detail=False, methods=['get'])
    def homepage(self, request):
        """Get the homepage."""
        try:
            homepage = self.get_queryset().get(is_homepage=True)
            serializer = PageDetailSerializer(homepage, context={'request': request})
            return Response(serializer.data)
        except Page.DoesNotExist:
            return Response(
                {'error': 'No homepage found'},
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=False, methods=['get'])
    def sitemap(self, request):
        """Get sitemap data for all published pages."""
        pages = self.get_queryset().order_by('page_order')
        sitemap_data = []
        
        for page in pages:
            sitemap_data.append({
                'title': page.title,
                'url': page.get_absolute_url(),
                'lastmod': page.updated_at.isoformat(),
                'priority': 1.0 if page.is_homepage else 0.8,
                'changefreq': 'weekly'
            })
        
        return Response(sitemap_data)
    
    @action(detail=True, methods=['get'])
    def seo_preview(self, request, slug=None):
        """Get SEO preview data for social media sharing."""
        page = self.get_object()
        
        preview_data = {
            'title': page.social_media_title or page.meta_title or page.title,
            'description': page.social_media_description or page.meta_description,
            'image': request.build_absolute_uri(page.og_image.url) if page.og_image else None,
            'url': request.build_absolute_uri(page.get_absolute_url()),
            'type': 'website',
            'twitter_card': page.twitter_card_type,
        }
        
        return Response(preview_data)


class AdminPageViewSet(AdminContentMixin, viewsets.ModelViewSet):
    """
    Admin ViewSet for pages - backend management.
    """
    serializer_class = PageAdminSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = PageFilter
    search_fields = ['title', 'content', 'meta_title', 'meta_description']
    ordering_fields = ['created_at', 'updated_at', 'page_order', 'title']
    ordering = ['page_order', 'title']
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def get_queryset(self):
        """Return all pages for admin."""
        return Page.admin.all()
    
    @action(detail=False, methods=['get'])
    def tree(self, request):
        """Get the complete page tree structure for admin interface."""
        def build_tree(pages):
            tree_data = []
            for page in pages:
                children = page.get_children()
                page_data = {
                    'id': page.id,
                    'title': page.title,
                    'slug': page.slug,
                    'status': page.status,
                    'level': page.level,
                    'page_order': page.page_order,
                    'is_homepage': page.is_homepage,
                    'show_in_menu': page.show_in_menu,
                    'template': page.template,
                    'children': build_tree(children) if children.exists() else []
                }
                tree_data.append(page_data)
            return tree_data
        
        root_pages = self.get_queryset().filter(parent__isnull=True).order_by('page_order')
        tree = build_tree(root_pages)
        return Response(tree)
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get page statistics for admin dashboard."""
        total_pages = Page.admin.count()
        published_pages = Page.published.count()
        draft_pages = Page.admin.filter(status='draft').count()
        homepage_exists = Page.admin.filter(is_homepage=True).exists()
        
        # Pages by template
        pages_by_template = {}
        for choice in Page.TEMPLATE_CHOICES:
            template_key = choice[0]
            template_name = choice[1]
            count = Page.published.filter(template=template_key).count()
            pages_by_template[template_key] = {
                'name': template_name,
                'count': count
            }
        
        # Pages modified this month
        now = timezone.now()
        start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        pages_modified_this_month = Page.admin.filter(
            updated_at__gte=start_of_month
        ).count()
        
        return Response({
            'total_pages': total_pages,
            'published_pages': published_pages,
            'draft_pages': draft_pages,
            'homepage_exists': homepage_exists,
            'pages_by_template': pages_by_template,
            'pages_modified_this_month': pages_modified_this_month,
        })
    
    @action(detail=True, methods=['post'])
    def publish(self, request, pk=None):
        """Publish a draft page."""
        page = self.get_object()
        
        if page.status == 'published':
            return Response(
                {'error': 'Page is already published'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        page.status = 'published'
        page.published_at = timezone.now()
        page.save()
        
        return Response({
            'message': 'Page published successfully',
            'published_at': page.published_at
        })
    
    @action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        """Archive a page."""
        page = self.get_object()
        page.status = 'archived'
        page.save()
        
        return Response({'message': 'Page archived successfully'})
    
    @action(detail=True, methods=['post'])
    def set_homepage(self, request, pk=None):
        """Set this page as the homepage."""
        page = self.get_object()
        
        # Remove homepage status from current homepage
        Page.objects.filter(is_homepage=True).update(is_homepage=False)
        
        # Set this page as homepage
        page.is_homepage = True
        page.save()
        
        return Response({'message': f'"{page.title}" is now the homepage'})
    
    @action(detail=True, methods=['post'])
    def move(self, request, pk=None):
        """Move page to a new position in the tree."""
        page = self.get_object()
        target_id = request.data.get('target_id')
        position = request.data.get('position', 'last-child')  # 'left', 'right', 'first-child', 'last-child'
        
        if target_id:
            try:
                target = Page.objects.get(id=target_id)
                page.move_to(target, position)
                return Response({'message': 'Page moved successfully'})
            except Page.DoesNotExist:
                return Response(
                    {'error': 'Target page not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        else:
            return Response(
                {'error': 'Target ID is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
