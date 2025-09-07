"""
Core API URLs for backend functionality.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RobotsTxtView, SEOPreviewView
from .health_views import (
    DatabaseHealthView, 
    ContentSyncHealthView,
    SeoHealthView
)
from .viewsets import DashboardContentSyncViewSet

# Create router for dashboard endpoints
dashboard_router = DefaultRouter()
dashboard_router.register(r'content-sync-status', DashboardContentSyncViewSet, basename='content-sync-status')

urlpatterns = [
    # SEO endpoints
    path('seo/robots.txt', RobotsTxtView.as_view(), name='robots-txt'),
    
    # Dashboard endpoints
    path('dashboard/', include(dashboard_router.urls)),
]
