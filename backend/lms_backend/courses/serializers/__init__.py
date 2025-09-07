"""
Serializers for course models.
"""

from rest_framework import serializers
from django.db.models import Avg, Count
from ..models import Course, Lesson, Category, Tag, Enrollment, Review, LessonCompletion
from lms_backend.users.serializers import UserMinimalSerializer


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Course Category."""
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class TagSerializer(serializers.ModelSerializer):
    """Serializer for Course Tag."""
    
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']


class LessonMinimalSerializer(serializers.ModelSerializer):
    """Minimal serializer for Lesson model."""
    
    is_completed = serializers.SerializerMethodField()
    
    class Meta:
        model = Lesson
        fields = [
            'id', 'title', 'slug', 'lesson_type', 
            'order', 'duration_minutes', 'is_preview',
            'is_completed'
        ]
    
    def get_is_completed(self, obj):
        """Check if the lesson is completed by the current user."""
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return LessonCompletion.objects.filter(
                lesson=obj, user=request.user
            ).exists()
        return False


class LessonDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for Lesson model."""
    
    is_completed = serializers.SerializerMethodField()
    completion_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Lesson
        fields = [
            'id', 'title', 'slug', 'lesson_type', 
            'content', 'video_url', 'duration_minutes',
            'order', 'is_required', 'is_preview',
            'status', 'published_at', 'is_completed',
            'completion_count'
        ]
    
    def get_is_completed(self, obj):
        """Check if the lesson is completed by the current user."""
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return LessonCompletion.objects.filter(
                lesson=obj, user=request.user
            ).exists()
        return False
    
    def get_completion_count(self, obj):
        """Get count of users who completed this lesson."""
        return obj.completions.count()


class EnrollmentSerializer(serializers.ModelSerializer):
    """Serializer for Course enrollments."""
    
    user = UserMinimalSerializer(read_only=True)
    course_title = serializers.ReadOnlyField(source='course.title')
    
    class Meta:
        model = Enrollment
        fields = [
            'id', 'user', 'course', 'course_title',
            'status', 'enrolled_at', 'completed_at',
            'progress_percent', 'last_accessed_at'
        ]


class ReviewSerializer(serializers.ModelSerializer):
    """Serializer for Course reviews."""
    
    user = UserMinimalSerializer(read_only=True)
    
    class Meta:
        model = Review
        fields = [
            'id', 'user', 'rating', 'comment',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['user', 'created_at', 'updated_at']


class CourseMinimalSerializer(serializers.ModelSerializer):
    """Minimal serializer for Course model."""
    
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'thumbnail', 
            'level', 'is_free', 'price_cents'
        ]


class CourseListSerializer(serializers.ModelSerializer):
    """Serializer for Course list view."""
    
    instructor = UserMinimalSerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    lesson_count = serializers.IntegerField(read_only=True)
    enrollment_count = serializers.IntegerField(read_only=True)
    rating_avg = serializers.FloatField(read_only=True)
    
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'subtitle', 'thumbnail', 
            'level', 'language', 'duration_hours', 'price_cents', 
            'is_free', 'instructor', 'categories', 'tags',
            'published_at', 'lesson_count', 'enrollment_count', 
            'rating_avg', 'certificate_available',
        ]


class CourseDetailSerializer(serializers.ModelSerializer):
    """Serializer for Course detail view."""
    
    instructor = UserMinimalSerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    lessons = LessonMinimalSerializer(many=True, read_only=True)
    lesson_count = serializers.IntegerField(read_only=True)
    enrollment_count = serializers.IntegerField(read_only=True)
    rating_avg = serializers.FloatField(read_only=True)
    is_enrolled = serializers.SerializerMethodField()
    reviews = ReviewSerializer(many=True, read_only=True)
    progress = serializers.SerializerMethodField()
    structured_data = serializers.SerializerMethodField()
    
    # SEO fields included conditionally based on user permissions
    meta_title = serializers.CharField(read_only=True)
    meta_description = serializers.CharField(read_only=True)
    focus_keyword = serializers.CharField(read_only=True)
    
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'subtitle', 'description', 'thumbnail', 
            'level', 'language', 'duration_hours', 'price_cents', 
            'is_free', 'instructor', 'categories', 'tags',
            'published_at', 'lessons', 'lesson_count', 'enrollment_count', 
            'rating_avg', 'prerequisites', 'learning_outcomes', 
            'certificate_available', 'meta_title', 'meta_description',
            'focus_keyword', 'is_enrolled', 'reviews', 'progress',
            'structured_data'
        ]
    
    def to_representation(self, instance):
        """Conditionally include SEO fields based on user permissions."""
        representation = super().to_representation(instance)
        
        # Check if user has permission to see SEO fields
        if not self.context.get('include_seo_fields', False):
            # Remove SEO fields for non-admin users
            for field in ['meta_title', 'meta_description', 'focus_keyword']:
                representation.pop(field, None)
                
        return representation
    
    def get_is_enrolled(self, obj):
        """Check if current user is enrolled in the course."""
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Enrollment.objects.filter(
                course=obj, user=request.user, status='active'
            ).exists()
        return False
    
    def get_progress(self, obj):
        """Get the user's progress in the course if enrolled."""
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            enrollment = Enrollment.objects.filter(
                course=obj, user=request.user
            ).first()
            
            if enrollment:
                return {
                    'progress_percent': enrollment.progress_percent,
                    'last_accessed_at': enrollment.last_accessed_at,
                    'completed_at': enrollment.completed_at,
                    'status': enrollment.status
                }
        
        return None
    
    def get_structured_data(self, obj):
        """Generate structured data for the course."""
        from lms_backend.core.seo import generate_course_schema
        request = self.context.get('request')
        return generate_course_schema(obj, request)


class CourseAdminSerializer(serializers.ModelSerializer):
    """Serializer for Course admin operations with all fields."""
    
    class Meta:
        model = Course
        fields = '__all__'
