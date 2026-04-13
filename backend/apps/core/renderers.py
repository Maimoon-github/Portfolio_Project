# backend/apps/core/renderers.py
"""
Custom DRF renderer and response helpers for consistent API envelopes.

Registered globally in config/settings/base.py.
"""
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from typing import Any


class StandardJSONRenderer(JSONRenderer):
    """
    Wraps every successful response in a consistent envelope:
    { "status": "success", "data": <original_data> }

    Error responses are left untouched so DRF's exception handler works normally.
    """

    def render(self, data, accepted_media_type=None, renderer_context=None):
        if "error" in data or "detail" in data:
            # Already an error response from DRF
            return super().render(data, accepted_media_type, renderer_context)

        # Success envelope
        response_data = {
            "status": "success",
            "data": data,
        }
        return super().render(response_data, accepted_media_type, renderer_context)


def success_response(data: Any, status_code: int = 200) -> Response:
    """Utility for views to return consistent success responses."""
    return Response({"status": "success", "data": data}, status=status_code)