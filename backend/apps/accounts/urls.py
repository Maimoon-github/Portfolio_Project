# backend/apps/accounts/urls.py
"""
Accounts URLs — all prefixed with /api/v1/auth/ in the root urls.py.
JWT tokens are stored in httpOnly cookies.
"""
from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register, name="auth-register"),
    path("login/", views.login, name="auth-login"),
    path("logout/", views.logout, name="auth-logout"),
    path("refresh/", views.refresh_token, name="auth-refresh"),
    path("me/", views.me, name="auth-me"),
    path("me/update/", views.update_profile, name="auth-update-profile"),
]