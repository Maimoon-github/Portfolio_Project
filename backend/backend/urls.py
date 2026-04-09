"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""




"""
URL configuration for backend project.
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
# from django.contrib.sitemaps.views import sitemap
# from apps.seo.sitemaps import PostSitemap  # your custom sitemap
from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls
from cms.api import api_router  # Wagtail V2 API router

# Sitemap configuration (keep yours)
# sitemaps = {
#     'posts': PostSitemap,
# }

urlpatterns = [
    # ── Django admin ──────────────────────────────────────────────
    path('admin/', admin.site.urls),

    # ── Your existing DRF API ─────────────────────────────────────
    path('api/', include('api.urls')),

    # ── NEW: Wagtail admin UI (moved to /cms/ to avoid conflict) ──
    path('cms/', include(wagtailadmin_urls)),

    # ── NEW: Wagtail document serving ─────────────────────────────
    path('documents/', include(wagtaildocs_urls)),

    # ── NEW: Wagtail headless REST API → /api/cms/v2/ ─────────────
    # This is what your React frontend calls for CMS content
    path('api/cms/v2/', api_router.urls),

    # ── Your existing sitemap ─────────────────────────────────────
    # path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),  # disabled
        
    # ── Your existing robots.txt ──────────────────────────────────
    path('robots.txt', include('robots.urls')),

    # ── Your SPA root (serves React index.html) ───────────────────
    path('', TemplateView.as_view(template_name='index.html')),
]

# Debug Toolbar (only in DEBUG mode)
if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns

# Media files serving (development only)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# ── NEW: Wagtail page serving (MUST be last – catch‑all for CMS pages) ──
# This handles Wagtail’s own page URLs (e.g., /blog/my-post/).
# It goes AFTER your SPA catch‑all? Actually, careful:
# If you want Wagtail pages to be served, you need to include wagtail_urls.
# But your SPA catch‑all below would override it. So we must remove the old SPA catch‑all
# and let Wagtail handle its own pages, while still serving index.html for unknown frontend routes.
# The clean solution: use Wagtail’s catch‑all and serve React from a dedicated view only when needed.
# However, to keep your existing SPA behavior, we can put wagtail_urls BEFORE the SPA catch‑all,
# but then Wagtail will try to handle any undefined route – which is what you want for CMS pages.
# The old SPA catch‑all was: r'^(?!admin/|api/|static/|media/|sitemap\.xml|robots\.txt).*$'
# We replace that with just: path('', include(wagtail_urls)) – because Wagtail will serve its own pages
# and for any other unmatched route, Wagtail returns 404. But your React app needs to handle client‑side routing.
# To support both Wagtail CMS pages AND React SPA routes, you have two options:
#
# Option A (recommended for mixed content): Keep your SPA catch‑all and do NOT include wagtail_urls.
#   Instead, let Wagtail pages be served via their own URLs (e.g., /cms/... or /blog/...),
#   and your React app handles all other frontend routes. That’s simpler.
#
# Option B: Use Wagtail as the primary CMS and embed React components within Wagtail templates.
#   Then you don’t need the SPA catch‑all at all.
#
# Based on your existing setup (React SPA at root), I suggest Option A: do NOT include wagtail_urls.
# Instead, access Wagtail pages via the API (which you already have at /api/cms/v2/).
# So I will comment out the wagtail_urls include.
#
# If you still want Wagtail to serve its own frontend pages (not just API), uncomment the next line
# and remove the old SPA catch‑all below. But then your React app’s routes would conflict.
#
# path('', include(wagtail_urls)),   # <-- uncomment only if you want Wagtail to serve HTML pages

# SPA catch‑all – excludes admin/, api/, cms/, documents/, static/, media/, sitemap.xml, robots.txt
# MUST BE THE VERY LAST PATTERN (keep your original logic)
urlpatterns += [
    re_path(
        r'^(?!admin/|api/|cms/|documents/|static/|media/|sitemap\.xml|robots\.txt).*$',
        TemplateView.as_view(template_name='index.html'),
        name='spa',
    ),
]