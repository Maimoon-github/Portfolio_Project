# apps/projects/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProjectListView.as_view(), name='project-list'),
    path('<slug:slug>/', views.ProjectDetailView.as_view(), name='project-detail'),
]