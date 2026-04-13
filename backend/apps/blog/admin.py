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
    list_display = (
        "title",
        "category",
        "focus_keyword",
        "total_word_count",
        "reading_time",
        "first_published_at",
    )
    list_filter = ("category", "live")
    search_fields = ("title", "subtitle", "category", "focus_keyword")

    def total_word_count(self, obj: BlogDetailPage) -> int:
        return obj.total_word_count

    total_word_count.short_description = "Word count"


# Register with Wagtail admin
modeladmin_register(BlogDetailPageAdmin)