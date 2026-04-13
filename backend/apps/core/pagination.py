# backend/apps/core/pagination.py
"""
Standard pagination class used by ALL DRF endpoints in the project.

Registered globally in config/settings/base.py under
REST_FRAMEWORK['DEFAULT_PAGINATION_CLASS'].
"""
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class StandardResultsPagination(PageNumberPagination):
    """
    Consistent pagination response format across the entire API.
    """
    page_size = 12
    page_size_query_param = "page_size"
    max_page_size = 100

    def get_paginated_response(self, data):
        """Return enriched pagination metadata for every list endpoint."""
        return Response(
            {
                "count": self.page.paginator.count,
                "total_pages": self.page.paginator.num_pages,
                "next": self.get_next_link(),
                "previous": self.get_previous_link(),
                "results": data,
            }
        )

    def get_paginated_response_schema(self, schema):
        """OpenAPI schema used by drf-spectacular."""
        return {
            "type": "object",
            "required": ["count", "total_pages", "results"],
            "properties": {
                "count": {"type": "integer"},
                "total_pages": {"type": "integer"},
                "next": {"type": "string", "nullable": True},
                "previous": {"type": "string", "nullable": True},
                "results": schema,
            },
        }