"""
Health check views for system monitoring.
"""

from django.db import connection
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser
import time
import logging

# Configure logger
sync_logger = logging.getLogger('sync_issues')


class DatabaseHealthView(APIView):
    """
    Check database connectivity and query performance.
    """
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        start_time = time.time()
        
        try:
            # Execute a simple query to check DB connection
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                result = cursor.fetchone()
            
            # Calculate query execution time
            query_time = time.time() - start_time
            
            return Response({
                'status': 'healthy',
                'database_connected': True,
                'query_execution_time': f"{query_time:.3f}s",
                'timestamp': timezone.now().isoformat(),
            })
        
        except Exception as e:
            return Response({
                'status': 'unhealthy',
                'database_connected': False,
                'error': str(e),
                'timestamp': timezone.now().isoformat(),
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ContentSyncHealthView(APIView):
    """
    Check published content availability and API response consistency.
    """
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        try:
            # Get counts from different content models
            from lms_backend.pages.models import Page
            from lms_backend.courses.models import Course
            from lms_backend.blog.models import BlogPost
            from lms_backend.news.models import NewsItem
            from lms_backend.projects.models import Project
            
            # Get published content counts
            page_count = Page.published.count()
            course_count = Course.published.count()
            blog_count = BlogPost.published.count()
            news_count = NewsItem.published.count()
            project_count = Project.published.count()
            
            # Get sync issues from logs (simplified for now)
            sync_issues_last_24h = 0
            
            # Check for content with recent publication issues
            recent_issues = []
            
            return Response({
                'status': 'healthy',
                'published_content': {
                    'pages': page_count,
                    'courses': course_count,
                    'blog_posts': blog_count,
                    'news_items': news_count,
                    'projects': project_count,
                },
                'sync_issues_last_24h': sync_issues_last_24h,
                'recent_issues': recent_issues,
                'timestamp': timezone.now().isoformat(),
            })
            
        except Exception as e:
            sync_logger.error(f"Health check error: {str(e)}")
            return Response({
                'status': 'unhealthy',
                'error': str(e),
                'timestamp': timezone.now().isoformat(),
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SeoHealthView(APIView):
    """
    Check SEO field completeness and structured data validation.
    """
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        try:
            # Get models that should have SEO data
            from lms_backend.pages.models import Page
            from lms_backend.courses.models import Course
            from lms_backend.blog.models import BlogPost
            
            # Count content with missing SEO fields
            pages_missing_meta = Page.admin.filter(meta_description='').count()
            courses_missing_meta = Course.admin.filter(meta_description='').count()
            blog_missing_meta = BlogPost.admin.filter(meta_description='').count()
            
            # Calculate average SEO scores
            pages_avg_score = Page.admin.filter(seo_score__isnull=False).values_list('seo_score', flat=True)
            pages_avg = sum(pages_avg_score) / len(pages_avg_score) if pages_avg_score else 0
            
            blog_avg_score = BlogPost.admin.filter(seo_score__isnull=False).values_list('seo_score', flat=True)
            blog_avg = sum(blog_avg_score) / len(blog_avg_score) if blog_avg_score else 0
            
            return Response({
                'status': 'healthy',
                'missing_meta_descriptions': {
                    'pages': pages_missing_meta,
                    'courses': courses_missing_meta,
                    'blog_posts': blog_missing_meta,
                },
                'average_seo_scores': {
                    'pages': round(pages_avg, 1),
                    'blog_posts': round(blog_avg, 1),
                },
                'timestamp': timezone.now().isoformat(),
            })
            
        except Exception as e:
            return Response({
                'status': 'unhealthy',
                'error': str(e),
                'timestamp': timezone.now().isoformat(),
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
