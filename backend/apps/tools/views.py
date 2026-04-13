# backend/apps/tools/views.py
"""
DRF compute endpoint for all calculators.

Registry pattern keeps business logic in pure Python modules (apps/tools/calculators/)
for maximum testability and separation of concerns.

Note: Per current project context, calculator logic is now managed entirely by
the Next.js frontend React components (client-side for performance, offline support,
and reduced backend load). The registry is intentionally empty and the endpoint
returns a 501 to indicate this architectural shift. The endpoint remains for
future server-side needs or legacy compatibility.
"""
from typing import Callable

from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema

from .serializers import CalculatorInputSerializer, CalculatorResultSerializer

# ─── Registry Placeholder ─────────────────────────────────────────────────────
# No backend calculators — logic is now managed by the Next.js frontend.
# The endpoint is kept for API consistency but always returns 501.
CALCULATOR_REGISTRY: dict[str, Callable] = {}


@extend_schema(
    request=CalculatorInputSerializer,
    responses=CalculatorResultSerializer,
)
@api_view(["POST"])
@permission_classes([AllowAny])
@throttle_classes([AnonRateThrottle])
def compute(request, calculator_slug: str):
    """
    POST /api/v1/tools/compute/{calculator_slug}/

    Calculator logic is now handled client-side in the corresponding
    React component (frontend/src/components/tools/...). This endpoint
    exists for API surface compatibility and potential future server-side
    calculations but currently returns 501 Not Implemented.
    """
    # Registry is empty per context — frontend manages calculations
    return Response(
        {
            "detail": (
                f"Calculator '{calculator_slug}' logic is managed by the "
                "Next.js frontend React component for optimal performance "
                "and offline capability."
            )
        },
        status=status.HTTP_501_NOT_IMPLEMENTED,
    )