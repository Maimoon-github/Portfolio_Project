"""
API views and viewsets for the courses app.
"""

from django.db.models import Count, Avg, Q
from django.utils import timezone
from rest_framework import viewsets, filters, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from lms_backend.core.viewsets import PublishedContentViewSet, AdminContentViewSet
from .models import Course, Category, Tag, Lesson, Enrollment, Review, LessonCompletion
from .serializers import (
    CourseListSerializer, CourseDetailSerializer, CourseAdminSerializer,
    CategorySerializer, TagSerializer, LessonMinimalSerializer,
    LessonDetailSerializer, EnrollmentSerializer, ReviewSerializer
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for course categories."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for course tags."""
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class CourseViewSet(PublishedContentViewSet):
    """API endpoint for courses."""
    serializer_class = CourseListSerializer
    filterset_fields = ['level', 'is_free', 'categories', 'tags', 'language', 'instructor']
    search_fields = ['title', 'subtitle', 'description']
    ordering_fields = ['published_at', 'title', 'price_cents', 'created_at']
    
    def get_queryset(self):
        """Get published courses with annotated counts."""
        queryset = super().get_queryset()
        
        # Filter by price range if specified
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        
        if min_price is not None:
            try:
                queryset = queryset.filter(price_cents__gte=int(min_price))
            except ValueError:
                pass
                
        if max_price is not None:
            try:
                queryset = queryset.filter(price_cents__lte=int(max_price))
            except ValueError:
                pass
        
        # Annotate with lesson count, enrollment count, and average rating
        return queryset.annotate(
            lesson_count=Count('lessons', distinct=True),
            enrollment_count=Count('enrollments', distinct=True),
            rating_avg=Avg('reviews__rating')
        )
    
    def get_serializer_class(self):
        """Return different serializers based on action."""
        if self.action == 'retrieve':
            return CourseDetailSerializer
        return CourseListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        """Get detailed course info."""
        instance = self.get_object()
        
        # Track last access for enrolled users
        if request.user.is_authenticated:
            enrollment = Enrollment.objects.filter(
                course=instance,
                user=request.user,
                status='active'
            ).first()
            
            if enrollment:
                enrollment.last_accessed_at = timezone.now()
                enrollment.save(update_fields=['last_accessed_at'])
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def enroll(self, request, pk=None):
        """Enroll the current user in this course."""
        course = self.get_object()
        user = request.user
        
        # Check if already enrolled
        if Enrollment.objects.filter(course=course, user=user).exists():
            return Response(
                {"detail": "You are already enrolled in this course."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # For simplicity, we'll allow free enrollment
        # In production, this would integrate with a payment gateway
        if not course.is_free:
            # Here you would handle payment processing
            # This is a simplified version for the prototype
            pass
        
        # Create enrollment record
        enrollment = Enrollment.objects.create(
            course=course,
            user=user,
            status='active',
            amount_paid=0 if course.is_free else course.price_cents
        )
        
        # Log the enrollment for monitoring
        import logging
        logger = logging.getLogger('content_access')
        logger.info(f"User {user.id} ({user.email}) enrolled in course {course.id} ({course.title})")
        
        # Return enrollment details
        serializer = EnrollmentSerializer(enrollment, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def lessons(self, request, pk=None):
        """Get lessons for this course."""
        course = self.get_object()
        
        # Check if user is enrolled
        is_enrolled = Enrollment.objects.filter(
            course=course, 
            user=request.user, 
            status='active'
        ).exists()
        
        # Get lessons, but filter based on enrollment status
        if is_enrolled:
            # Enrolled users can see all lessons
            lessons = course.lessons.all().order_by('order')
        else:
            # Non-enrolled users can only see preview lessons
            lessons = course.lessons.filter(is_preview=True).order_by('order')
        
        serializer = LessonMinimalSerializer(
            lessons, 
            many=True, 
            context={'request': request}
        )
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def progress(self, request, pk=None):
        """Get user's progress in this course."""
        course = self.get_object()
        
        try:
            enrollment = Enrollment.objects.get(
                course=course,
                user=request.user
            )
        except Enrollment.DoesNotExist:
            return Response(
                {"detail": "You are not enrolled in this course."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Update progress (in case there's new content)
        enrollment.update_progress()
        
        # Get completed lessons
        completed_lessons = LessonCompletion.objects.filter(
            user=request.user,
            lesson__course=course
        ).values_list('lesson_id', flat=True)
        
        return Response({
            'enrollment': EnrollmentSerializer(enrollment, context={'request': request}).data,
            'completed_lessons': list(completed_lessons)
        })
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def complete_lesson(self, request, pk=None):
        """Mark a lesson as completed."""
        course = self.get_object()
        
        # Check if user is enrolled
        try:
            enrollment = Enrollment.objects.get(
                course=course,
                user=request.user,
                status='active'
            )
        except Enrollment.DoesNotExist:
            return Response(
                {"detail": "You are not enrolled in this course."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Get the lesson to mark as completed
        lesson_id = request.data.get('lesson_id')
        if not lesson_id:
            return Response(
                {"detail": "lesson_id is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            lesson = Lesson.objects.get(id=lesson_id, course=course)
        except Lesson.DoesNotExist:
            return Response(
                {"detail": "Lesson not found in this course."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Mark as completed (if not already)
        completion, created = LessonCompletion.objects.get_or_create(
            lesson=lesson,
            user=request.user
        )
        
        # Update enrollment progress
        enrollment.update_progress()
        
        return Response({
            'completed': True,
            'created': created,
            'progress': enrollment.progress_percent,
            'status': enrollment.status
        })


class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for course lessons."""
    serializer_class = LessonDetailSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filter lessons by course and user access."""
        user = self.request.user
        
        # Get the lesson ID from the URL
        lesson_id = self.kwargs.get('pk')
        
        # If getting a list, require a course_id parameter
        if not lesson_id:
            course_id = self.request.query_params.get('course_id')
            if not course_id:
                return Lesson.objects.none()
            
            try:
                course = Course.published.get(id=course_id)
            except Course.DoesNotExist:
                return Lesson.objects.none()
                
            # Check if user is enrolled or if the lessons are previews
            is_enrolled = Enrollment.objects.filter(
                course=course, user=user, status='active'
            ).exists()
            
            if is_enrolled:
                return course.lessons.all().order_by('order')
            else:
                return course.lessons.filter(is_preview=True).order_by('order')
        
        # For individual lesson retrieval
        try:
            lesson = Lesson.objects.get(id=lesson_id)
            course = lesson.course
            
            # Check if the lesson is a preview or if user is enrolled
            if lesson.is_preview:
                return Lesson.objects.filter(id=lesson_id)
                
            is_enrolled = Enrollment.objects.filter(
                course=course, user=user, status='active'
            ).exists()
            
            if is_enrolled:
                return Lesson.objects.filter(id=lesson_id)
            else:
                return Lesson.objects.none()
                
        except Lesson.DoesNotExist:
            return Lesson.objects.none()
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def complete(self, request, pk=None):
        """Mark this lesson as completed."""
        lesson = self.get_object()
        
        # Check if user is enrolled in the course
        is_enrolled = Enrollment.objects.filter(
            course=lesson.course, user=request.user, status='active'
        ).exists()
        
        if not is_enrolled:
            return Response(
                {"detail": "You are not enrolled in this course."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Mark as completed
        completion, created = LessonCompletion.objects.get_or_create(
            lesson=lesson,
            user=request.user
        )
        
        # Update enrollment progress
        enrollment = Enrollment.objects.get(
            course=lesson.course, user=request.user
        )
        enrollment.update_progress()
        
        return Response({
            'completed': True,
            'created': created,
            'progress': enrollment.progress_percent,
            'status': enrollment.status
        })


class AdminCourseViewSet(AdminContentViewSet):
    """API endpoint for admin course management."""
    serializer_class = CourseAdminSerializer
    filterset_fields = ['status', 'level', 'is_free', 'categories', 'tags', 'language']
    search_fields = ['title', 'subtitle', 'description']
    ordering_fields = ['published_at', 'title', 'price_cents', 'created_at', 'updated_at']
    
    def get_queryset(self):
        return Course.admin.all()


class ReviewViewSet(viewsets.ModelViewSet):
    """API endpoint for course reviews."""
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Return reviews for a specific course."""
        course_id = self.request.query_params.get('course_id')
        if course_id:
            return Review.objects.filter(course_id=course_id)
        return Review.objects.none()
    
    def perform_create(self, serializer):
        """Create a new review."""
        course_id = self.request.data.get('course_id')
        
        # Ensure the course exists
        try:
            course = Course.published.get(id=course_id)
        except Course.DoesNotExist:
            raise permissions.exceptions.NotFound("Course not found")
        
        # Check if user is enrolled
        is_enrolled = Enrollment.objects.filter(
            course=course, user=self.request.user, status__in=['active', 'completed']
        ).exists()
        
        if not is_enrolled:
            raise permissions.exceptions.PermissionDenied(
                "You must be enrolled in the course to leave a review"
            )
        
        # Check if user already reviewed this course
        existing_review = Review.objects.filter(
            course=course, user=self.request.user
        ).first()
        
        if existing_review:
            raise permissions.exceptions.PermissionDenied(
                "You have already reviewed this course"
            )
        
        # Create the review
        serializer.save(
            course=course,
            user=self.request.user
        )
