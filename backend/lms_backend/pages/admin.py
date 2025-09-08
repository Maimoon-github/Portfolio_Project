"""
Admin configuration for pages app.
"""

from django.contrib import admin
from mptt.admin import MPTTModelAdmin
from .models import Page


@admin.register(Page)
class PageAdmin(MPTTModelAdmin):
    """
    Admin configuration for Page model with MPTT tree structure.
    """
    list_display = ['title', 'status', 'template', 'parent', 'is_homepage', 'published_at', 'created_at']
    list_filter = ['status', 'template', 'is_homepage', 'created_at']
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}
    mptt_level_indent = 20
    ordering = ['tree_id', 'lft']
    
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'status', 'parent')
        }),
        ('Content', {
            'fields': ('content', 'template', 'is_homepage', 'custom_css', 'custom_js')
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
