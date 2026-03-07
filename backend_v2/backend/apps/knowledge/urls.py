# apps/knowledge/urls.py
from django.urls import path
from .views import (
    CourseListView, CourseDetailView, ToolListView, ResourceListView,
    KnowledgeOverviewView
)

app_name = 'knowledge'

urlpatterns = [
    # aggregated endpoint used by the React frontend
    path('', KnowledgeOverviewView.as_view(), name='knowledge-overview'),

    path('courses/', CourseListView.as_view(), name='course-list'),
    path('courses/<slug:slug>/', CourseDetailView.as_view(), name='course-detail'),
    path('tools/', ToolListView.as_view(), name='tool-list'),
    path('resources/', ResourceListView.as_view(), name='resource-list'),
]