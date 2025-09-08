"""URL configuration for blog app."""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogPostViewSet, AdminBlogPostViewSet

# Create router and register viewsets
router = DefaultRouter()
router.register(r'posts', BlogPostViewSet, basename='blogpost')

# Admin router
admin_router = DefaultRouter()
admin_router.register(r'posts', AdminBlogPostViewSet, basename='admin-blogpost')

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', include(admin_router.urls)),
]
