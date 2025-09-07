"""
News serializers for the LMS backend.
"""

from rest_framework import serializers
from .models import NewsItem, NewsCategory
from lms_backend.core.seo import generate_news_schema


class NewsCategorySerializer(serializers.ModelSerializer):
    """Serializer for news categories."""
    
    class Meta:
        model = NewsCategory
        fields = ['id', 'name', 'slug']


class NewsItemListSerializer(serializers.ModelSerializer):
    """
    Serializer for news item listings - optimized for frontend consumption.
    """
    category = NewsCategorySerializer(read_only=True)
    absolute_url = serializers.SerializerMethodField()
    publish_date = serializers.SerializerMethodField()
    excerpt = serializers.SerializerMethodField()
    priority_display = serializers.CharField(source='get_priority_display', read_only=True)
    
    class Meta:
        model = NewsItem
        fields = [
            'id', 'title', 'slug', 'excerpt', 'category', 'priority', 
            'priority_display', 'featured', 'published_at', 'publish_date', 
            'status', 'absolute_url', 'source_name', 'source_url',
            'meta_title', 'meta_description'
        ]
        
    def get_absolute_url(self, obj):
        """Get frontend URL for this news item."""
        return f"/news/{obj.slug}/"
        
    def get_publish_date(self, obj):
        """Get formatted publish date."""
        if obj.published_at:
            return obj.published_at.strftime('%Y-%m-%d')
        return None
        
    def get_excerpt(self, obj):
        """Get news excerpt."""
        return obj.get_excerpt()


class NewsItemDetailSerializer(NewsItemListSerializer):
    """
    Detailed serializer for individual news items.
    """
    body = serializers.CharField()
    structured_data = serializers.SerializerMethodField()
    seo_analysis = serializers.SerializerMethodField()
    related_news = serializers.SerializerMethodField()
    
    class Meta(NewsItemListSerializer.Meta):
        fields = NewsItemListSerializer.Meta.fields + [
            'body', 'structured_data', 'seo_analysis', 'related_news',
            'focus_keyword', 'secondary_keywords', 'readability_score', 
            'seo_score', 'social_media_title', 'social_media_description',
            'twitter_card_type'
        ]
        
    def get_structured_data(self, obj):
        """Generate structured data for SEO."""
        return generate_news_schema(obj)
        
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
        
    def get_related_news(self, obj):
        """Get related news items based on category."""
        related = NewsItem.published.filter(
            category=obj.category
        ).exclude(id=obj.id)[:3]
        
        return NewsItemListSerializer(
            related, 
            many=True, 
            context=self.context
        ).data


class NewsItemCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating and updating news items.
    """
    category = serializers.PrimaryKeyRelatedField(
        queryset=NewsCategory.objects.all()
    )
    
    class Meta:
        model = NewsItem
        fields = [
            'title', 'slug', 'body', 'category', 'priority', 'featured',
            'source_url', 'source_name', 'status', 'meta_title', 
            'meta_description', 'focus_keyword', 'secondary_keywords', 
            'social_media_title', 'social_media_description', 
            'twitter_card_type', 'og_image'
        ]


class NewsItemAdminSerializer(NewsItemDetailSerializer):
    """
    Admin serializer with additional fields for backend management.
    """
    last_modified = serializers.DateTimeField(source='updated_at', read_only=True)
    
    class Meta(NewsItemDetailSerializer.Meta):
        fields = NewsItemDetailSerializer.Meta.fields + [
            'last_modified', 'created_at', 'deleted_at'
        ]
