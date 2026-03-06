# apps/blog/views.py
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from .models import Post
from .serializers import PostListSerializer, PostDetailSerializer
from .filters import PostFilter

class PostListView(generics.ListAPIView):
    queryset = Post.objects.filter(published_date__lte=timezone.now())
    serializer_class = PostListSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_class = PostFilter
    search_fields = ['title', 'body', 'excerpt']
    ordering_fields = ['published_date', 'title', 'read_time']
    ordering = ['-published_date']

class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.filter(published_date__lte=timezone.now())
    serializer_class = PostDetailSerializer
    lookup_field = 'slug'

class RelatedPostsView(generics.GenericAPIView):
    queryset = Post.objects.filter(published_date__lte=timezone.now())
    serializer_class = PostListSerializer
    lookup_field = 'slug'

    def get(self, request, slug):
        post = self.get_object()
        # Posts in same category OR sharing any tag, exclude current post, limit 3
        related = Post.objects.filter(
            published_date__lte=timezone.now()
        ).exclude(
            id=post.id
        ).filter(
            models.Q(category=post.category) | models.Q(tags__in=post.tags.all())
        ).distinct().order_by('-published_date')[:3]
        serializer = self.get_serializer(related, many=True)
        return Response(serializer.data)