"""
URL configuration for projects app.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, AdminProjectViewSet, TechnologyViewSet

# Create router and register viewsets
router = DefaultRouter()
router.register(r'', ProjectViewSet, basename='project')
router.register(r'technologies', TechnologyViewSet, basename='technology')

# Admin router
admin_router = DefaultRouter()
admin_router.register(r'', AdminProjectViewSet, basename='admin-project')

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', include(admin_router.urls)),
]
