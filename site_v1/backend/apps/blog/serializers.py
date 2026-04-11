from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Category, Tag, Post, PostImage
from drf_spectacular.utils import extend_schema_serializer, extend_schema_field


User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for the Category model (read‑only)."""

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']


class TagSerializer(serializers.ModelSerializer):
    """Serializer for the Tag model (read‑only)."""

    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']


class UserSerializer(serializers.ModelSerializer):
    """Minimal serializer for the User model (author)."""

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']


class PostImageSerializer(serializers.ModelSerializer):
    """Serializer for the PostImage model (gallery images)."""

    class Meta:
        model = PostImage
        fields = ['id', 'image', 'caption', 'alt_text', 'order']


# class PostListSerializer(serializers.ModelSerializer):
@extend_schema_serializer(component_name='PostList')
class PostListSerializer(serializers.ModelSerializer):
    """
    Lightweight serializer for list views (APIPostListView, APIRelatedPostsView).
    Includes nested author, category, tags, and a computed image count.
    """
    author = UserSerializer(read_only=True)
    # category = CategorySerializer(read_only=True)
    category = serializers.SerializerMethodField()

    @extend_schema_field(CategorySerializer)
    def get_category(self, obj):
        return CategorySerializer(obj.category).data
        
    tags = TagSerializer(many=True, read_only=True)
    image_count = serializers.IntegerField(
        source='images.count',
        read_only=True,
        help_text="Number of additional images in the gallery."
    )

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug', 'author', 'category', 'tags',
            'excerpt', 'featured_image', 'publish_date', 'featured',
            'read_time', 'view_count', 'image_count',
        ]


class PostDetailSerializer(serializers.ModelSerializer):
    """
    Detailed serializer for single post view (APIPostDetailView).
    Includes full content, all images, and SEO fields.
    """
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    images = PostImageSerializer(
        many=True,
        read_only=True,
        source='images.all',
        help_text="List of gallery images ordered by the 'order' field."
    )

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug', 'author', 'category', 'tags',
            'content', 'excerpt', 'featured_image', 'publish_date',
            'featured', 'read_time', 'view_count', 'created_at',
            'updated_at', 'meta_title', 'meta_description', 'images',
        ]