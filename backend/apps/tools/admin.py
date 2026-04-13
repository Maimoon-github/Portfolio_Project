# backend/apps/tools/admin.py
"""
Admin configuration for the tools app.

Registers Tool pages in Wagtail admin and provides custom list views/filters.
"""
from django.contrib import admin
from wagtail_modeladmin.options import ModelAdmin, modeladmin_register
from .models import ToolIndexPage, ToolDetailPage
 

class ToolDetailPageAdmin(ModelAdmin):
    """
    Custom admin for ToolDetailPage.
    """
    model = ToolDetailPage
    menu_label = "Calculator Tools"
    menu_icon = "calculator"
    list_display = ("title", "category", "calculator_slug", "is_featured")
    list_filter = ("category", "is_featured")
    search_fields = ("title", "calculator_slug")


modeladmin_register(ToolDetailPageAdmin)