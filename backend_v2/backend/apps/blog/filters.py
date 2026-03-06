import django_filters
from .models import Post

class PostFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='category__slug', lookup_expr='exact')
    tag = django_filters.CharFilter(field_name='tags__slug', lookup_expr='exact')
    date = django_filters.DateFromToRangeFilter(field_name='published_date')
    q = django_filters.CharFilter(method='search_filter', label='Search')

    class Meta:
        model = Post
        fields = []

    def search_filter(self, queryset, name, value):
        """Search in title and body."""
        return queryset.filter(
            models.Q(title__icontains=value) |
            models.Q(body__icontains=value)
        )