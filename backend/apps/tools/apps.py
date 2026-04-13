# backend/apps/tools/apps.py
"""
Tools app configuration.
"""
from django.apps import AppConfig


class ToolsConfig(AppConfig):
    """
    Tools app managing Wagtail CMS content pages for online calculators.
    Each ToolDetailPage has a calculator_slug that identifies the corresponding
    React component and backend compute function. Calculator business logic
    lives in apps/tools/calculators/ as pure Python — zero Django dependencies for testability.
    """
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.tools"
    verbose_name = "Tools & Calculators"

    def ready(self) -> None:
        # import apps.tools.signals  # noqa: F401
        pass