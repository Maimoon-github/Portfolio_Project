"""
Models for event logging.
"""

from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()


class EventLog(models.Model):
    """
    Model to store user activity events for analytics and monitoring.
    """
    EVENT_TYPES = [
        ('page_view', 'Page View'),
        ('content_view', 'Content View'),
        ('user_action', 'User Action'),
        ('api_call', 'API Call'),
        ('error', 'Error'),
        ('performance', 'Performance'),
    ]
    
    user = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        help_text="User who triggered the event (null for anonymous users)"
    )
    event_type = models.CharField(
        max_length=50, 
        choices=EVENT_TYPES,
        help_text="Type of event being logged"
    )
    event_name = models.CharField(
        max_length=100,
        help_text="Specific name of the event"
    )
    data = models.JSONField(
        default=dict,
        blank=True,
        help_text="Additional event data in JSON format"
    )
    timestamp = models.DateTimeField(
        default=timezone.now,
        help_text="When the event occurred"
    )
    session_id = models.CharField(
        max_length=100,
        blank=True,
        help_text="Session identifier for tracking user sessions"
    )
    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True,
        help_text="IP address of the user"
    )
    user_agent = models.TextField(
        blank=True,
        help_text="User agent string from the browser"
    )
    
    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['event_type', 'timestamp']),
            models.Index(fields=['user', 'timestamp']),
            models.Index(fields=['timestamp']),
        ]
    
    def __str__(self):
        user_info = f"{self.user.username}" if self.user else "Anonymous"
        return f"{self.event_type}: {self.event_name} - {user_info} at {self.timestamp}"
