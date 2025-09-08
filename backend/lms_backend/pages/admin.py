"""
Admin configuration for pages app.
"""

from django.contrib import admin
from django import forms
from tinymce.widgets import TinyMCE
from mptt.admin import MPTTModelAdmin
from .models import Page


class PageAdminForm(forms.ModelForm):
    class Meta:
        model = Page
        fields = '__all__'
        widgets = {
            'content': TinyMCE(attrs={'cols': 100, 'rows': 25}),
            # Keep custom_css/js as plain Textarea to avoid JS/CSS parsing in editor
        }


@admin.register(Page)
class PageAdmin(MPTTModelAdmin):
    """
    Admin configuration for Page model with MPTT tree structure.
    """
    form = PageAdminForm
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
            'fields': ('meta_title', 'meta_description', 'focus_keyword', 'secondary_keywords'),
            'classes': ('collapse',)
        }),
    )
