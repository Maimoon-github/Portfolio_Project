import django
from django.apps import apps
from django.conf import settings

print('DJANGO_SETTINGS_MODULE=', __import__('os').environ.get('DJANGO_SETTINGS_MODULE'))
print('settings loaded? INSTALLED_APPS count=', len(settings.INSTALLED_APPS))
print('sample apps=', settings.INSTALLED_APPS[:20])

django.setup()
print('app labels=', [app.label for app in apps.get_app_configs() if app.name.startswith('apps.')])
print('app names=', [app.name for app in apps.get_app_configs() if app.name.startswith('apps.')])
