from rest_framework import serializers
from .models import Project, ProjectCategory, TechTag, ProjectImage

class TechTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechTag
        fields = ['name', 'slug']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields = ['name', 'slug']

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['image']  # image URL automatically serialized

class ProjectListSerializer(serializers.ModelSerializer):
    tags = TechTagSerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'meta_desc',
            'tags', 'categories', 'year', 'thumbnail'
        ]

    def get_thumbnail(self, obj):
        first_image = obj.images.first()
        return first_image.image.url if first_image else None

class ProjectDetailSerializer(serializers.ModelSerializer):
    tags = TechTagSerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    images = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'meta_desc',
            'tags', 'categories', 'year', 'thumbnail',
            'overview', 'challenge', 'solution', 'role',
            'timeline', 'live_url', 'github_url', 'images'
        ]