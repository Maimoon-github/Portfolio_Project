"""
Blog serializers for the LMS backend.
"""

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import BlogPost
from lms_backend.courses.models import Category, Tag
from lms_backend.core.seo import generate_blog_schema

User = get_user_model()


class AuthorMinimalSerializer(serializers.ModelSerializer):
    """Minimal serializer for blog post authors."""
    
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email']
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Create display name
        if instance.first_name and instance.last_name:
            data['name'] = f"{instance.first_name} {instance.last_name}"
        else:
            data['name'] = instance.email.split('@')[0].title()
        return data


class CategoryMinimalSerializer(serializers.ModelSerializer):
    """Minimal serializer for blog categories."""
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class TagMinimalSerializer(serializers.ModelSerializer):
    """Minimal serializer for blog tags."""
    
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']


class BlogPostListSerializer(serializers.ModelSerializer):
    """
    Serializer for blog post listings - optimized for frontend consumption.
    """
    author = AuthorMinimalSerializer(read_only=True)
    categories = CategoryMinimalSerializer(many=True, read_only=True)
    tags = TagMinimalSerializer(many=True, read_only=True)
    cover_image_url = serializers.SerializerMethodField()
    absolute_url = serializers.SerializerMethodField()
    publish_date = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'author', 'categories', 'tags',
            'cover_image_url', 'reading_time_minutes', 'featured', 
            'published_at', 'publish_date', 'status', 'absolute_url',
            'meta_title', 'meta_description'
        ]
        
    def get_cover_image_url(self, obj):
        """Get full URL for cover image."""
        if obj.cover_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.cover_image.url)
            return obj.cover_image.url
        return None
        
    def get_absolute_url(self, obj):
        """Get frontend URL for this blog post."""
        return f"/blog/{obj.slug}/"
        
    def get_publish_date(self, obj):
        """Get formatted publish date."""
        if obj.published_at:
            return obj.published_at.strftime('%Y-%m-%d')
        return None


class BlogPostDetailSerializer(BlogPostListSerializer):
    """
    Detailed serializer for individual blog posts.
    """
    content = serializers.CharField()
    structured_data = serializers.SerializerMethodField()
    seo_analysis = serializers.SerializerMethodField()
    related_posts = serializers.SerializerMethodField()
    
    class Meta(BlogPostListSerializer.Meta):
        fields = BlogPostListSerializer.Meta.fields + [
            'content', 'structured_data', 'seo_analysis', 'related_posts',
            'focus_keyword', 'secondary_keywords', 'readability_score', 
            'seo_score', 'social_media_title', 'social_media_description',
            'twitter_card_type', 'allow_comments'
        ]
        
    def get_structured_data(self, obj):
        """Generate structured data for SEO."""
        return generate_blog_schema(obj)
        
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
        
    def get_related_posts(self, obj):
        """Get related blog posts based on categories and tags."""
        # Get posts with same categories or tags
        from django.db import models
        related = BlogPost.published.filter(
            models.Q(categories__in=obj.categories.all()) |
            models.Q(tags__in=obj.tags.all())
        ).exclude(id=obj.id).distinct()[:3]
        
        return BlogPostListSerializer(
            related, 
            many=True, 
            context=self.context
        ).data


class BlogPostCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating and updating blog posts.
    """
    categories = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        many=True,
        required=False
    )
    tags = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(),
        many=True,
        required=False
    )
    
    class Meta:
        model = BlogPost
        fields = [
            'title', 'slug', 'excerpt', 'content', 'cover_image',
            'categories', 'tags', 'featured', 'allow_comments', 'status',
            'meta_title', 'meta_description', 'focus_keyword', 
            'secondary_keywords', 'social_media_title', 
            'social_media_description', 'twitter_card_type', 'og_image'
        ]
        
    def create(self, validated_data):
        """Create blog post with author."""
        categories = validated_data.pop('categories', [])
        tags = validated_data.pop('tags', [])
        
        # Set author from request user
        validated_data['author'] = self.context['request'].user
        
        blog_post = BlogPost.objects.create(**validated_data)
        blog_post.categories.set(categories)
        blog_post.tags.set(tags)
        
        return blog_post
        
    def update(self, instance, validated_data):
        """Update blog post."""
        categories = validated_data.pop('categories', None)
        tags = validated_data.pop('tags', None)
        
        # Update fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update relationships
        if categories is not None:
            instance.categories.set(categories)
        if tags is not None:
            instance.tags.set(tags)
            
        return instance


class BlogPostAdminSerializer(BlogPostDetailSerializer):
    """
    Admin serializer with additional fields for backend management.
    """
    author = serializers.StringRelatedField(read_only=True)
    view_count = serializers.SerializerMethodField()
    last_modified = serializers.DateTimeField(source='updated_at', read_only=True)
    
    class Meta(BlogPostDetailSerializer.Meta):
        fields = BlogPostDetailSerializer.Meta.fields + [
            'view_count', 'last_modified', 'created_at', 'deleted_at'
        ]
        
    def get_view_count(self, obj):
        """Get view count from analytics (placeholder)."""
        # This would integrate with your analytics system
        return 0
