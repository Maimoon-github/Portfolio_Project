# apps/resume/urls.py
from django.urls import path
from .views import ResumeView

app_name = 'resume'

urlpatterns = [
    path('', ResumeView.as_view(), name='resume-detail'),
]