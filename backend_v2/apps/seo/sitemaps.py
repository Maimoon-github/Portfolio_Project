"""
Django Sitemap Classes for SEO Application.

Provides sitemap implementations for blog posts and categories with
per-item priority and changefrequency support via the PostSEO companion
model. Integrates with Django's built-in sitemap framework for automatic
XML generation.

Features:
    - Per-post sitemap priority and changefreq from PostSEO
    - Efficient queryset with select_related to minimize queries
    - Last modification date tracking
    - Support for large sites via pagination (limit/offset)
"""

import logging
from typing import Any, List, Optional, Union

from django.apps import apps
from django.contrib.sitemaps import Sitemap
from django.db.models import QuerySet

from .constants import DEFAULT_SITEMAP_PRIORITY, DEFAULT_CHANGEFREQ

logger = logging.getLogger(__name__)


# =============================================================================
# POST SITEMAP
# =============================================================================

class PostSitemap(Sitemap):
    """
    Sitemap for blog posts with SEO-aware priority and changefreq.
    
    Generates sitemap entries for all published posts, reading per-post
    configuration from the PostSEO companion model. Falls back to defaults
    for posts without explicit SEO settings.
    
    Attributes:
        changefreq: Default change frequency (used if no PostSEO).
        priority: Default priority (used if no PostSEO).
        protocol: URL protocol (http/https) from settings.
        limit: Maximum items per sitemap page (for large sites).
    """
    
    changefreq: str = DEFAULT_CHANGEFREQ  # fallback (overridden per-item by method below)
    protocol: Optional[str] = None  # Uses django.contrib.sites if None
    limit: int = 5000  # Max items per sitemap page
    
    def __init__(self) -> None:
        """
        Initialize sitemap with protocol from settings.
        """
        from seo.constants import META_SITE_PROTOCOL
        self.protocol = META_SITE_PROTOCOL
        
        # Lazy model loading to prevent circular imports
        self._post_model: Optional[Any] = None
        self._category_model: Optional[Any] = None
    
    def _get_post_model(self) -> Any:
        """Lazy load Post model."""
        if self._post_model is None:
            self._post_model = apps.get_model('blog', 'Post')
        return self._post_model
    
    def items(self) -> QuerySet:
        """
        Return queryset of published posts for sitemap inclusion.
        
        Prefetches PostSEO data to avoid N+1 queries when accessing
        per-post priority and changefreq settings.
        
        Returns:
            QuerySet of Post objects with related SEO data.
        """
        try:
            Post = self._get_post_model()
            
            # Get published posts with SEO data
            # Assumes 'status' field exists; adjust if your Post model uses different field
            queryset = Post.objects.filter(
                status='published'
            ).select_related(
                'seo'
            ).order_by(
                '-updated_at'  # Most recently updated first for lastmod efficiency
            )
            
            return queryset
            
        except Exception as e:
            logger.error(f"Error generating sitemap items: {e}")
            # Return empty queryset on error to prevent 500 errors
            return Post.objects.none() if 'Post' in locals() else []
    
    def lastmod(self, obj: Any) -> Optional[Any]:
        """
        Return last modification date for a post.
        
        Uses the post's updated_at field for accurate freshness signaling
        to search engines.
        
        Args:
            obj: Post model instance.
            
        Returns:
            datetime or None if unavailable.
        """
        try:
            return getattr(obj, 'updated_at', None) or getattr(obj, 'published_at', None)
        except Exception:
            return None
    
    def priority(self, obj: Any) -> float:
        """
        Return sitemap priority for a post.

        Reads from PostSEO.sitemap_priority if available, otherwise
        returns default. Cornerstone content receives slight boost.

        Args:
            obj: Post model instance.

        Returns:
            Float between 0.0 and 1.0.
        """
        try:
            post_seo = getattr(obj, 'seo', None)

            if post_seo:
                # Get explicit priority or calculate based on cornerstone status
                explicit_priority = getattr(post_seo, 'sitemap_priority', None)
                if explicit_priority is not None:
                    return float(explicit_priority)

                # Boost cornerstone content slightly
                if getattr(post_seo, 'is_cornerstone', False):
                    return min(1.0, DEFAULT_SITEMAP_PRIORITY + 0.1)

            return DEFAULT_SITEMAP_PRIORITY

        except Exception as e:
            logger.warning(f"Error getting priority for post {getattr(obj, 'pk', 'unknown')}: {e}")
            return DEFAULT_SITEMAP_PRIORITY
    
    def changefreq(self, obj: Any) -> str:
        """
        Return change frequency for a post.

        Reads from PostSEO.sitemap_changefreq if available.

        Args:
            obj: Post model instance.

        Returns:
            String changefreq value.
        """
        try:
            post_seo = getattr(obj, 'seo', None)

            if post_seo:
                explicit_changefreq = getattr(post_seo, 'sitemap_changefreq', None)
                if explicit_changefreq:
                    return explicit_changefreq

            return DEFAULT_CHANGEFREQ

        except Exception as e:
            logger.warning(f"Error getting changefreq for post {getattr(obj, 'pk', 'unknown')}: {e}")
            return DEFAULT_CHANGEFREQ
    
    def location(self, obj: Any) -> str:
        """
        Return absolute URL for a post.
        
        Uses post's get_absolute_url() method.
        
        Args:
            obj: Post model instance.
            
        Returns:
            Absolute URL string.
        """
        try:
            return obj.get_absolute_url()
        except Exception as e:
            logger.error(f"Error getting URL for post {getattr(obj, 'pk', 'unknown')}: {e}")
            return ''


