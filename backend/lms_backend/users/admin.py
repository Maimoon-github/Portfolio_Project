"""
Admin configuration for users app.
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Profile


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """
    Admin configuration for custom User model.
    """
    list_display = ['username', 'email', 'role', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined']
    list_filter = ['role', 'is_staff', 'is_active', 'date_joined']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering = ['-date_joined']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {
            'fields': ('role',)
        }),
    )
    
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Additional Info', {
            'fields': ('email', 'role', 'first_name', 'last_name')
        }),
    )


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    """
    Admin configuration for Profile model.
    """
    list_display = ['user', 'bio_short', 'is_verified', 'created_at']
    list_filter = ['is_verified', 'skills', 'created_at']
    search_fields = ['user__username', 'user__email', 'bio', 'location', 'company']
    ordering = ['-created_at']
    
    fieldsets = (
        (None, {
            'fields': ('user',)
        }),
        ('Profile Information', {
            'fields': ('bio', 'avatar', 'cover_image', 'location', 'company', 'website', 'github_url', 'linkedin_url')
        }),
        ('Skills & Expertise', {
            'fields': ('skills', 'experience_years', 'specializations')
        }),
        ('Verification', {
            'fields': ('is_verified',)
        }),
    )
    
    def bio_short(self, obj):
        """Return truncated bio for list display."""
        return obj.bio[:50] + '...' if len(obj.bio) > 50 else obj.bio
    bio_short.short_description = 'Bio'
