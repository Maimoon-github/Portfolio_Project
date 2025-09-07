"""
URL configuration for courses app.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CourseViewSet, AdminCourseViewSet, CategoryViewSet, TagViewSet,
    LessonViewSet, ReviewViewSet
)

# Create router and register viewsets
router = DefaultRouter()
router.register(r'', CourseViewSet, basename='course')
router.register(r'categories', CategoryViewSet, basename='course-category')
router.register(r'tags', TagViewSet, basename='course-tag')
router.register(r'lessons', LessonViewSet, basename='course-lesson')
router.register(r'reviews', ReviewViewSet, basename='course-review')

# Admin router
admin_router = DefaultRouter()
admin_router.register(r'', AdminCourseViewSet, basename='admin-course')

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', include(admin_router.urls)),
]
