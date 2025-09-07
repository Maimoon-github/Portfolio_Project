"""
Middleware for content synchronization monitoring.
"""

import time
import logging
import json
from django.utils import timezone
from django.urls import resolve
from django.conf import settings

# Configure logger for sync issues
sync_logger = logging.getLogger('sync_issues')
content_access_logger = logging.getLogger('content_access')


class ContentSyncMonitoringMiddleware:
    """
    Middleware to monitor content synchronization between backend and frontend.
    Tracks API response times, content publication events, and sync issues.
    """
    
    def __init__(self, get_response):
        self.get_response = get_response
        
        # Define content-related API patterns to monitor
        self.content_api_patterns = [
            '/api/v1/pages/',
            '/api/v1/courses/',
            '/api/v1/blog/',
            '/api/v1/projects/',
            '/api/v1/news/',
        ]
    
    def __call__(self, request):
        # Skip middleware for non-API requests
        if not request.path.startswith('/api/'):
            return self.get_response(request)
        
        # Process API requests
        start_time = time.time()
        
        # Call the next middleware/view
        response = self.get_response(request)
        
        # Calculate response time
        response_time = time.time() - start_time
        
        # Process content API requests for monitoring
        if any(request.path.startswith(pattern) for pattern in self.content_api_patterns):
            self._monitor_content_api(request, response, response_time)
        
        # Add response time header for all API responses
        response['X-API-Response-Time'] = str(response_time)
        
        return response
    
    def _monitor_content_api(self, request, response, response_time):
        """Monitor content API requests for sync issues."""
        
        # Log content access
        user_info = 'anonymous'
        if request.user.is_authenticated:
            user_info = f"{request.user.id} ({request.user.email})"
        
        content_access_logger.info(
            f"API: {request.path} | Method: {request.method} | "
            f"User: {user_info} | Status: {response.status_code} | "
            f"Response time: {response_time:.3f}s"
        )
        
        # Check for potential sync issues (slow responses, errors)
        if response_time > 1.0:
            sync_logger.warning(
                f"Slow content API response: {request.path} took {response_time:.3f}s"
            )
        
        if response.status_code >= 400:
            sync_logger.warning(
                f"Content API error: {request.path} returned {response.status_code}"
            )
            
        # For list endpoints, check pagination and content availability
        if request.method == 'GET' and response.status_code == 200:
            try:
                # Check JSON response data for content sync issues
                if hasattr(response, 'data'):
                    self._check_content_response(request.path, response.data)
            except Exception as e:
                sync_logger.error(
                    f"Error analyzing content response for {request.path}: {str(e)}"
                )
    
    def _check_content_response(self, path, data):
        """Check content response data for potential sync issues."""
        
        # For paginated responses
        if isinstance(data, dict) and 'results' in data:
            results = data.get('results', [])
            count = data.get('count', 0)
            
            # No results could indicate a sync issue
            if count == 0:
                sync_logger.info(f"Zero results returned from {path}")
            
            # Check for recently published content
            now = timezone.now()
            for item in results:
                published_at = item.get('published_at')
                if published_at:
                    try:
                        published_time = timezone.datetime.fromisoformat(published_at.replace('Z', '+00:00'))
                        time_since_publish = now - published_time
                        
                        # Log very recent publications for monitoring
                        if time_since_publish.total_seconds() < 300:  # 5 minutes
                            sync_logger.info(
                                f"Recently published content detected in {path}: "
                                f"ID {item.get('id')} published {time_since_publish.total_seconds()}s ago"
                            )
                    except (ValueError, AttributeError):
                        pass
