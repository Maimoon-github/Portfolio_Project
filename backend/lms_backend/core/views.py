"""
Views for SEO functionality.
"""

from django.http import HttpResponse
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from lms_backend.pages.models import Page
from lms_backend.courses.models import Course
from lms_backend.blog.models import BlogPost
from lms_backend.projects.models import Project
from lms_backend.news.models import NewsItem

from .seo import (
    generate_page_schema, 
    generate_course_schema,
    generate_blog_schema,
    generate_project_schema
)


class SEOPreviewView(APIView):
    """
    API endpoint for SEO preview data for social media sharing.
    """
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def get(self, request, model, slug):
        """Get SEO preview data for the specified model and slug."""
        
        content_obj = None
        schema_json = None
        
        # Get the appropriate model instance based on the model type
        if model == 'pages':
            content_obj = Page.admin.filter(slug=slug).first()
            if content_obj:
                schema_json = generate_page_schema(content_obj, request)
                
        elif model == 'courses':
            content_obj = Course.admin.filter(slug=slug).first()
            if content_obj:
                schema_json = generate_course_schema(content_obj, request)
                
        elif model == 'blog':
            content_obj = BlogPost.admin.filter(slug=slug).first()
            if content_obj:
                schema_json = generate_blog_schema(content_obj, request)
                
        elif model == 'projects':
            content_obj = Project.admin.filter(slug=slug).first()
            if content_obj:
                schema_json = generate_project_schema(content_obj, request)
                
        elif model == 'news':
            content_obj = NewsItem.admin.filter(slug=slug).first()
        
        if not content_obj:
            return Response({"error": f"No {model} found with slug: {slug}"}, status=404)
        
        # Build the response data
        response_data = {
            "title": content_obj.meta_title or content_obj.title,
            "description": content_obj.meta_description,
            "og_image": content_obj.og_image.url if content_obj.og_image else None,
            "focus_keyword": content_obj.focus_keyword,
            "secondary_keywords": content_obj.secondary_keywords,
            "readability_score": content_obj.readability_score,
            "seo_score": content_obj.seo_score,
            "social_media_title": content_obj.social_media_title,
            "social_media_description": content_obj.social_media_description,
            "twitter_card_type": content_obj.twitter_card_type,
            "schema_json": schema_json,
        }
        
        return Response(response_data)


class RobotsTxtView(APIView):
    """
    Generate a dynamic robots.txt file.
    """
    
    def get(self, request):
        """Return the robots.txt content."""
        
        lines = [
            "User-agent: *",
            "Allow: /",
            "Disallow: /admin/",
            f"Sitemap: {request.scheme}://{request.get_host()}/sitemap.xml",
        ]
        
        # Allow disallowing specific paths in production
        if not settings.DEBUG:
            disallow_paths = getattr(settings, 'ROBOTS_DISALLOW_PATHS', [])
            for path in disallow_paths:
                lines.append(f"Disallow: {path}")
        
        return HttpResponse("\n".join(lines), content_type="text/plain")
