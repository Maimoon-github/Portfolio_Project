# apps/blog/filters.py
import django_filters
from .models import Post

class PostFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='category__slug', lookup_expr='iexact')
    tag = django_filters.CharFilter(field_name='tags__slug', lookup_expr='iexact')
    published_after = django_filters.DateFilter(field_name='published_date__date', lookup_expr='gte')
    published_before = django_filters.DateFilter(field_name='published_date__date', lookup_expr='lte')

    class Meta:
        model = Post
        fields = ['featured']