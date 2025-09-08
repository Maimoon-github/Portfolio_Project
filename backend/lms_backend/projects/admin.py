"""
Admin configuration for projects app.
"""

from django.contrib import admin
from .models import Project, Technology


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    """
    Admin configuration for Technology model.
    """
    list_display = ['name', 'slug', 'icon']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['name']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """
    Admin configuration for Project model.
    """
    list_display = ['title', 'status', 'project_type', 'featured', 'published_at', 'created_at']
    list_filter = ['status', 'project_type', 'featured', 'tech_stack', 'created_at']
    search_fields = ['title', 'description', 'summary']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_at'
    ordering = ['-created_at']
    
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'status', 'featured')
        }),
        ('Content', {
            'fields': ('summary', 'description', 'thumbnail')
        }),
        ('Project Details', {
            'fields': ('project_type', 'tech_stack', 'github_url', 'live_url', 'demo_video', 'completion_date')
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
    
    filter_horizontal = ['tech_stack']
