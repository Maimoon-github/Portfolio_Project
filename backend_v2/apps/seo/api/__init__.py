"""
SEO API Package

RESTful API layer for the Yoast-level SEO intelligence app.
Provides production-ready DRF endpoints for:

- Real-time SEO analysis of draft content
- PostSEO CRUD + custom actions (reanalyze, dashboard, bulk operations)
- Internal link suggestions
- Schema validation

All business logic is delegated to the service layer (`seo.services`).
No direct ORM queries or model manipulation occurs in views/serializers.

This subpackage follows the strict service-layer architecture and
is designed to be mounted under `/api/seo/` in the main URLconf.
"""

# =============================================================================
# PACKAGE METADATA
# =============================================================================

__version__ = "1.0.0"
__author__ = "DjangoMaster 2026"
__description__ = "Production-grade SEO REST API for Django blogging platforms"

# =============================================================================
# PUBLIC API EXPORTS (for internal app usage & testing)
# =============================================================================

# These exports allow clean imports like:
# from seo.api import PostSEOSerializer, SEOAnalysisAPIView

from .serializers import (
    PostSEOSerializer,
    SEOAnalysisRequestSerializer,
    SEOAnalysisResponseSerializer,
    PostSEOAuditLogSerializer,
    PostRedirectSerializer,
)

from .views import (
    SEOAnalysisAPIView,
    PostSEOViewSet,
    InternalLinkSuggestionsAPIView,
    SchemaValidationAPIView,
)

from .urls import urlpatterns as api_urlpatterns

__all__ = [
    # Serializers
    "PostSEOSerializer",
    "SEOAnalysisRequestSerializer",
    "SEOAnalysisResponseSerializer",
    "PostSEOAuditLogSerializer",
    "PostRedirectSerializer",
    # Views
    "SEOAnalysisAPIView",
    "PostSEOViewSet",
    "InternalLinkSuggestionsAPIView",
    "SchemaValidationAPIView",
    # URL patterns (for easy inclusion in main urls.py)
    "api_urlpatterns",
]

# =============================================================================
# NOTE TO DEVELOPERS
# =============================================================================
# This __init__.py deliberately does NOT import models or services at module
# level to prevent circular import issues. All heavy imports happen inside
# view/serializer methods using django.apps.get_model() where required.