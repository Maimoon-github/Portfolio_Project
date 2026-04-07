"""
Django Cache Utilities for SEO Application.

Provides centralized cache management for SEO metadata, internal link
suggestions, and sitemap caching. Implements defensive programming to
handle cache unavailability gracefully without breaking the request cycle.

All functions use the CACHE_KEY_PREFIX from constants to prevent
namespace collisions with other applications.

Note:
    This module expects Django's caching framework to be configured in
    settings.CACHES, but will degrade gracefully if cache is unavailable
    or if specific cache backends raise exceptions.
"""

import logging
from typing import Any, Dict, List, Optional, Union

from django.core.cache import cache
from django.conf import settings

from .constants import (
    CACHE_KEY_PREFIX,
    SEO_SCORE_CACHE_TIMEOUT,
    SITEMAP_CACHE_TIMEOUT,
    INTERNAL_LINK_SUGGESTIONS_CACHE_TIMEOUT,
)

logger = logging.getLogger(__name__)


# =============================================================================
# CACHE KEY GENERATORS
# =============================================================================


def get_post_metadata_cache_key(post_id: Union[int, str]) -> str:
    """
    Generate cache key for post SEO metadata.
    
    Constructs a deterministic cache key for storing rendered metadata
    (title, description, OG tags, etc.) for a specific post.
    
    Args:
        post_id: The primary key of the blog post (int or string).
        
    Returns:
        Formatted cache key string.
        
    Example:
        >>> get_post_metadata_cache_key(42)
        'seo:metadata:42'
    """
    return f"{CACHE_KEY_PREFIX}:metadata:{post_id}"


def get_internal_links_cache_key(post_id: Union[int, str]) -> str:
    """
    Generate cache key for internal link suggestions.
    
    Used to cache the results of related post queries for the internal
    linking recommendations feature.
    
    Args:
        post_id: The primary key of the blog post (int or string).
        
    Returns:
        Formatted cache key string.
        
    Example:
        >>> get_internal_links_cache_key(42)
        'seo:internal_links:42'
    """
    return f"{CACHE_KEY_PREFIX}:internal_links:{post_id}"


def get_sitemap_cache_key() -> str:
    """
    Generate cache key for sitemap content.
    
    Returns:
        Cache key for the XML sitemap cache.
        
    Example:
        >>> get_sitemap_cache_key()
        'seo:sitemap:xml'
    """
    return f"{CACHE_KEY_PREFIX}:sitemap:xml"


def get_score_cache_key(post_id: Union[int, str]) -> str:
    """
    Generate cache key for SEO score data.
    
    Caches the computed SEO score and breakdown to avoid recomputation.
    
    Args:
        post_id: The primary key of the blog post.
        
    Returns:
        Formatted cache key string.
    """
    return f"{CACHE_KEY_PREFIX}:score:{post_id}"


def get_readability_cache_key(post_id: Union[int, str]) -> str:
    """
    Generate cache key for readability analysis results.
    
    Args:
        post_id: The primary key of the blog post.
        
    Returns:
        Formatted cache key string.
    """
    return f"{CACHE_KEY_PREFIX}:readability:{post_id}"


def get_schema_cache_key(post_id: Union[int, str]) -> str:
    """
    Generate cache key for JSON-LD schema markup.
    
    Args:
        post_id: The primary key of the blog post.
        
    Returns:
        Formatted cache key string.
    """
    return f"{CACHE_KEY_PREFIX}:schema:{post_id}"


# =============================================================================
# CACHE OPERATIONS
# =============================================================================


def get_cached_metadata(post_id: Union[int, str]) -> Optional[Dict[str, Any]]:
    """
    Retrieve cached SEO metadata for a post.
    
    Fetches previously rendered metadata (title, descriptions, OG tags)
    from the cache layer.
    
    Args:
        post_id: The primary key of the blog post.
        
    Returns:
        Dictionary of cached metadata, or None if not in cache or cache
        is unavailable.
        
    Note:
        Logs cache misses at DEBUG level and errors at ERROR level.
    """
    cache_key = get_post_metadata_cache_key(post_id)
    
    try:
        data = cache.get(cache_key)
        if data is None:
            logger.debug(f"Cache miss for metadata: {cache_key}")
            return None
        logger.debug(f"Cache hit for metadata: {cache_key}")
        return data
    except Exception as e:
        logger.error(f"Cache retrieval error for key {cache_key}: {e}")
        return None


