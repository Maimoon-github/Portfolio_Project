"""
URL Routing for SEO API Endpoints.

Defines URL patterns for the REST API, including ViewSet routes and
standalone API views. Uses Django REST Framework's DefaultRouter for
automatic URL generation from ViewSets.

Integration:
    - Import this module in main seo/urls.py via include()
    - All routes prefixed with 'api/' in the main URL configuration
    - Supports versioning via URL path or Accept header
"""

from typing import List

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    PostSEOViewSet,
    SEOAnalysisAPIView,
    InternalLinkSuggestionsAPIView,
    SchemaValidationAPIView,
)

# =============================================================================
# ROUTER CONFIGURATION
# =============================================================================

# Create router for ViewSet-based endpoints
router = DefaultRouter()

# Register PostSEOViewSet - generates:
# GET    /post-seo/           -> list
# POST   /post-seo/           -> create
# GET    /post-seo/{pk}/      -> retrieve
# PUT    /post-seo/{pk}/      -> update
# PATCH  /post-seo/{pk}/      -> partial_update
# DELETE /post-seo/{pk}/      -> destroy
# POST   /post-seo/{pk}/reanalyze/      -> reanalyze action
# GET    /post-seo/dashboard/          -> dashboard action
# POST   /post-seo/bulk-reanalyze/    -> bulk_reanalyze action
# GET    /post-seo/audit-logs/        -> audit_logs action
router.register(r'post-seo', PostSEOViewSet, basename='postseo')


# =============================================================================
# URL PATTERNS
# =============================================================================

# Standalone API views (not part of router)
urlpatterns: List = [
    # Real-time SEO analysis endpoint
    # POST /api/seo/analyze/
    path(
        'analyze/',
        SEOAnalysisAPIView.as_view(),
        name='seo-analyze'
    ),
    
    # Internal link suggestions endpoint
    # GET /api/seo/suggest-links/?post_id=123&limit=5
    path(
        'suggest-links/',
        InternalLinkSuggestionsAPIView.as_view(),
        name='seo-suggest-links'
    ),
    
    # Schema validation endpoint
    # POST /api/seo/validate-schema/
    path(
        'validate-schema/',
        SchemaValidationAPIView.as_view(),
        name='seo-validate-schema'
    ),
    
    # Include router-generated URLs
    # This adds all PostSEOViewSet routes under /post-seo/
    path('', include(router.urls)),
]


# =============================================================================
# URL NAMING CONVENTIONS
# =============================================================================

"""
Generated URL Names (for reverse URL resolution):

Router URLs:
    - postseo-list          : GET/POST /api/seo/post-seo/
    - postseo-detail        : GET/PUT/PATCH/DELETE /api/seo/post-seo/{pk}/
    - postseo-reanalyze     : POST /api/seo/post-seo/{pk}/reanalyze/
    - postseo-dashboard     : GET /api/seo/post-seo/dashboard/
    - postseo-bulk-reanalyze: POST /api/seo/post-seo/bulk-reanalyze/
    - postseo-audit-logs    : GET /api/seo/post-seo/audit-logs/

Standalone URLs:
    - seo-analyze           : POST /api/seo/analyze/
    - seo-suggest-links     : GET /api/seo/suggest-links/
    - seo-validate-schema   : POST /api/seo/validate-schema/
"""

# =============================================================================
# USAGE EXAMPLES
# =============================================================================

"""
Example API Calls:

1. Analyze draft content:
   POST /api/seo/analyze/
   {
       "title": "SEO Best Practices",
       "body": "<p>Content here...</p>",
       "focus_keyphrase": "seo best practices"
   }

2. Get link suggestions for post:
   GET /api/seo/suggest-links/?post_id=42&limit=5

3. Trigger reanalysis:
   POST /api/seo/post-seo/123/reanalyze/

4. Get dashboard stats:
   GET /api/seo/post-seo/dashboard/

5. Bulk reanalyze:
   POST /api/seo/post-seo/bulk-reanalyze/
   {"post_ids": [1, 2, 3]}

6. List SEO records:
   GET /api/seo/post-seo/?page=1

7. Update SEO metadata:
   PATCH /api/seo/post-seo/123/
   {"seo_title": "New Title", "focus_keyphrase": "new keyword"}
"""