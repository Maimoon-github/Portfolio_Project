from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

app_name = "api"

urlpatterns = [
    # documentation
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path("schema/swagger/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger"),

    # authentication endpoints
    path("v1/auth/token/", TokenObtainPairView.as_view(), name="token_obtain"),
    path("v1/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # versioned API, allows for future v2, etc.
    path(
        "v1/projects/",
        include(("apps.projects.urls", "projects"), namespace="projects"),
    ),
    path(
        "v1/blog/",
        include(("apps.blog.urls", "blog"), namespace="blog"),
    ),
    path(
        "v1/resume/",
        include(("apps.resume.urls", "resume"), namespace="resume"),
    ),
    path(
        "v1/contact/",
        include(("apps.contact.urls", "contact"), namespace="contact"),
    ),
    path(
        "v1/knowledge/",
        include(("apps.knowledge.urls", "knowledge"), namespace="knowledge"),
    ),
]
