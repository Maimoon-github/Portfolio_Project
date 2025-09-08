"""
Admin configuration for news app.
"""

from django.contrib import admin
from django import forms
from tinymce.widgets import TinyMCE
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


class NewsItemAdminForm(forms.ModelForm):
    class Meta:
        model = NewsItem
        fields = '__all__'
        widgets = {
            'body': TinyMCE(attrs={'cols': 100, 'rows': 25}),
        }


@admin.register(NewsItem)
class NewsItemAdmin(admin.ModelAdmin):
    """
    Admin configuration for NewsItem model.
    """
    form = NewsItemAdminForm
    list_display = ['title', 'status', 'priority', 'category', 'featured', 'published_at', 'created_at']
    list_filter = ['status', 'priority', 'category', 'featured', 'created_at']
    search_fields = ['title', 'body']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_at'
    ordering = ['-created_at']
    
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'status', 'featured')
        }),
        ('Content', {
            'fields': ('body',)
        }),
        ('Categorization', {
            'fields': ('category', 'priority', 'source_url', 'source_name')
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
