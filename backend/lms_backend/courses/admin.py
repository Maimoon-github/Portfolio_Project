"""
Admin configuration for courses app.
"""

from django.contrib import admin
from .models import Category, Tag, Course, Lesson, Review


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """
    Admin configuration for Category model.
    """
    list_display = ['name', 'slug']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['name']


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    """
    Admin configuration for Tag model.
    """
    list_display = ['name', 'slug']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['name']


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    """
    Admin configuration for Course model.
    """
    list_display = ['title', 'status', 'level', 'is_free', 'price_cents', 'instructor', 'published_at', 'created_at']
    list_filter = ['status', 'level', 'is_free', 'categories', 'language', 'instructor', 'created_at']
    search_fields = ['title', 'subtitle', 'description']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_at'
    ordering = ['-created_at']
    
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'status', 'instructor')
        }),
        ('Course Content', {
            'fields': ('subtitle', 'description', 'cover_image', 'intro_video_url')
        }),
        ('Course Details', {
            'fields': ('level', 'language', 'duration_hours', 'categories', 'tags')
        }),
        ('Pricing', {
            'fields': ('is_free', 'price_cents', 'discount_price_cents')
        }),
        ('Requirements & Outcomes', {
            'fields': ('requirements', 'what_you_will_learn'),
            'classes': ('collapse',)
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
    
    filter_horizontal = ['categories', 'tags']


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    """
    Admin configuration for Lesson model.
    """
    list_display = ['title', 'course', 'order', 'duration_minutes', 'is_preview', 'created_at']
    list_filter = ['course', 'is_preview', 'created_at']
    search_fields = ['title', 'content', 'course__title']
    ordering = ['course', 'order']
    
    fieldsets = (
        (None, {
            'fields': ('course', 'title', 'slug', 'order')
        }),
        ('Content', {
            'fields': ('content', 'video_url', 'duration_minutes', 'is_preview')
        }),
    )


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    """
    Admin configuration for Review model.
    """
    list_display = ['course', 'user', 'rating', 'created_at']
    list_filter = ['rating', 'created_at']
    search_fields = ['course__title', 'user__username', 'comment']
    ordering = ['-created_at']
    
    fieldsets = (
        (None, {
            'fields': ('course', 'user', 'rating')
        }),
        ('Review Content', {
            'fields': ('comment',)
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['created_at']
