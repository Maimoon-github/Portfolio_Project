import os

from .base import *  # Import everything from base first
from django.core.exceptions import ImproperlyConfigured

# Choose environment based on ENV variable (default to local for development)
ENVIRONMENT = os.getenv('DJANGO_ENV', 'local')

if ENVIRONMENT == 'production':
    from .production import *
elif ENVIRONMENT == 'local':
    from .local import *
else:
    raise ImproperlyConfigured(f"Unknown DJANGO_ENV: {ENVIRONMENT}")