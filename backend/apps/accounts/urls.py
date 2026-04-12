from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register, name="auth-register"),
    path("login/", views.login, name="auth-login"),
    path("logout/", views.logout, name="auth-logout"),
    path("refresh/", views.refresh_token, name="auth-refresh"),
    path("me/", views.me, name="auth-me"),
]