def set_cached_metadata(
    post_id: Union[int, str],
    data: Dict[str, Any],
    timeout: Optional[int] = None
) -> bool:
    """
    Store SEO metadata in cache.
    
    Caches rendered metadata to avoid recomputation on subsequent requests.
    Uses the configured SEO_SCORE_CACHE_TIMEOUT by default.
    
    Args:
        post_id: The primary key of the blog post.
        data: Dictionary containing metadata (title, descriptions, etc.).
        timeout: Cache expiration time in seconds. Defaults to 
                SEO_SCORE_CACHE_TIMEOUT (3600 seconds / 1 hour).
                
    Returns:
        True if successfully cached, False if cache operation failed.
    """
    if not isinstance(data, dict):
        logger.warning(f"Attempted to cache non-dict data for post {post_id}")
        return False
    
    cache_key = get_post_metadata_cache_key(post_id)
    timeout = timeout or SEO_SCORE_CACHE_TIMEOUT
    
    try:
        cache.set(cache_key, data, timeout=timeout)
        logger.debug(f"Cached metadata for key {cache_key} (TTL: {timeout}s)")
        return True
    except Exception as e:
        logger.error(f"Cache set error for key {cache_key}: {e}")
        return False


def invalidate_post_metadata(post_id: Union[int, str]) -> bool:
    """
    Invalidate cached metadata for a specific post.
    
    Deletes the cached metadata entry to force regeneration on next request.
    Should be called whenever Post or PostSEO data changes.
    
    Args:
        post_id: The primary key of the blog post.
        
    Returns:
        True if cache key was deleted or didn't exist, False on error.
        
    Note:
        Also invalidates related caches (score, readability, schema) for
        the same post to ensure consistency.
    """
    keys_to_delete = [
        get_post_metadata_cache_key(post_id),
        get_score_cache_key(post_id),
        get_readability_cache_key(post_id),
        get_schema_cache_key(post_id),
        get_internal_links_cache_key(post_id),
    ]
    
    try:
        # Django's cache.delete() returns number of keys deleted for some backends
        for key in keys_to_delete:
            cache.delete(key)
            logger.debug(f"Invalidated cache key: {key}")
        return True
    except Exception as e:
        logger.error(f"Cache invalidation error for post {post_id}: {e}")
        return False


def invalidate_multiple_posts_metadata(post_ids: List[Union[int, str]]) -> int:
    """
    Batch invalidate metadata cache for multiple posts.
    
    Efficiently clears cache for bulk operations like mass updates or
    category changes that affect multiple posts.
    
    Args:
        post_ids: List of post primary keys to invalidate.
        
    Returns:
        Number of cache keys successfully deleted.
    """
    if not post_ids:
        return 0
    
    keys_to_delete = []
    for post_id in post_ids:
        keys_to_delete.extend([
            get_post_metadata_cache_key(post_id),
            get_score_cache_key(post_id),
            get_readability_cache_key(post_id),
            get_schema_cache_key(post_id),
        ])
    
    deleted_count = 0
    try:
        # Some backends support delete_many for efficiency
        if hasattr(cache, 'delete_many'):
            cache.delete_many(keys_to_delete)
            deleted_count = len(keys_to_delete)
        else:
            for key in keys_to_delete:
                cache.delete(key)
                deleted_count += 1
        
        logger.info(f"Bulk invalidation: cleared {deleted_count} cache keys for {len(post_ids)} posts")
        return deleted_count
    except Exception as e:
        logger.error(f"Bulk cache invalidation error: {e}")
        return 0


def get_cached_internal_links(post_id: Union[int, str]) -> Optional[List[Dict[str, Any]]]:
    """
    Retrieve cached internal link suggestions.
    
    Args:
        post_id: The primary key of the blog post.
        
    Returns:
        List of suggested internal link dictionaries, or None if not cached.
    """
    cache_key = get_internal_links_cache_key(post_id)
    
    try:
        return cache.get(cache_key)
    except Exception as e:
        logger.error(f"Cache retrieval error for internal links {post_id}: {e}")
        return None


def set_cached_internal_links(
    post_id: Union[int, str],
    links: List[Dict[str, Any]],
    timeout: Optional[int] = None
) -> bool:
    """
    Cache internal link suggestions.
    
    Args:
        post_id: The primary key of the blog post.
        links: List of link suggestion dictionaries.
        timeout: Cache expiration in seconds. Defaults to 
                INTERNAL_LINK_SUGGESTIONS_CACHE_TIMEOUT (1 hour).
                
    Returns:
        True if cached successfully, False otherwise.
    """
    cache_key = get_internal_links_cache_key(post_id)
    timeout = timeout or INTERNAL_LINK_SUGGESTIONS_CACHE_TIMEOUT
    
    try:
        cache.set(cache_key, links, timeout=timeout)
        logger.debug(f"Cached internal links for post {post_id}")
        return True
    except Exception as e:
        logger.error(f"Cache set error for internal links {post_id}: {e}")
        return False


