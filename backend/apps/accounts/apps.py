# backend/apps/accounts/apps.py
"""
Accounts app configuration.
"""
from django.apps import AppConfig


class AccountsConfig(AppConfig):
    """
    Custom user model + JWT authentication layer.
    """
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.accounts"
    verbose_name = "Accounts"

    def ready(self) -> None:
        # import apps.accounts.signals  # noqa: F401
        pass