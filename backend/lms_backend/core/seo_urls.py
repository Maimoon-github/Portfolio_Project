"""
URLs for SEO preview and related functionality.
"""

from django.urls import path
from .views import SEOPreviewView, RobotsTxtView

urlpatterns = [
    path('', SEOPreviewView.as_view(), name='seo-preview'),
    path('robots.txt', RobotsTxtView.as_view(), name='robots-txt'),
]
