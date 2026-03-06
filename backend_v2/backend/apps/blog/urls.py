from django.urls import path
from .views import PostListView, PostDetailView, RelatedPostsView

urlpatterns = [
    path('', PostListView.as_view(), name='post-list'),
    path('<slug:slug>/related/', RelatedPostsView.as_view(), name='post-related'),
    path('<slug:slug>/', PostDetailView.as_view(), name='post-detail'),
]