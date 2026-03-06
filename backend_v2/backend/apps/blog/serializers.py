# apps/blog/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Tag, Post, PostImage

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'image', 'caption', 'order']

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

class PostListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug', 'excerpt', 'featured', 'published_date',
            'category', 'tags', 'author', 'read_time'
        ]

class PostDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    author = AuthorSerializer(read_only=True)
    images = PostImageSerializer(many=True, read_only=True)
    # SEO fields from SEOMixin
    meta_title = serializers.CharField(read_only=True)
    meta_description = serializers.CharField(read_only=True)
    meta_keywords = serializers.CharField(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'