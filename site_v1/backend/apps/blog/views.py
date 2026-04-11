import django_filters
from django.conf import settings
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.views.generic import DetailView, ListView
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

from core.permissions import IsAdminOrReadOnly
from core.pagination import StandardPagination
from .models import Category, Post, Tag
from .serializers import PostListSerializer, PostDetailSerializer
from .filters import PostFilter

# ----------------------------------------------------------------------
# API Views (DRF)
# ----------------------------------------------------------------------

class APIPostListView(generics.ListAPIView):
    queryset = Post.published.all()
    serializer_class = PostListSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = StandardPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = PostFilter

    def get_queryset(self):
        qs = super().get_queryset()
        print(f"API queryset count: {qs.count()}")
        for p in qs[:3]:
            print(f"  - {p.title} (id={p.id}, slug={p.slug}, published={p.publish_date})")
        return qs


class APIPostDetailView(generics.RetrieveAPIView):
    """
    Retrieve a single published post by slug (API endpoint).
    """
    queryset = Post.published.all()
    serializer_class = PostDetailSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'


class APIRelatedPostsView(generics.ListAPIView):
    """
    List up to 3 related posts based on shared category or tags (API endpoint).
    """
    serializer_class = PostListSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        # Get the current post using the published manager
        post = get_object_or_404(
            Post.published.all(),
            slug=self.kwargs['slug']
        )
        # Find posts in the same category or sharing any tag, exclude current post
        related = Post.published.filter(
            Q(category=post.category) | Q(tags__in=post.tags.all())
        ).exclude(pk=post.pk).distinct().order_by('-publish_date')[:3]
        return related


# ----------------------------------------------------------------------
# Web Views (Django Template Views)
# ----------------------------------------------------------------------

class PostListView(ListView):
    """Published posts with pagination (web)."""

    model = Post
    template_name = "blog/post_list.html"
    context_object_name = "posts"
    paginate_by = getattr(settings, "POSTS_PER_PAGE", 10)

    def get_queryset(self):
        return (
            Post.published.all()
            .select_related("author", "category")
            .prefetch_related("tags")
        )

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_title"] = "Latest Posts"
        context["categories"] = Category.objects.all()
        return context


class PostDetailView(DetailView):
    """Single post view with comment display and view counting (web)."""

    model = Post
    template_name = "blog/post_detail.html"
    context_object_name = "post"

    def get_queryset(self):
        # Staff can preview drafts; everyone else sees published only
        if self.request.user.is_staff:
            return Post.objects.select_related("author", "category").prefetch_related("tags")
        return Post.published.select_related("author", "category").prefetch_related("tags")

    def get_object(self, queryset=None):
        obj = super().get_object(queryset)
        obj.increment_views()
        return obj

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["comments"] = (
            self.object.comments.filter(approved=True)
            .select_related("user")
            .order_by("-created_at")
        )
        context["related_posts"] = (
            Post.published.filter(category=self.object.category)
            .exclude(pk=self.object.pk)
            .select_related("author")[:4]
        )
        return context


class CategoryPostListView(ListView):
    """Posts filtered by category (web)."""

    model = Post
    template_name = "blog/post_list.html"
    context_object_name = "posts"
    paginate_by = getattr(settings, "POSTS_PER_PAGE", 10)

    def get_queryset(self):
        self.category = get_object_or_404(Category, slug=self.kwargs["category_slug"])
        return (
            Post.published.filter(category=self.category)
            .select_related("author", "category")
            .prefetch_related("tags")
        )

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_title"] = f"Category: {self.category.name}"
        context["current_category"] = self.category
        context["categories"] = Category.objects.all()
        return context


class TagPostListView(ListView):
    """Posts filtered by tag (web)."""

    model = Post
    template_name = "blog/post_list.html"
    context_object_name = "posts"
    paginate_by = getattr(settings, "POSTS_PER_PAGE", 10)

    def get_queryset(self):
        self.tag = get_object_or_404(Tag, slug=self.kwargs["tag_slug"])
        return (
            Post.published.filter(tags=self.tag)
            .select_related("author", "category")
            .prefetch_related("tags")
        )

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_title"] = f"Tag: {self.tag.name}"
        context["current_tag"] = self.tag
        context["categories"] = Category.objects.all()
        return context


class PostSearchView(ListView):
    """Full-text search across title, content, and excerpt (web)."""

    model = Post
    template_name = "blog/post_list.html"
    context_object_name = "posts"
    paginate_by = getattr(settings, "POSTS_PER_PAGE", 10)

    def get_queryset(self):
        query = self.request.GET.get("q", "").strip()
        if not query:
            return Post.published.none()
        return (
            Post.published.filter(
                Q(title__icontains=query)
                | Q(content__icontains=query)
                | Q(excerpt__icontains=query)
            )
            .select_related("author", "category")
            .prefetch_related("tags")
            .distinct()
        )

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        query = self.request.GET.get("q", "")
        context["page_title"] = f'Search results for "{query}"'
        context["search_query"] = query
        context["categories"] = Category.objects.all()
        return context