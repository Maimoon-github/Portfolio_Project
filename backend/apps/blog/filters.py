import django_filters
from .models import Post


class PostFilter(django_filters.FilterSet):
    """
    FilterSet for the Post model, used by APIPostListView.
    Allows filtering by category slug, tag slug, author ID, date range, and featured flag.
    The base queryset is already restricted to published posts.
    """
    category = django_filters.CharFilter(
        field_name='category__slug',
        lookup_expr='exact',
        help_text="Filter by category slug (exact match)."
    )
    tag = django_filters.CharFilter(
        field_name='tags__slug',
        lookup_expr='exact',
        help_text="Filter by tag slug (exact match)."
    )
    author = django_filters.NumberFilter(
        field_name='author__id',
        lookup_expr='exact',
        help_text="Filter by author ID."
    )
    published_after = django_filters.DateTimeFilter(
        field_name='publish_date',
        lookup_expr='gte',
        help_text="Filter posts published on or after this date (ISO format)."
    )
    published_before = django_filters.DateTimeFilter(
        field_name='publish_date',
        lookup_expr='lte',
        help_text="Filter posts published on or before this date (ISO format)."
    )
    featured = django_filters.BooleanFilter(
        field_name='featured',
        help_text="Filter by featured status (true/false)."
    )

    class Meta:
        model = Post
        fields = ['category', 'tag', 'author', 'published_after', 'published_before', 'featured']