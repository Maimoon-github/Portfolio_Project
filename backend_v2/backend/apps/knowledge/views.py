# apps/knowledge/views.py
from rest_framework import generics
from django.db.models import Count
from core.permissions import IsAdminOrReadOnly
from core.pagination import StandardPagination
from .models import Course, Tool, Resource
from .serializers import (
    CourseListSerializer, CourseDetailSerializer,
    ToolSerializer, ResourceSerializer, KnowledgeSerializer
)

class CourseListView(generics.ListAPIView):
    queryset = Course.objects.annotate(lesson_count=Count('lessons')).order_by('difficulty', 'order')
    serializer_class = CourseListSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = StandardPagination

class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.prefetch_related('lessons')
    serializer_class = CourseDetailSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'

class ToolListView(generics.ListAPIView):
    queryset = Tool.objects.select_related('category').order_by('category__order', 'order', 'name')
    serializer_class = ToolSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = None  # return full dataset for client-side filtering

class ResourceListView(generics.ListAPIView):
    queryset = Resource.objects.all().order_by('order', 'title')
    serializer_class = ResourceSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = StandardPagination


class KnowledgeOverviewView(generics.GenericAPIView):
    """Simple read-only endpoint that returns both courses and tools.

    This matches the frontend expectation of a single
    `/api/knowledge/` payload containing the two collections.  It keeps the
    existing individual `/courses/` and `/tools/` endpoints for more granular
    access or future pagination.
    """
    serializer_class = KnowledgeSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get(self, request, *args, **kwargs):
        courses = Course.objects.annotate(lesson_count=Count('lessons')).order_by('difficulty', 'order')
        tools = Tool.objects.select_related('category').order_by('category__order', 'order', 'name')
        data = {'courses': courses, 'tools': tools}
        serializer = self.get_serializer(data)
        return Response(serializer.data)