# =============================================================================
# CATEGORY SITEMAP
# =============================================================================

class CategorySitemap(Sitemap):
    """
    Sitemap for blog categories/taxonomy pages.
    
    Generates sitemap entries for category archive pages. Assumes categories
    have their own URLs and may have SEO metadata.
    
    Attributes:
        changefreq: Default 'weekly' for category pages.
        priority: Default 0.6 (slightly lower than individual posts).
    """
    
    changefreq: str = 'weekly'
    priority: float = 0.6
    protocol: Optional[str] = None
    
    def __init__(self) -> None:
        """Initialize with protocol from settings."""
        from seo.constants import META_SITE_PROTOCOL
        self.protocol = META_SITE_PROTOCOL
        self._category_model: Optional[Any] = None
    
    def _get_category_model(self) -> Any:
        """Lazy load Category model."""
        if self._category_model is None:
            self._category_model = apps.get_model('blog', 'Category')
        return self._category_model
    
    def items(self) -> QuerySet:
        """
        Return all active categories.
        
        Returns:
            QuerySet of Category objects.
        """
        try:
            Category = self._get_category_model()
            
            # Assuming Category has some active/published flag or we show all
            # Adjust filter based on your Category model fields
            queryset = Category.objects.all().order_by('name')
            
            return queryset
            
        except Exception as e:
            logger.error(f"Error generating category sitemap items: {e}")
            return Category.objects.none() if 'Category' in locals() else []
    
    def lastmod(self, obj: Any) -> Optional[Any]:
        """
        Return last modification date for category.
        
        Uses most recent post in category if available, otherwise
        category's own updated_at.
        
        Args:
            obj: Category model instance.
            
        Returns:
            datetime or None.
        """
        try:
            # Try to get most recent post update in this category
            if hasattr(obj, 'posts'):
                latest_post = obj.posts.filter(
                    status='published'
                ).order_by('-updated_at').first()
                
                if latest_post:
                    return latest_post.updated_at
            
            return getattr(obj, 'updated_at', None)
            
        except Exception:
            return getattr(obj, 'updated_at', None)
    
    def location(self, obj: Any) -> str:
        """
        Return absolute URL for category.
        
        Args:
            obj: Category model instance.
            
        Returns:
            Absolute URL string.
        """
        try:
            return obj.get_absolute_url()
        except Exception as e:
            logger.error(f"Error getting URL for category {getattr(obj, 'pk', 'unknown')}: {e}")
            return ''


# =============================================================================
# STATIC SITEMAP (Optional)
# =============================================================================

class StaticViewSitemap(Sitemap):
    """
    Sitemap for static pages (homepage, about, contact, etc.).
    
    Manually defined URLs for site pages that don't have database models.
    """
    
    priority: float = 0.9
    changefreq: str = 'daily'
    protocol: Optional[str] = None
    
    def __init__(self) -> None:
        """Initialize with protocol from settings."""
        from seo.constants import META_SITE_PROTOCOL
        self.protocol = META_SITE_PROTOCOL
    
    def items(self) -> List[str]:
        """
        Return list of named URL patterns for static views.
        
        Returns:
            List of URL pattern names.
        """
        return ['home', 'about', 'contact']  # Adjust to your URL names
    
    def location(self, item: str) -> str:
        """
        Reverse URL pattern to get absolute URL.
        
        Args:
            item: URL pattern name.
            
        Returns:
            Absolute URL string.
        """
        from django.urls import reverse
        try:
            return reverse(item)
        except Exception as e:
            logger.error(f"Error reversing URL '{item}': {e}")
            return f'/{item}/'  # Fallback


# =============================================================================
# SITEMAP REGISTRY
# =============================================================================

# Dictionary for use in urls.py
# Example usage in urls.py:
#   from django.contrib.sitemaps.views import sitemap
#   from seo.sitemaps import sitemaps
#   
#   urlpatterns = [
#       path('sitemap.xml', sitemap, {'sitemaps': sitemaps},
#            name='django.contrib.sitemaps.views.sitemap'),
#   ]

sitemaps = {
    'posts': PostSitemap,
    'categories': CategorySitemap,
    # 'static': StaticViewSitemap,  # Uncomment if static pages sitemap needed
}


def get_sitemaps() -> dict:
    """
    Return sitemap dictionary for URL configuration.
    
    This function allows dynamic sitemap configuration and lazy loading.
    
    Returns:
        Dictionary mapping sitemap names to Sitemap classes.
    """
    return {
        'posts': PostSitemap(),
        'categories': CategorySitemap(),
    }


# =============================================================================
# SITEMAP INDEX (for large sites)
# =============================================================================

class PostSitemapIndex(Sitemap):
    """
    Paginated sitemap for sites with >50,000 posts.
    
    Implements limit/offset pagination for sitemap index files.
    """
    
    limit: int = 10000  # Items per sitemap file
    
    def __init__(self, page: int = 1) -> None:
        super().__init__()
        self.page = page
    
    def items(self) -> QuerySet:
        """
        Return paginated queryset based on page number.
        """
        Post = apps.get_model('blog', 'Post')
        
        offset = (self.page - 1) * self.limit
        
        return Post.objects.filter(
            status='published'
        ).select_related('seo').order_by(
            '-updated_at'
        )[offset:offset + self.limit]