def invalidate_sitemap_cache() -> bool:
    """
    Clear the XML sitemap cache.
    
    Should be called whenever any post is published, unpublished, or modified
    in a way that affects sitemap content (priority, changefreq, lastmod).
    
    Returns:
        True if cache was cleared or didn't exist, False on error.
    """
    cache_key = get_sitemap_cache_key()
    
    try:
        cache.delete(cache_key)
        logger.info(f"Sitemap cache invalidated: {cache_key}")
        return True
    except Exception as e:
        logger.error(f"Sitemap cache invalidation error: {e}")
        return False


def get_cached_sitemap() -> Optional[str]:
    """
    Retrieve cached XML sitemap content.
    
    Returns:
        XML string of the sitemap, or None if not cached.
    """
    cache_key = get_sitemap_cache_key()
    
    try:
        return cache.get(cache_key)
    except Exception as e:
        logger.error(f"Sitemap cache retrieval error: {e}")
        return None


def set_cached_sitemap(xml_content: str, timeout: Optional[int] = None) -> bool:
    """
    Cache XML sitemap content.
    
    Args:
        xml_content: The generated XML sitemap string.
        timeout: Cache expiration in seconds. Defaults to 
                SITEMAP_CACHE_TIMEOUT (24 hours).
                
    Returns:
        True if cached successfully, False otherwise.
    """
    if not xml_content:
        return False
    
    cache_key = get_sitemap_cache_key()
    timeout = timeout or SITEMAP_CACHE_TIMEOUT
    
    try:
        cache.set(cache_key, xml_content, timeout=timeout)
        logger.debug(f"Sitemap cached (TTL: {timeout}s)")
        return True
    except Exception as e:
        logger.error(f"Sitemap cache set error: {e}")
        return False


# =============================================================================
# CACHE WARMING & MAINTENANCE
# =============================================================================


def warm_post_cache(post_id: Union[int, str], metadata: Dict[str, Any]) -> bool:
    """
    Pre-populate cache for a post (cache warming).
    
    Used during bulk operations or after cache clearing to ensure
    popular content is immediately available in cache.
    
    Args:
        post_id: The primary key of the blog post.
        metadata: The metadata dictionary to cache.
        
    Returns:
        True if all cache operations succeeded, False otherwise.
    """
    success = True
    
    # Warm metadata cache
    if not set_cached_metadata(post_id, metadata):
        success = False
    
    # Note: Score and readability caches are typically warmed by the
    # analysis tasks, not directly here, as they require full content
    
    return success


def get_cache_stats() -> Dict[str, Any]:
    """
    Retrieve cache statistics for monitoring (if backend supports it).
    
    Returns:
        Dictionary with cache backend info and statistics, or empty dict
        if not supported by the cache backend.
        
    Note:
        Only returns stats for backends that support it (Memcached, Redis).
        File-based or database caches may return limited information.
    """
    stats = {
        'backend': str(cache.__class__.__name__),
        'supported': False,
        'keys': [],
    }
    
    try:
        # Try to get stats if backend supports it (e.g., Memcached, Redis)
        if hasattr(cache, 'stats'):
            raw_stats = cache.stats()
            stats['supported'] = True
            stats['raw'] = raw_stats
        elif hasattr(cache, '_cache') and hasattr(cache._cache, 'info'):
            # Redis-specific
            stats['supported'] = True
            stats['info'] = cache._cache.info()
    except Exception as e:
        logger.debug(f"Cache stats not available: {e}")
    
    return stats


def clear_all_seo_cache() -> bool:
    """
    Clear all SEO-related cache entries.
    
    WARNING: This is an expensive operation that clears all keys matching
    the CACHE_KEY_PREFIX. Use with caution in production.
    
    Returns:
        True if operation completed (even if no keys found), False on error.
        
    Note:
        This uses cache.delete_pattern() for Redis or iterates through
        keys for other backends. May be slow on large caches.
    """
    pattern = f"{CACHE_KEY_PREFIX}:*"
    
    try:
        # Try pattern deletion (Redis backend)
        if hasattr(cache, 'delete_pattern'):
            cache.delete_pattern(pattern)
            logger.info(f"Cleared all SEO cache entries matching {pattern}")
        elif hasattr(cache, 'keys'):
            # Manual iteration for other backends that support key listing
            keys = cache.keys(pattern)
            if keys:
                cache.delete_many(keys)
            logger.info(f"Cleared {len(keys)} SEO cache entries")
        else:
            logger.warning("Cache backend does not support pattern deletion. "
                          "Manual clearing required.")
        return True
    except Exception as e:
        logger.error(f"Error clearing SEO cache: {e}")
        return False