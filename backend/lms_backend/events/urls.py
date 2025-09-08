"""
URLs for event logging endpoints.
"""

from django.urls import path
from .views import EventLogCreateView, EventLogListView

urlpatterns = [
    path('log/', EventLogCreateView.as_view(), name='event_log_create'),
    path('', EventLogListView.as_view(), name='event_log_list'),
]
