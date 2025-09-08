"""
Admin configuration for events app.
"""

from django.contrib import admin
from .models import EventLog


@admin.register(EventLog)
class EventLogAdmin(admin.ModelAdmin):
    """
    Admin configuration for EventLog model.
    """
    list_display = ['event_type', 'event_name', 'user', 'timestamp', 'ip_address']
    list_filter = ['event_type', 'timestamp', 'user']
    search_fields = ['event_name', 'user__username', 'user__email', 'data']
    readonly_fields = ['timestamp', 'ip_address', 'user_agent']
    date_hierarchy = 'timestamp'
    ordering = ['-timestamp']
    
    fieldsets = (
        (None, {
            'fields': ('event_type', 'event_name', 'user', 'session_id')
        }),
        ('Data', {
            'fields': ('data',),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('timestamp', 'ip_address', 'user_agent'),
            'classes': ('collapse',)
        }),
    )
