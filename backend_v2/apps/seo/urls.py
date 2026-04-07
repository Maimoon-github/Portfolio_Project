"""
Main URL Configuration for SEO Application.

Defines URL patterns for the SEO app including:
- XML sitemap endpoint (for search engine crawlers)
- REST API endpoints (under /api/ prefix)
- Admin dashboard view (for SEO management interface)
- Redirect handling middleware is configured separately in settings

These URLs should be included in the project's main urls.py under a
suitable prefix (e.g., path('seo/', include('seo.urls'))).
"""

from typing import List
from .api import urls as api_urls
from django.urls import include, path
from django.contrib.sitemaps.views import sitemap as django_sitemap_view

# Import sitemap classes
from .sitemaps import sitemaps

# Import admin dashboard view
from .admin import SEODashboardView

# App namespace for URL reversing
app_name: str = 'seo'

# =============================================================================
# URL PATTERNS
# =============================================================================

urlpatterns: List = [
    # -------------------------------------------------------------------------
    # XML Sitemap (for search engine crawlers)
    # -------------------------------------------------------------------------
    # URL: /seo/sitemap.xml
    # Generates standards-compliant XML sitemap with post priorities,
    # changefrequencies, and lastmod dates from PostSEO companion model.
    path(
        'sitemap.xml',
        django_sitemap_view,
        {'sitemaps': sitemaps},
        name='sitemap'
    ),
    
    # -------------------------------------------------------------------------
    # REST API Endpoints
    # -------------------------------------------------------------------------
    # URL: /seo/api/*
    # Includes all API routes from seo.api.urls:
    #   - POST /api/analyze/           (real-time SEO analysis)
    #   - GET  /api/suggest-links/     (internal link suggestions)
    #   - POST /api/validate-schema/   (schema markup validation)
    #   - /api/post-seo/               (PostSEO CRUD + actions)
    path('api/', include(api_urls)),
    
    # -------------------------------------------------------------------------
    # SEO Dashboard (Admin Interface)
    # -------------------------------------------------------------------------
    # URL: /seo/dashboard/
    # Administrative dashboard showing:
    #   - Aggregated SEO statistics
    #   - Posts needing attention (low scores)
    #   - Orphan post detection results
    #   - Recent audit log activity
    # path(
    #     'dashboard/',
    #     SEODashboardView.as_view(),
    #     name='dashboard'
    # ),
]


# =============================================================================
# URL RESOLUTION EXAMPLES
# =============================================================================

"""
Named URLs for reverse() resolution:

    # Sitemap
    reverse('seo:sitemap')  # -> /seo/sitemap.xml
    
    # API Endpoints
    reverse('seo:seo-analyze')         # -> /seo/api/analyze/
    reverse('seo:seo-suggest-links')   # -> /seo/api/suggest-links/
    reverse('seo:postseo-list')        # -> /seo/api/post-seo/
    reverse('seo:postseo-detail', kwargs={'pk': 123})  # -> /seo/api/post-seo/123/
    reverse('seo:postseo-reanalyze', kwargs={'pk': 123})  # -> /seo/api/post-seo/123/reanalyze/
    reverse('seo:postseo-dashboard')   # -> /seo/api/post-seo/dashboard/
    
    # Dashboard
    reverse('seo:dashboard')  # -> /seo/dashboard/
"""

# =============================================================================
# INTEGRATION INSTRUCTIONS
# =============================================================================

"""
To integrate these URLs into your project:

1. In your project's main urls.py:
   
   from django.urls import include, path
   
   urlpatterns = [
       # ... other patterns ...
       path('seo/', include('seo.urls')),  # All SEO URLs under /seo/
       # ... other patterns ...
   ]

2. For sitemap.xml at root (recommended for SEO):
   
   urlpatterns = [
       path('sitemap.xml', include('seo.urls')),  # Just sitemap at root
       # OR include full SEO URLs elsewhere:
       path('admin/seo/', include('seo.urls')),
   ]

3. Ensure django.contrib.sitemaps is in INSTALLED_APPS for sitemap.xml

4. The middleware (PostRedirectMiddleware) is configured in settings.py:
   
   MIDDLEWARE = [
       # ... other middleware ...
       'seo.views.PostRedirectMiddleware',  # Handle slug redirects
       # ... other middleware ...
   ]
"""