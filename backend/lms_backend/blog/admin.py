"""
Admin configuration for blog app.
"""

from django.contrib import admin
from .models import BlogPost


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    """
    Admin configuration for BlogPost model.
    """
    list_display = ['title', 'status', 'featured', 'author', 'published_at', 'created_at']
    list_filter = ['status', 'featured', 'categories', 'tags', 'author', 'created_at']
    search_fields = ['title', 'excerpt', 'content', 'author__username']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_at'
    ordering = ['-created_at']
    
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'status', 'featured')
        }),
        ('Content', {
            'fields': ('excerpt', 'content', 'cover_image')
        }),
        ('Metadata', {
            'fields': ('author', 'categories', 'tags', 'reading_time_minutes', 'allow_comments')
        }),
        ('Publishing', {
            'fields': ('published_at',),
            'classes': ('collapse',)
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description', 'meta_keywords'),
            'classes': ('collapse',)
        }),
    )
    
    filter_horizontal = ['categories', 'tags']
