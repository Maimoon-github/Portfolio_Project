from django.urls import path

from . import views

app_name = "blog"

urlpatterns = [
    path("", views.PostListView.as_view(), name="post_list"),
    path("search/", views.PostSearchView.as_view(), name="post_search"),
    path("category/<slug:category_slug>/", views.CategoryPostListView.as_view(), name="category_posts"),
    path("tag/<slug:tag_slug>/", views.TagPostListView.as_view(), name="tag_posts"),
    # Post detail — last to avoid slug conflicts with above routes
    path("<slug:slug>/", views.PostDetailView.as_view(), name="post_detail"),
]
