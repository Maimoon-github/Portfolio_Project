from django.urls import include, path

app_name = "api"

urlpatterns = [
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
