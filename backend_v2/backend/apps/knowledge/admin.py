# apps/knowledge/admin.py
from django.contrib import admin
from django.contrib.admin import TabularInline
from .models import Course, Lesson, ToolCategory, Tool, Resource

class LessonInline(TabularInline):
    model = Lesson
    extra = 1
    fields = ['title', 'order', 'video_url']
    ordering = ['order']

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title', 'difficulty', 'estimated_hours', 'featured', 'order']
    list_filter = ['difficulty', 'featured']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['order', 'featured']
    inlines = [LessonInline]

@admin.register(ToolCategory)
class ToolCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'order']
    search_fields = ['name']
    list_editable = ['order']

@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'featured', 'order']
    list_filter = ['category', 'featured']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['featured', 'order']
    autocomplete_fields = ['category']

@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ['title', 'resource_type', 'order']
    list_filter = ['resource_type']
    search_fields = ['title', 'description', 'tags']
    list_editable = ['order']