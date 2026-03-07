from django.urls import path
from .views import ProjectListView, ProjectDetailView

app_name = 'projects'

urlpatterns = [
    path('', ProjectListView.as_view(), name='project-list'),
    path('<slug:slug>/', ProjectDetailView.as_view(), name='project-detail'),
]