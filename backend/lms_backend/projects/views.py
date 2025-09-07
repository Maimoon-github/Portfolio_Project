"""
Project views for the LMS backend.
"""

from django.db import models
from django.utils import timezone
from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as django_filters

from .models import Project, Technology
from .serializers import (
    ProjectListSerializer, ProjectDetailSerializer,
    ProjectCreateUpdateSerializer, ProjectAdminSerializer,
    TechnologySerializer
)
from lms_backend.core.viewsets import PublishedContentMixin, AdminContentMixin


class ProjectFilter(django_filters.FilterSet):
    """Custom filter for projects."""
    
    tech_stack = django_filters.ModelMultipleChoiceFilter(
        queryset=Technology.objects.all(),
        to_field_name='slug'
    )
    project_type = django_filters.ChoiceFilter(choices=Project.PROJECT_TYPE_CHOICES)
    difficulty = django_filters.ChoiceFilter(choices=Project.DIFFICULTY_CHOICES)
    featured = django_filters.BooleanFilter()
    completion_year = django_filters.NumberFilter(field_name='completion_date__year')
    
    class Meta:
        model = Project
        fields = ['tech_stack', 'project_type', 'difficulty', 'featured', 'status']


class ProjectViewSet(PublishedContentMixin, viewsets.ModelViewSet):
    """
    ViewSet for projects - public API for frontend consumption.
    """
    serializer_class = ProjectListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProjectFilter
    search_fields = ['title', 'summary', 'description']
    ordering_fields = ['completion_date', 'title', 'created_at']
    ordering = ['-featured', '-completion_date']
    lookup_field = 'slug'
    
    def get_queryset(self):
        """Return published projects with related data."""
        return Project.published.prefetch_related('tech_stack')
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return ProjectCreateUpdateSerializer
        return ProjectListSerializer
    
    def get_permissions(self):
        """Set permissions based on action."""
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured projects."""
        featured_projects = self.get_queryset().filter(featured=True)[:6]
        serializer = self.get_serializer(featured_projects, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Get most recent projects."""
        recent_projects = self.get_queryset()[:10]
        serializer = self.get_serializer(recent_projects, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_type(self, request):
        """Get projects grouped by type."""
        project_types = {}
        for choice in Project.PROJECT_TYPE_CHOICES:
            type_key = choice[0]
            type_name = choice[1]
            projects = self.get_queryset().filter(project_type=type_key)[:5]
            project_types[type_key] = {
                'name': type_name,
                'projects': self.get_serializer(projects, many=True).data
            }
        return Response(project_types)
    
    @action(detail=False, methods=['get'])
    def technologies(self, request):
        """Get all technologies used in published projects."""
        technologies = Technology.objects.filter(
            project__status='published'
        ).distinct().order_by('name')
        
        serializer = TechnologySerializer(technologies, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def toggle_featured(self, request, slug=None):
        """Toggle featured status of project."""
        project = self.get_object()
        project.featured = not project.featured
        project.save()
        
        return Response({
            'featured': project.featured,
            'message': f'Project {"featured" if project.featured else "unfeatured"} successfully'
        })
    
    @action(detail=True, methods=['get'])
    def seo_preview(self, request, slug=None):
        """Get SEO preview data for social media sharing."""
        project = self.get_object()
        
        preview_data = {
            'title': project.social_media_title or project.meta_title or project.title,
            'description': project.social_media_description or project.meta_description or project.summary,
            'image': request.build_absolute_uri(project.og_image.url) if project.og_image else None,
            'url': request.build_absolute_uri(f'/projects/{project.slug}/'),
            'type': 'website',
            'twitter_card': project.twitter_card_type,
        }
        
        return Response(preview_data)


class AdminProjectViewSet(AdminContentMixin, viewsets.ModelViewSet):
    """
    Admin ViewSet for projects - backend management.
    """
    serializer_class = ProjectAdminSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProjectFilter
    search_fields = ['title', 'summary', 'description']
    ordering_fields = ['created_at', 'updated_at', 'completion_date', 'title']
    ordering = ['-created_at']
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def get_queryset(self):
        """Return all projects for admin."""
        return Project.admin.prefetch_related('tech_stack')
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action in ['create', 'update', 'partial_update']:
            return ProjectCreateUpdateSerializer
        return ProjectAdminSerializer
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get project statistics for admin dashboard."""
        total_projects = Project.admin.count()
        published_projects = Project.published.count()
        draft_projects = Project.admin.filter(status='draft').count()
        featured_projects = Project.published.filter(featured=True).count()
        
        # Projects by type
        projects_by_type = {}
        for choice in Project.PROJECT_TYPE_CHOICES:
            type_key = choice[0]
            type_name = choice[1]
            count = Project.published.filter(project_type=type_key).count()
            projects_by_type[type_key] = {
                'name': type_name,
                'count': count
            }
        
        # Projects completed this year
        current_year = timezone.now().year
        projects_this_year = Project.published.filter(
            completion_date__year=current_year
        ).count()
        
        return Response({
            'total_projects': total_projects,
            'published_projects': published_projects,
            'draft_projects': draft_projects,
            'featured_projects': featured_projects,
            'projects_by_type': projects_by_type,
            'projects_this_year': projects_this_year,
        })
    
    @action(detail=True, methods=['post'])
    def publish(self, request, pk=None):
        """Publish a draft project."""
        project = self.get_object()
        
        if project.status == 'published':
            return Response(
                {'error': 'Project is already published'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        project.status = 'published'
        project.published_at = timezone.now()
        project.save()
        
        return Response({
            'message': 'Project published successfully',
            'published_at': project.published_at
        })
    
    @action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        """Archive a project."""
        project = self.get_object()
        project.status = 'archived'
        project.save()
        
        return Response({'message': 'Project archived successfully'})
    
    @action(detail=True, methods=['post'])
    def soft_delete(self, request, pk=None):
        """Soft delete a project."""
        project = self.get_object()
        project.soft_delete()
        
        return Response({'message': 'Project deleted successfully'})
    
    @action(detail=True, methods=['post'])
    def restore(self, request, pk=None):
        """Restore a soft-deleted project."""
        project = self.get_object()
        project.restore()
        
        return Response({'message': 'Project restored successfully'})


class TechnologyViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing technologies.
    """
    queryset = Technology.objects.all()
    serializer_class = TechnologySerializer
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
