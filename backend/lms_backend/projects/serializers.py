"""
Project serializers for the LMS backend.
"""

from rest_framework import serializers
from .models import Project, Technology
from lms_backend.core.seo import generate_project_schema


class TechnologySerializer(serializers.ModelSerializer):
    """Serializer for technologies."""
    
    class Meta:
        model = Technology
        fields = ['id', 'name', 'slug', 'icon']


class ProjectListSerializer(serializers.ModelSerializer):
    """
    Serializer for project listings - optimized for frontend consumption.
    """
    tech_stack = TechnologySerializer(many=True, read_only=True)
    thumbnail_url = serializers.SerializerMethodField()
    absolute_url = serializers.SerializerMethodField()
    completion_date_formatted = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'summary', 'tech_stack', 'thumbnail_url',
            'github_url', 'live_url', 'demo_video', 'project_type', 
            'completion_date', 'completion_date_formatted', 'featured', 
            'difficulty', 'published_at', 'status', 'absolute_url',
            'meta_title', 'meta_description'
        ]
        
    def get_thumbnail_url(self, obj):
        """Get full URL for project thumbnail."""
        if obj.thumbnail:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.thumbnail.url)
            return obj.thumbnail.url
        return None
        
    def get_absolute_url(self, obj):
        """Get frontend URL for this project."""
        return f"/projects/{obj.slug}/"
        
    def get_completion_date_formatted(self, obj):
        """Get formatted completion date."""
        if obj.completion_date:
            return obj.completion_date.strftime('%Y-%m-%d')
        return None


class ProjectDetailSerializer(ProjectListSerializer):
    """
    Detailed serializer for individual projects.
    """
    description = serializers.CharField()
    structured_data = serializers.SerializerMethodField()
    seo_analysis = serializers.SerializerMethodField()
    related_projects = serializers.SerializerMethodField()
    
    class Meta(ProjectListSerializer.Meta):
        fields = ProjectListSerializer.Meta.fields + [
            'description', 'structured_data', 'seo_analysis', 'related_projects',
            'focus_keyword', 'secondary_keywords', 'readability_score', 
            'seo_score', 'social_media_title', 'social_media_description',
            'twitter_card_type'
        ]
        
    def get_structured_data(self, obj):
        """Generate structured data for SEO."""
        return generate_project_schema(obj)
        
    def get_seo_analysis(self, obj):
        """Get SEO analysis data."""
        return {
            'readability_score': obj.readability_score,
            'seo_score': obj.seo_score,
            'focus_keyword': obj.focus_keyword,
            'secondary_keywords': obj.secondary_keywords.split(',') if obj.secondary_keywords else [],
            'meta_title_length': len(obj.meta_title) if obj.meta_title else 0,
            'meta_description_length': len(obj.meta_description) if obj.meta_description else 0,
        }
        
    def get_related_projects(self, obj):
        """Get related projects based on tech stack and type."""
        # Get projects with same tech stack or type
        from django.db import models
        related = Project.published.filter(
            models.Q(tech_stack__in=obj.tech_stack.all()) |
            models.Q(project_type=obj.project_type)
        ).exclude(id=obj.id).distinct()[:3]
        
        return ProjectListSerializer(
            related, 
            many=True, 
            context=self.context
        ).data


class ProjectCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating and updating projects.
    """
    tech_stack = serializers.PrimaryKeyRelatedField(
        queryset=Technology.objects.all(),
        many=True,
        required=False
    )
    
    class Meta:
        model = Project
        fields = [
            'title', 'slug', 'summary', 'description', 'thumbnail',
            'tech_stack', 'github_url', 'live_url', 'demo_video',
            'project_type', 'completion_date', 'featured', 'difficulty', 
            'status', 'meta_title', 'meta_description', 'focus_keyword', 
            'secondary_keywords', 'social_media_title', 
            'social_media_description', 'twitter_card_type', 'og_image'
        ]
        
    def create(self, validated_data):
        """Create project."""
        tech_stack = validated_data.pop('tech_stack', [])
        project = Project.objects.create(**validated_data)
        project.tech_stack.set(tech_stack)
        return project
        
    def update(self, instance, validated_data):
        """Update project."""
        tech_stack = validated_data.pop('tech_stack', None)
        
        # Update fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update tech stack
        if tech_stack is not None:
            instance.tech_stack.set(tech_stack)
            
        return instance


class ProjectAdminSerializer(ProjectDetailSerializer):
    """
    Admin serializer with additional fields for backend management.
    """
    last_modified = serializers.DateTimeField(source='updated_at', read_only=True)
    
    class Meta(ProjectDetailSerializer.Meta):
        fields = ProjectDetailSerializer.Meta.fields + [
            'last_modified', 'created_at', 'deleted_at'
        ]
