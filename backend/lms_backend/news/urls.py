"""
URL configuration for news app.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NewsItemViewSet, AdminNewsItemViewSet, NewsCategoryViewSet

# Create router and register viewsets
router = DefaultRouter()
router.register(r'', NewsItemViewSet, basename='newsitem')
router.register(r'categories', NewsCategoryViewSet, basename='newscategory')

# Admin router
admin_router = DefaultRouter()
admin_router.register(r'', AdminNewsItemViewSet, basename='admin-newsitem')

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', include(admin_router.urls)),
]
