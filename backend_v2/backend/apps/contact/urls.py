# apps/contact/urls.py
from django.urls import path
from .views import ContactCreateView

urlpatterns = [
    path('', ContactCreateView.as_view(), name='contact-submit'),
]