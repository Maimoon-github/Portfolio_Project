from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Item
from .serializers import ItemSerializer

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def health_check(request):
    """Health check endpoint for load balancers."""
    return Response({"status": "ok"})

class ItemViewSet(viewsets.ModelViewSet):
    """
    Items CRUD API.
    """
    serializer_class = ItemSerializer
    
    def get_queryset(self):
        # Users only see their own items (or adjust based on requirements)
        return Item.objects.filter(owner=self.request.user).order_by('-created_at')
    
    def perform_create(self, serializer):
        # Automatically assign the request user as the owner
        serializer.save(owner=self.request.user)
