"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""





# from django.contrib import admin
# from django.urls import path, include, re_path
# from django.views.generic import TemplateView
# from django.views.generic.base import RedirectView   # ← added
# from django.conf import settings
# from django.conf.urls.static import static

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     # path('admin', RedirectView.as_view(url='/admin/', permanent=True)),  # redirects /admin → /admin/
#     path('api/projects/', include('apps.projects.urls')),
#     path('api/blog/', include('apps.blog.urls')),
#     path('api/resume/', include('apps.resume.urls')),
#     path('api/contact/', include('apps.contact.urls')),
#     path('api/knowledge/', include('apps.knowledge.urls')),
# ]

# if settings.DEBUG:
#     import debug_toolbar
#     urlpatterns = [
#         path('__debug__/', include(debug_toolbar.urls)),
#     ] + urlpatterns

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# # SPA catch‑all – must be last
# urlpatterns += [
#     re_path(r'^.*$', TemplateView.as_view(template_name='index.html'), name='spa'),
# ]





from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

# 1. Django Admin and API routes (MUST come first)
urlpatterns = [
    path('admin/', admin.site.urls),
    # path('admin', RedirectView.as_view(url='/admin/', permanent=True)), # Optional: uncomment if you want /admin to redirect to /admin/
    path('api/', include('api.urls')),
]

# 2. Debug Toolbar (only in DEBUG mode)
if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns  # Prepend toolbar URLs to keep them accessible

# 3. Media files serving (in development)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# # 4. SPA catch-all – MUST BE THE VERY LAST PATTERN
# urlpatterns += [
#     # re_path(r'^.*$', TemplateView.as_view(template_name='index.html'), name='spa'),
#     re_path(r'^(?!admin/).*$', TemplateView.as_view(template_name='index.html'), name='spa'),
# ]



# backend/urls.py – last line
urlpatterns += [
    re_path(r'^(?!(admin/|admin$)).*$', 
            TemplateView.as_view(template_name='index.html'), 
            name='spa'),
]