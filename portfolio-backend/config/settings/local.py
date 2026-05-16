from .base import *

DEBUG = True
ALLOWED_HOSTS = ['*']

# DATABASES = { ... }   # only if you want to override

WAGTAILADMIN_BASE_URL = 'http://127.0.0.1:8000'


# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'portfolio_db',
#         'USER': 'postgres',
#         'PASSWORD': 'your_password',
#         'HOST': 'localhost',
#         'PORT': '5432',
#     }
# }