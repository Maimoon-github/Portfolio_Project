"""
Admin configuration for news app.
"""

from django.contrib import admin
from .models import NewsItem, NewsCategory


@admin.register(NewsCategory)
class NewsCategoryAdmin(admin.ModelAdmin):
    """
    Admin configuration for NewsCategory model.
    """
    list_display = ['name', 'slug']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['name']


@admin.register(NewsItem)
class NewsItemAdmin(admin.ModelAdmin):
    """
    Admin configuration for NewsItem model.
    """
    list_display = ['title', 'status', 'priority', 'category', 'featured', 'published_at', 'created_at']
    list_filter = ['status', 'priority', 'category', 'featured', 'created_at']
    search_fields = ['title', 'excerpt', 'body']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_at'
    ordering = ['-created_at']
    
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'status', 'featured')
        }),
        ('Content', {
            'fields': ('excerpt', 'body', 'cover_image')
        }),
        ('Categorization', {
            'fields': ('category', 'priority', 'external_url')
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
