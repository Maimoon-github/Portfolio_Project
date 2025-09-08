"""
Authentication-specific URLs to match frontend expectations.
These endpoints provide a wrapper around JWT authentication
to match the /api/v1/auth/* pattern expected by the frontend.
"""

from django.urls import path
from . import auth_views

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(), name='auth_login'),
    path('logout/', auth_views.LogoutView.as_view(), name='auth_logout'),
    path('register/', auth_views.RegisterView.as_view(), name='auth_register'),
    path('refresh/', auth_views.RefreshTokenView.as_view(), name='auth_refresh'),
]
