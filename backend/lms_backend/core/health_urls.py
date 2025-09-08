"""
Health check API URLs.
"""

from django.urls import path
from .health_views import (
    DatabaseHealthView,
    ContentSyncHealthView,
    SeoHealthView,
    SimpleHealthView,
)

urlpatterns = [
    path('', SimpleHealthView.as_view(), name='health-simple'),
    path('database/', DatabaseHealthView.as_view(), name='health-database'),
    path('content-sync/', ContentSyncHealthView.as_view(), name='health-content-sync'),
    path('seo/', SeoHealthView.as_view(), name='health-seo'),
]
