import django_filters
from .models import Project

class ProjectFilter(django_filters.FilterSet):
    # traverse the many-to-many relationship on `categories`
    category = django_filters.CharFilter(field_name='categories__slug', lookup_expr='exact')
    tech = django_filters.CharFilter(field_name='tags__slug', lookup_expr='exact')
    year = django_filters.NumberFilter(field_name='year', lookup_expr='exact')

    class Meta:
        model = Project
        fields = []