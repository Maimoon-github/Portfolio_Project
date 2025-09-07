"""
Dashboard API views for content synchronization monitoring.
"""

from django.utils import timezone
from django.db.models import Count, Q
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from lms_backend.blog.models import BlogPost
from lms_backend.courses.models import Course
from lms_backend.projects.models import Project
from lms_backend.news.models import NewsItem
from lms_backend.pages.models import Page


class DashboardViewSet(viewsets.ViewSet):
    """
    API endpoints for admin dashboard and content synchronization monitoring.
    """
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    @action(detail=False, methods=['get'])
    def content_sync_status(self, request):
        """Monitor backend-frontend content synchronization."""
        now = timezone.now()
        
        # Get content counts by status
        content_stats = {
            'blog_posts': {
                'total': BlogPost.admin.count(),
                'published': BlogPost.published.count(),
                'draft': BlogPost.admin.filter(status='draft').count(),
                'featured': BlogPost.published.filter(featured=True).count(),
            },
            'courses': {
                'total': Course.admin.count(),
                'published': Course.published.count(),
                'draft': Course.admin.filter(status='draft').count(),
                'featured': Course.published.filter(featured=True).count(),
            },
            'projects': {
                'total': Project.admin.count(),
                'published': Project.published.count(),
                'draft': Project.admin.filter(status='draft').count(),
                'featured': Project.published.filter(featured=True).count(),
            },
            'news': {
                'total': NewsItem.admin.count(),
                'published': NewsItem.published.count(),
                'draft': NewsItem.admin.filter(status='draft').count(),
                'urgent': NewsItem.published.filter(priority='urgent').count(),
            },
            'pages': {
                'total': Page.admin.count(),
                'published': Page.published.count(),
                'draft': Page.admin.filter(status='draft').count(),
                'homepage_exists': Page.admin.filter(is_homepage=True).exists(),
            }
        }
        
        # Check for recent content updates
        last_hour = now - timezone.timedelta(hours=1)
        recent_updates = {
            'blog_posts': BlogPost.admin.filter(updated_at__gte=last_hour).count(),
            'courses': Course.admin.filter(updated_at__gte=last_hour).count(),
            'projects': Project.admin.filter(updated_at__gte=last_hour).count(),
            'news': NewsItem.admin.filter(updated_at__gte=last_hour).count(),
            'pages': Page.admin.filter(updated_at__gte=last_hour).count(),
        }
        
        # Check for pending publications (content with future publish dates)
        pending_publications = {
            'blog_posts': BlogPost.admin.filter(
                status='published',
                published_at__gt=now
            ).count(),
            'courses': Course.admin.filter(
                status='published',
                published_at__gt=now
            ).count(),
            'projects': Project.admin.filter(
                status='published',
                published_at__gt=now
            ).count(),
            'news': NewsItem.admin.filter(
                status='published',
                published_at__gt=now
            ).count(),
            'pages': Page.admin.filter(
                status='published',
                published_at__gt=now
            ).count(),
        }
        
        # Simulate sync status (this would integrate with your actual sync system)
        sync_status = {
            'last_sync': now.isoformat(),
            'sync_healthy': True,
            'sync_errors': [],
            'content_status_summary': content_stats,
            'recent_updates': recent_updates,
            'pending_publications': pending_publications,
        }
        
        return Response(sync_status)
    
    @action(detail=False, methods=['get'])
    def analytics_summary(self, request):
        """Get analytics summary for dashboard."""
        now = timezone.now()
        
        # Content published this month
        start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        this_month_stats = {
            'blog_posts': BlogPost.published.filter(published_at__gte=start_of_month).count(),
            'courses': Course.published.filter(published_at__gte=start_of_month).count(),
            'projects': Project.published.filter(published_at__gte=start_of_month).count(),
            'news': NewsItem.published.filter(published_at__gte=start_of_month).count(),
            'pages': Page.published.filter(published_at__gte=start_of_month).count(),
        }
        
        # SEO health check
        seo_stats = {
            'blog_posts_with_high_seo': BlogPost.published.filter(seo_score__gte=80).count(),
            'courses_with_high_seo': Course.published.filter(seo_score__gte=80).count(),
            'projects_with_high_seo': Project.published.filter(seo_score__gte=80).count(),
            'news_with_high_seo': NewsItem.published.filter(seo_score__gte=80).count(),
            'pages_with_high_seo': Page.published.filter(seo_score__gte=80).count(),
        }
        
        return Response({
            'content_published_this_month': this_month_stats,
            'seo_health': seo_stats,
            'overall_health': {
                'total_published_content': sum([
                    BlogPost.published.count(),
                    Course.published.count(),
                    Project.published.count(),
                    NewsItem.published.count(),
                    Page.published.count(),
                ]),
                'avg_seo_score': 85,  # This would be calculated from actual data
                'content_freshness': 'Good',  # Based on recent update patterns
            }
        })
    
    @action(detail=False, methods=['get'])
    def frontend_endpoints(self, request):
        """Get all available frontend API endpoints."""
        endpoints = {
            'blog': {
                'base_url': '/api/v1/blog/',
                'endpoints': {
                    'list_posts': 'GET /api/v1/blog/posts/',
                    'get_post': 'GET /api/v1/blog/posts/{slug}/',
                    'featured_posts': 'GET /api/v1/blog/posts/featured/',
                    'recent_posts': 'GET /api/v1/blog/posts/recent/',
                    'categories': 'GET /api/v1/blog/posts/categories/',
                    'tags': 'GET /api/v1/blog/posts/tags/',
                    'seo_preview': 'GET /api/v1/blog/posts/{slug}/seo_preview/',
                },
                'filters': ['category', 'tag', 'author', 'featured', 'published_after', 'published_before'],
                'search_fields': ['title', 'excerpt', 'content'],
                'ordering': ['-published_at', 'title', 'reading_time_minutes']
            },
            'courses': {
                'base_url': '/api/v1/courses/',
                'endpoints': {
                    'list_courses': 'GET /api/v1/courses/',
                    'get_course': 'GET /api/v1/courses/{slug}/',
                    'featured_courses': 'GET /api/v1/courses/featured/',
                    'free_courses': 'GET /api/v1/courses/free/',
                    'categories': 'GET /api/v1/courses/categories/',
                    'tags': 'GET /api/v1/courses/tags/',
                    'lessons': 'GET /api/v1/courses/lessons/',
                    'reviews': 'GET /api/v1/courses/reviews/',
                },
                'filters': ['category', 'tag', 'level', 'is_free', 'instructor', 'price_range'],
                'search_fields': ['title', 'description'],
                'ordering': ['-published_at', '-rating_avg', 'price_cents']
            },
            'projects': {
                'base_url': '/api/v1/projects/',
                'endpoints': {
                    'list_projects': 'GET /api/v1/projects/',
                    'get_project': 'GET /api/v1/projects/{slug}/',
                    'featured_projects': 'GET /api/v1/projects/featured/',
                    'recent_projects': 'GET /api/v1/projects/recent/',
                    'by_type': 'GET /api/v1/projects/by_type/',
                    'technologies': 'GET /api/v1/projects/technologies/',
                },
                'filters': ['tech_stack', 'project_type', 'difficulty', 'featured', 'completion_year'],
                'search_fields': ['title', 'summary', 'description'],
                'ordering': ['-featured', '-completion_date', 'title']
            },
            'news': {
                'base_url': '/api/v1/news/',
                'endpoints': {
                    'list_news': 'GET /api/v1/news/',
                    'get_news': 'GET /api/v1/news/{slug}/',
                    'featured_news': 'GET /api/v1/news/featured/',
                    'urgent_news': 'GET /api/v1/news/urgent/',
                    'recent_news': 'GET /api/v1/news/recent/',
                    'by_priority': 'GET /api/v1/news/by_priority/',
                    'categories': 'GET /api/v1/news/categories/',
                },
                'filters': ['category', 'priority', 'featured', 'published_after', 'published_before'],
                'search_fields': ['title', 'body'],
                'ordering': ['-priority', '-published_at', 'title']
            },
            'pages': {
                'base_url': '/api/v1/pages/',
                'endpoints': {
                    'list_pages': 'GET /api/v1/pages/',
                    'get_page': 'GET /api/v1/pages/{slug}/',
                    'navigation': 'GET /api/v1/pages/navigation/',
                    'homepage': 'GET /api/v1/pages/homepage/',
                    'sitemap': 'GET /api/v1/pages/sitemap/',
                },
                'filters': ['template', 'parent', 'show_in_menu', 'is_homepage'],
                'search_fields': ['title', 'content'],
                'ordering': ['page_order', 'title', '-published_at']
            },
            'dashboard': {
                'base_url': '/api/v1/dashboard/',
                'endpoints': {
                    'content_sync_status': 'GET /api/v1/dashboard/content-sync-status/',
                    'analytics_summary': 'GET /api/v1/dashboard/analytics-summary/',
                    'frontend_endpoints': 'GET /api/v1/dashboard/frontend-endpoints/',
                },
                'note': 'Requires admin authentication'
            }
        }
        
        return Response(endpoints)
    
    @action(detail=False, methods=['post'])
    def trigger_content_sync(self, request):
        """Trigger a manual content synchronization."""
        # This would trigger your actual sync process
        return Response({
            'message': 'Content synchronization triggered successfully',
            'sync_id': f'sync_{timezone.now().strftime("%Y%m%d_%H%M%S")}',
            'status': 'initiated'
        })
    
    @action(detail=False, methods=['get'])
    def health_check(self, request):
        """Comprehensive health check for the API and content system."""
        try:
            # Test database connectivity
            blog_count = BlogPost.published.count()
            course_count = Course.published.count()
            project_count = Project.published.count()
            news_count = NewsItem.published.count()
            page_count = Page.published.count()
            
            # Check if homepage exists
            homepage_exists = Page.published.filter(is_homepage=True).exists()
            
            health_status = {
                'status': 'healthy',
                'timestamp': timezone.now().isoformat(),
                'database': 'connected',
                'content_counts': {
                    'blog_posts': blog_count,
                    'courses': course_count,
                    'projects': project_count,
                    'news': news_count,
                    'pages': page_count,
                },
                'critical_checks': {
                    'homepage_exists': homepage_exists,
                    'has_published_content': (blog_count + course_count + project_count + news_count + page_count) > 0,
                },
                'api_version': '1.0.0',
                'environment': 'development'  # This would come from settings
            }
            
            return Response(health_status)
            
        except Exception as e:
            return Response(
                {
                    'status': 'unhealthy',
                    'error': str(e),
                    'timestamp': timezone.now().isoformat()
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
