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
    list_display = ['user', 'bio_short', 'location']
    list_filter = ['location']
    search_fields = ['user__username', 'user__email', 'bio', 'location']
    ordering = ['user__username']
    
    fieldsets = (
        (None, {
            'fields': ('user',)
        }),
        ('Profile Information', {
            'fields': ('bio', 'avatar', 'headline', 'location', 'website', 'social_links', 'timezone')
        }),
    )
    
    def bio_short(self, obj):
        """Return truncated bio for list display."""
        return obj.bio[:50] + '...' if len(obj.bio) > 50 else obj.bio
    bio_short.short_description = 'Bio'
