# backend/apps/core/permissions.py
"""
Custom DRF permission classes used throughout the project.

These are designed to be imported and reused in any ViewSet or APIView.
"""
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.request import Request
from rest_framework.views import View


class IsOwnerOrReadOnly(BasePermission):
    """
    Object-level permission: anyone can read, only the owner can edit/delete.
    """

    def has_permission(self, request: Request, view: View) -> bool:
        return True  # Read permissions are allowed to any request

    def has_object_permission(self, request: Request, view: View, obj) -> bool:
        if request.method in SAFE_METHODS:
            return True
        return obj.owner == request.user if hasattr(obj, "owner") else False


class IsAdminOrReadOnly(BasePermission):
    """
    Only staff users can write. Everyone can read.
    """

    def has_permission(self, request: Request, view: View) -> bool:
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class IsAuthenticatedAndActive(BasePermission):
    """
    Requires a logged-in AND active user (prevents suspended accounts).
    """

    def has_permission(self, request: Request, view: View) -> bool:
        return bool(
            request.user and request.user.is_authenticated and request.user.is_active
        )