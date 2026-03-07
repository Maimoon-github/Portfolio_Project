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


class KnowledgeSerializer(serializers.Serializer):
    """Aggregate endpoint returning both courses and tools for a single payload."""

    courses = CourseListSerializer(many=True, read_only=True)
    tools = ToolSerializer(many=True, read_only=True)

    # we intentionally do not allow write operations through this serializer
    # since creation should happen via the individual endpoints.
    def to_representation(self, instance):
        # instance will be a dict from the view
        return {
            'courses': CourseListSerializer(instance.get('courses', []), many=True).data,
            'tools': ToolSerializer(instance.get('tools', []), many=True).data,
        }