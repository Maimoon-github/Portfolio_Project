"""
URLs for page-related endpoints.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PageViewSet, PageAdminViewSet

router = DefaultRouter()
router.register(r'', PageViewSet, basename='page')

admin_router = DefaultRouter()
admin_router.register(r'', PageAdminViewSet, basename='admin-page')

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', include(admin_router.urls)),
]
