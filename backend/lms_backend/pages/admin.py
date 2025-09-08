"""
Admin configuration for pages app.
"""

from django.contrib import admin
from mptt.admin import MPTTModelAdmin
from .models import Page, PageSection, ContactSubmission


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


@admin.register(PageSection)
class PageSectionAdmin(admin.ModelAdmin):
    """
    Admin configuration for PageSection model.
    """
    list_display = ['title', 'page', 'section_type', 'order', 'is_active']
    list_filter = ['section_type', 'is_active', 'page']
    search_fields = ['title', 'content', 'page__title']
    ordering = ['page', 'order']
    
    fieldsets = (
        (None, {
            'fields': ('page', 'title', 'section_type', 'order', 'is_active')
        }),
        ('Content', {
            'fields': ('content', 'image', 'button_text', 'button_url')
        }),
    )


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    """
    Admin configuration for ContactSubmission model.
    """
    list_display = ['name', 'email', 'subject', 'created_at', 'is_read']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['created_at']
    ordering = ['-created_at']
    
    fieldsets = (
        (None, {
            'fields': ('name', 'email', 'subject', 'is_read')
        }),
        ('Message', {
            'fields': ('message',)
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
