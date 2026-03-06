from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

from core.permissions import IsAdminOrReadOnly
from core.pagination import StandardPagination
from .models import Project
from .serializers import ProjectListSerializer, ProjectDetailSerializer
from .filters import ProjectFilter

class ProjectListView(generics.ListAPIView):
    """
    List all projects with filtering and pagination.
    """
    queryset = Project.objects.all().order_by('-year')
    serializer_class = ProjectListSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = StandardPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProjectFilter

class ProjectDetailView(generics.RetrieveAPIView):
    """
    Retrieve a single project by slug.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectDetailSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'