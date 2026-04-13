# backend/apps/blog/admin.py
"""
Admin configuration for the blog app.

Registers Wagtail pages with the admin interface and provides any custom
Wagtail admin customizations (e.g. extra panels, permissions, or list filters).
"""
from django.contrib import admin
from wagtail_modeladmin.options import ModelAdmin, modeladmin_register
from .models import BlogIndexPage, BlogDetailPage
 

class BlogDetailPageAdmin(ModelAdmin):
    """
    Custom Wagtail ModelAdmin for BlogDetailPage.
    Allows extra filtering and display options in the Wagtail page explorer.
    """
    model = BlogDetailPage
    menu_label = "Blog Posts"
    menu_icon = "doc-full"
    list_display = ("title", "category", "first_published_at", "reading_time")
    list_filter = ("category", "live")
    search_fields = ("title", "subtitle", "category")


# Register with Wagtail admin
modeladmin_register(BlogDetailPageAdmin)