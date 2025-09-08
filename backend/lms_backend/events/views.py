"""
Views for event logging.
"""

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import EventLog
from .serializers import EventLogSerializer, EventLogListSerializer


class EventLogCreateView(generics.CreateAPIView):
    """
    API endpoint for logging events.
    Maps to /api/v1/events/log/ to match frontend expectations.
    """
    queryset = EventLog.objects.all()
    serializer_class = EventLogSerializer
    permission_classes = [permissions.AllowAny]  # Allow anonymous event logging
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            event_log = serializer.save()
            return Response(
                {"message": "Event logged successfully", "id": event_log.id}, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventLogListView(generics.ListAPIView):
    """
    API endpoint for viewing event logs (admin only).
    """
    queryset = EventLog.objects.all()
    serializer_class = EventLogListSerializer
    permission_classes = [permissions.IsAdminUser]
    filterset_fields = ['event_type', 'user', 'timestamp']
    ordering_fields = ['timestamp', 'event_type']
    ordering = ['-timestamp']
