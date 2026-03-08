from django.urls import path
from .views import PostListView, PostDetailView, RelatedPostsView

app_name = 'blog'

urlpatterns = [
    path("", views.PostListView.as_view(), name="post_list"),
    path("search/", views.PostSearchView.as_view(), name="post_search"),
    path("category/<slug:category_slug>/", views.CategoryPostListView.as_view(), name="category_posts"),
    path("tag/<slug:tag_slug>/", views.TagPostListView.as_view(), name="tag_posts"),
    path('<slug:slug>/related/', RelatedPostsView.as_view(), name='related-posts'),
    path('<slug:slug>/', PostDetailView.as_view(), name='post-detail'),
]