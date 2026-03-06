import django_filters
from .models import Project

class ProjectFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='projectcategory__slug', lookup_expr='exact')
    tech = django_filters.CharFilter(field_name='tech_tags__slug', lookup_expr='exact')
    year = django_filters.NumberFilter(field_name='year', lookup_expr='exact')

    class Meta:
        model = Project
        fields = []