"""
Serializers for event logging.
"""

from rest_framework import serializers
from .models import EventLog


class EventLogSerializer(serializers.ModelSerializer):
    """
    Serializer for creating event logs.
    """
    
    class Meta:
        model = EventLog
        fields = [
            'event_type', 
            'event_name', 
            'data', 
            'session_id',
            'timestamp'
        ]
        read_only_fields = ['timestamp']
    
    def create(self, validated_data):
        # Add user from request context if available
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            validated_data['user'] = request.user
        
        # Add IP address and user agent from request
        if request:
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                validated_data['ip_address'] = x_forwarded_for.split(',')[0]
            else:
                validated_data['ip_address'] = request.META.get('REMOTE_ADDR')
            
            validated_data['user_agent'] = request.META.get('HTTP_USER_AGENT', '')
        
        return super().create(validated_data)


class EventLogListSerializer(serializers.ModelSerializer):
    """
    Serializer for listing event logs (with user info).
    """
    user = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = EventLog
        fields = [
            'id',
            'user',
            'event_type',
            'event_name',
            'data',
            'timestamp',
            'session_id',
            'ip_address'
        ]
