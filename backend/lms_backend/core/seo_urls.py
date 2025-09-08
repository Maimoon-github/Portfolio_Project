"""
URLs for SEO preview and related functionality.
"""

from django.urls import path
from .views import SEOPreviewView

urlpatterns = [
    path('preview/<str:model>/<slug:slug>/', SEOPreviewView.as_view(), name='seo-preview'),
]
