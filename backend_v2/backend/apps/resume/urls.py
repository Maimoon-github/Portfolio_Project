from django.urls import path
from .views import ResumeView

urlpatterns = [
    path('', ResumeView.as_view(), name='resume'),
] 