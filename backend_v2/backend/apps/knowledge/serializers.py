# apps/knowledge/serializers.py
from rest_framework import serializers
from .models import Course, Lesson, Tool, ToolCategory, Resource

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'content', 'video_url', 'order']
        read_only_fields = fields

class CourseListSerializer(serializers.ModelSerializer):
    lesson_count = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'title', 'slug', 'difficulty', 'estimated_hours', 'featured', 'lesson_count']
        read_only_fields = fields

    def get_lesson_count(self, obj):
        return getattr(obj, 'lesson_count', obj.lessons.count())

class CourseDetailSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'description', 'difficulty',
            'estimated_hours', 'featured', 'meta_title', 'meta_desc',
            'lessons'
        ]
        read_only_fields = fields

class ToolCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolCategory
        fields = ['id', 'name', 'slug', 'description']
        read_only_fields = fields

class ToolSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Tool
        fields = [
            'id', 'name', 'slug', 'description', 'website_url',
            'logo', 'featured', 'order', 'category_name'
        ]
        read_only_fields = fields

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id', 'title', 'url', 'description', 'resource_type', 'tags', 'order']
        read_only_fields = fields