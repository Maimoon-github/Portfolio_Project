# apps/projects/filters.py
import django_filters
from .models import Project

class ProjectFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='categories__slug', lookup_expr='iexact')
    tech = django_filters.CharFilter(field_name='tech_tags__slug', lookup_expr='iexact')
    year = django_filters.NumberFilter(field_name='completion_date__year')

    class Meta:
        model = Project
        fields = ['is_featured']