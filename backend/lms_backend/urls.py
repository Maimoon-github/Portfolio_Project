"""
URL Configuration for lms_backend project.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.sitemaps.views import sitemap
from django.http import HttpResponse
from django.shortcuts import redirect
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from .core.sitemaps import sitemaps

def robots_txt(request):
    """Serve robots.txt file"""
    content = """User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml"""
    return HttpResponse(content, content_type='text/plain')

def service_worker(request):
    """Serve service worker file"""
    content = """// Basic service worker for PWA functionality
self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activating...');
});

self.addEventListener('fetch', (event) => {
  // Handle fetch events if needed
});"""
    return HttpResponse(content, content_type='application/javascript')

urlpatterns = [
    # Root path - redirect to admin
    path('', lambda request: redirect('admin/'), name='home'),
    
    # SEO and PWA files
    path('robots.txt', robots_txt, name='robots_txt'),
    path('sw.js', service_worker, name='service_worker'),
    
    # Django Admin
    path('admin/', admin.site.urls),
    # TinyMCE widget assets
    path('tinymce/', include('tinymce.urls')),
    
    # API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    
    # JWT Authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    # API endpoints
    path('api/v1/', include('lms_backend.core.urls')),
    path('api/v1/auth/', include('lms_backend.users.auth_urls')),
    path('api/v1/users/', include('lms_backend.users.urls')),
    path('api/v1/courses/', include('lms_backend.courses.urls')),
    path('api/v1/blog/', include('lms_backend.blog.urls')),
    path('api/v1/projects/', include('lms_backend.projects.urls')),
    path('api/v1/news/', include('lms_backend.news.urls')),
    path('api/v1/pages/', include('lms_backend.pages.urls')),
    path('api/v1/events/', include('lms_backend.events.urls')),
    
    # Health check endpoints
    path('api/health/', include('lms_backend.core.health_urls')),
    
    # SEO endpoints
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
    path('api/v1/seo/', include('lms_backend.core.seo_urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # Serve static files in development
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
