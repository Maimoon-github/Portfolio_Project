from django.apps import AppConfig


class ProjectsConfig(AppConfig):
    name = 'apps.projects'
    default_auto_field = 'django.db.models.BigAutoField'

    def ready(self):
        # Import signal handlers here to avoid circular imports
        # Example: from . import signals
        pass