# backend/apps/tools/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("compute/<slug:calculator_slug>/", views.compute, name="tool-compute"),
]