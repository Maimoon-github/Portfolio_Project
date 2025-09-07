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
from .dashboard_views import DashboardViewSet

# Create router for dashboard endpoints
dashboard_router = DefaultRouter()
dashboard_router.register(r'dashboard', DashboardViewSet, basename='dashboard')

urlpatterns = [
    # SEO endpoints
    path('seo/robots.txt', RobotsTxtView.as_view(), name='robots-txt'),
    
    # Dashboard endpoints
    path('', include(dashboard_router.urls)),
]
