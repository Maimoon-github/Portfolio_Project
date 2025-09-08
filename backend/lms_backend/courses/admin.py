"""
Admin configuration for courses app.
"""

from django.contrib import admin
from django import forms
from tinymce.widgets import TinyMCE
from .models import Category, Tag, Course, Lesson, Review, Enrollment, LessonCompletion


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


class CourseAdminForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = '__all__'
        widgets = {
            'description': TinyMCE(attrs={'cols': 100, 'rows': 25}),
            'prerequisites': TinyMCE(attrs={'cols': 100, 'rows': 15}),
        }


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    """
    Admin configuration for Course model.
    """
    form = CourseAdminForm
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
            'fields': ('subtitle', 'description', 'thumbnail')
        }),
        ('Course Details', {
            'fields': ('level', 'language', 'duration_hours', 'categories', 'tags')
        }),
        ('Pricing', {
            'fields': ('is_free', 'price_cents')
        }),
        ('Requirements & Outcomes', {
            'fields': ('prerequisites', 'learning_outcomes'),
            'classes': ('collapse',)
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
    
    filter_horizontal = ['categories', 'tags']


class LessonAdminForm(forms.ModelForm):
    class Meta:
        model = Lesson
        fields = '__all__'
        widgets = {
            'content': TinyMCE(attrs={'cols': 100, 'rows': 25}),
        }


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    """
    Admin configuration for Lesson model.
    """
    form = LessonAdminForm
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


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    """
    Admin configuration for Enrollment model.
    """
    list_display = ['user', 'course', 'status', 'progress_percent', 'enrolled_at']
    list_filter = ['status', 'enrolled_at']
    search_fields = ['user__username', 'user__email', 'course__title']
    ordering = ['-enrolled_at']
    readonly_fields = ['enrolled_at', 'completed_at']


@admin.register(LessonCompletion)
class LessonCompletionAdmin(admin.ModelAdmin):
    """
    Admin configuration for LessonCompletion model.
    """
    list_display = ['user', 'lesson', 'completed_at']
    list_filter = ['completed_at', 'lesson__course']
    search_fields = ['user__username', 'lesson__title', 'lesson__course__title']
    ordering = ['-completed_at']
    readonly_fields = ['completed_at']
