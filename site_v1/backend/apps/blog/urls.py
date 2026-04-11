from django.urls import path
# from .views import PostListView, PostDetailView, RelatedPostsView
# from .views import PostListView, PostDetailView, APIRelatedPostsView
from . import views


app_name = 'blog'

urlpatterns = [
    # API endpoints (used under /api/ namespace)
    path('', views.APIPostListView.as_view(), name='post-list'),
    path('<slug:slug>/', views.APIPostDetailView.as_view(), name='post-detail'),
    path('<slug:slug>/related/', views.APIRelatedPostsView.as_view(), name='related-posts'),
    path("", views.PostListView.as_view(), name="post_list"),
    path("search/", views.PostSearchView.as_view(), name="post_search"),
    path("category/<slug:category_slug>/", views.CategoryPostListView.as_view(), name="category_posts"),
    path("tag/<slug:tag_slug>/", views.TagPostListView.as_view(), name="tag_posts"),
    # path('<slug:slug>/related/', RelatedPostsView.as_view(), name='related-posts'),
    # path('<slug:slug>/', PostDetailView.as_view(), name='post-detail'),
]