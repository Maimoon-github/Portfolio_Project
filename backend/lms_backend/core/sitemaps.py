"""
Sitemaps for the LMS backend.
"""

from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from lms_backend.pages.models import Page
from lms_backend.courses.models import Course
from lms_backend.blog.models import BlogPost
from lms_backend.projects.models import Project
from lms_backend.news.models import NewsItem


class PageSitemap(Sitemap):
    """Sitemap for Pages."""
    changefreq = "weekly"
    
    def items(self):
        return Page.published.all()
    
    def lastmod(self, obj):
        return obj.updated_at
    
    def priority(self, obj):
        if obj.is_homepage:
            return 1.0
        elif obj.parent is None:  # Top-level pages
            return 0.8
        return 0.6


class CourseSitemap(Sitemap):
    """Sitemap for Courses."""
    changefreq = "weekly"
    priority = 0.7
    
    def items(self):
        return Course.published.all()
    
    def lastmod(self, obj):
        return obj.updated_at


class BlogSitemap(Sitemap):
    """Sitemap for Blog posts."""
    changefreq = "weekly"
    priority = 0.7
    
    def items(self):
        return BlogPost.published.all()
    
    def lastmod(self, obj):
        return obj.updated_at


class ProjectSitemap(Sitemap):
    """Sitemap for Projects."""
    changefreq = "monthly"
    priority = 0.6
    
    def items(self):
        return Project.published.all()
    
    def lastmod(self, obj):
        return obj.updated_at


class NewsSitemap(Sitemap):
    """Sitemap for News items."""
    changefreq = "daily"
    priority = 0.5
    
    def items(self):
        return NewsItem.published.all()
    
    def lastmod(self, obj):
        return obj.updated_at


class StaticViewSitemap(Sitemap):
    """Sitemap for static views."""
    priority = 0.4
    changefreq = "monthly"
    
    def items(self):
        return ['home', 'about', 'contact']
    
    def location(self, item):
        return reverse(item)


# Complete sitemap dictionary
sitemaps = {
    'pages': PageSitemap,
    'courses': CourseSitemap,
    'blog': BlogSitemap,
    'projects': ProjectSitemap,
    'news': NewsSitemap,
    'static': StaticViewSitemap,
}
