from django.utils import timezone
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

from core.permissions import IsAdminOrReadOnly
from core.pagination import StandardPagination
from .models import Post
from .serializers import PostListSerializer, PostDetailSerializer
from .filters import PostFilter

class PostListView(generics.ListAPIView):
    """
    List published posts with filtering and pagination.
    """
    queryset = Post.objects.filter(published_date__lte=timezone.now())
    serializer_class = PostListSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = StandardPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = PostFilter

class PostDetailView(generics.RetrieveAPIView):
    """
    Retrieve a single published post by slug.
    """
    queryset = Post.objects.filter(published_date__lte=timezone.now())
    serializer_class = PostDetailSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'

class RelatedPostsView(generics.ListAPIView):
    """
    List up to 3 related posts based on shared categories or tags.
    """
    serializer_class = PostListSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        post = generics.get_object_or_404(
            Post.objects.filter(published_date__lte=timezone.now()),
            slug=self.kwargs['slug']
        )
        # Find posts in same categories or tags, excluding current post
        related = Post.objects.filter(
            published_date__lte=timezone.now()
        ).exclude(pk=post.pk).filter(
            models.Q(category__in=post.categories.all()) |
            models.Q(tags__in=post.tags.all())
        ).distinct().order_by('-published_date')[:3]
        return related