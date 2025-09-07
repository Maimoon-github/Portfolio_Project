"""
Serializers for page models.
"""

from rest_framework import serializers
from .models import Page


class PageListSerializer(serializers.ModelSerializer):
    """Serializer for page list endpoints."""
    
    parent_id = serializers.PrimaryKeyRelatedField(
        source='parent', 
        read_only=True
    )
    level = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Page
        fields = [
            'id', 'title', 'slug', 'parent_id', 'level',
            'page_order', 'is_homepage', 'show_in_menu',
            'menu_title', 'template', 'published_at',
        ]


class PageDetailSerializer(serializers.ModelSerializer):
    """Serializer for page detail endpoint."""
    
    breadcrumbs = serializers.SerializerMethodField()
    children = serializers.SerializerMethodField()
    
    class Meta:
        model = Page
        fields = [
            'id', 'title', 'slug', 'content', 'template',
            'meta_title', 'meta_description', 'og_image',
            'focus_keyword', 'breadcrumbs', 'children',
            'is_homepage', 'published_at', 'custom_css',
            'custom_js',
        ]
    
    def get_breadcrumbs(self, obj):
        """Get breadcrumb navigation data."""
        ancestors = obj.get_ancestors(include_self=True)
        return [
            {
                'id': ancestor.id,
                'title': ancestor.title,
                'slug': ancestor.slug,
                'url': ancestor.get_absolute_url(),
            }
            for ancestor in ancestors
        ]
    
    def get_children(self, obj):
        """Get direct child pages."""
        children = obj.get_children().filter(status='published')
        return [
            {
                'id': child.id,
                'title': child.title,
                'slug': child.slug,
                'url': child.get_absolute_url(),
            }
            for child in children
        ]


class PageAdminSerializer(serializers.ModelSerializer):
    """Serializer for page admin endpoints."""
    
    parent = serializers.PrimaryKeyRelatedField(
        queryset=Page.objects.all(),
        required=False,
        allow_null=True
    )
    
    class Meta:
        model = Page
        fields = [
            'id', 'title', 'slug', 'content', 'status',
            'parent', 'page_order', 'template', 'is_homepage',
            'show_in_menu', 'menu_title', 'meta_title',
            'meta_description', 'og_image', 'focus_keyword',
            'secondary_keywords', 'published_at', 'custom_css',
            'custom_js', 'seo_score',
        ]
        read_only_fields = ['seo_score']
