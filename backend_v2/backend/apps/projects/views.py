# apps/projects/views.py
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from core.permissions import IsAdminOrReadOnly
from .models import Project
from .serializers import ProjectListSerializer, ProjectDetailSerializer
from .filters import ProjectFilter

class ProjectListView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_class = ProjectFilter
    search_fields = ['title', 'description', 'content']
    ordering_fields = ['completion_date', 'title', 'is_featured']
    ordering = ['-completion_date']

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ProjectListSerializer
        return ProjectDetailSerializer

class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectDetailSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'