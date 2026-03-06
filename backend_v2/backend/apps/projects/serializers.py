# apps/projects/serializers.py
from rest_framework import serializers
from .models import Project, ProjectCategory, TechTag, ProjectImage

class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields = ['id', 'name', 'slug']

class TechTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechTag
        fields = ['id', 'name', 'slug']

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'caption', 'order']

class ProjectListSerializer(serializers.ModelSerializer):
    categories = ProjectCategorySerializer(many=True, read_only=True)
    tech_tags = TechTagSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'description', 'featured_image',
                  'completion_date', 'is_featured', 'categories', 'tech_tags']

class ProjectDetailSerializer(serializers.ModelSerializer):
    categories = ProjectCategorySerializer(many=True, read_only=True)
    tech_tags = TechTagSerializer(many=True, read_only=True)
    images = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'