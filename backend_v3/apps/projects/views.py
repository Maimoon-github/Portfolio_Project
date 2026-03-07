from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

from core.permissions import IsAdminOrReadOnly
from core.pagination import StandardPagination
from .models import Project
from .serializers import ProjectListSerializer, ProjectDetailSerializer
from .filters import ProjectFilter

class ProjectListView(generics.ListCreateAPIView):
    """
    List all projects with filtering and pagination.  Staff users can also
    create new project entries via POST (admin-only permission enforced).
    """
    queryset = Project.objects.all().order_by('-year')
    serializer_class = ProjectListSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = StandardPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProjectFilter

class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a project by slug.  Modify operations require
    admin privileges (handled by IsAdminOrReadOnly permission class).
    """
    queryset = Project.objects.all()
    serializer_class = ProjectDetailSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'