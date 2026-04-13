# backend/apps/tools/serializers.py
"""
Supplementary DRF serializers for the tools application.

The primary frontend data source is the Wagtail v2 Pages API at
/api/v2/pages/?type=tools.ToolDetailPage. These serializers serve three
additional purposes:

1. OpenAPI schema generation via drf-spectacular for the /compute/ endpoint.
2. Typing reference for TypeScript types in frontend/src/lib/api/types.ts.
3. Input validation for the compute endpoint (CalculatorInputSerializer).

Never return these serializers directly from a Wagtail page view — always
use the Wagtail Pages API for page content delivery.
"""

from __future__ import annotations

# Standard Library
from typing import Any

# Third-Party
from rest_framework import serializers


class ToolListSerializer(serializers.Serializer):
    """
    Read-only serializer mirroring the Wagtail v2 Pages API tool list response.

    Design decision — mirrors rather than extends Wagtail output:
    Wagtail's headless API uses its own serialization pipeline. Extending
    it here would couple this DRF layer to Wagtail internals. Instead we
    mirror the output shape for schema/documentation accuracy.

    Fields:
        id: Wagtail page ID.
        title: Tool name (used as card heading).
        slug: URL slug for /tools/{category}/{slug}/ routing.
        category: ToolCategory value (e.g. "financial").
        calculator_slug: Unique machine identifier (matches CALCULATOR_REGISTRY key).
        icon: Lucide icon name for the tool card.
        is_featured: Whether to show in the featured tools grid.
        hero_image_thumbnail: Image dict with url/width/height or null.
    """

    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(read_only=True)
    slug = serializers.CharField(read_only=True)
    category = serializers.CharField(read_only=True)
    calculator_slug = serializers.SlugField(read_only=True)
    icon = serializers.CharField(read_only=True, allow_blank=True)
    is_featured = serializers.BooleanField(read_only=True)
    hero_image_thumbnail = serializers.DictField(
        read_only=True,
        allow_null=True,
        help_text="Hero image rendered at 800×400. Keys: url, width, height.",
    )


class ToolDetailSerializer(ToolListSerializer):
    """
    Extended serializer for the full tool detail page response.

    Adds the StreamField body (structured content blocks) and SEO
    fields to the list serializer.

    Additional fields:
        body: List of StreamField block dicts (type + value + id).
        seo_title: Wagtail SEO title override (falls back to title if blank).
        search_description: Meta description text (target 120–160 chars).
    """

    body = serializers.ListField(
        child=serializers.DictField(),
        read_only=True,
        help_text=(
            "StreamField body blocks. Each item has 'type', 'value', and 'id' keys. "
            "Block types: intro, formula_block, use_cases, faq, image, paragraph."
        ),
    )
    seo_title = serializers.CharField(
        read_only=True,
        allow_blank=True,
        help_text="SEO title override from Wagtail promote tab.",
    )
    search_description = serializers.CharField(
        read_only=True,
        allow_blank=True,
        help_text="Meta description from Wagtail promote tab.",
    )


class CalculatorInputSerializer(serializers.Serializer):
    """
    Input serializer for the POST /api/v1/tools/compute/{calculator_slug}/ endpoint.

    Validates that the request body contains an `inputs` key with a
    dict value. The inner dict is validated by the calculator function
    itself (type errors become 400 responses in views.compute).

    Fields:
        inputs: Arbitrary key-value pairs matching the calculator's
                expected keyword arguments (e.g. {"principal": 10000, "annual_rate": 7}).
    """

    inputs = serializers.DictField(
        child=serializers.JSONField(),
        help_text=(
            "Key-value pairs of calculator inputs. Keys and value types depend on "
            "the specific calculator — see the OpenAPI schema for per-calculator details."
        ),
    )

    def validate_inputs(self, value: Any) -> dict[str, Any]:
        """
        Ensure the inputs field is a non-null dictionary.

        Args:
            value: The deserialized inputs field value.

        Returns:
            The validated inputs dict.

        Raises:
            serializers.ValidationError: If value is not a dict.
        """
        if not isinstance(value, dict):
            raise serializers.ValidationError(
                "inputs must be a JSON object (key-value pairs), not a list or scalar."
            )
        return value


class CalculatorResultSerializer(serializers.Serializer):
    """
    Output serializer for the /compute/ endpoint — used for OpenAPI schema generation.

    The `result` dict shape varies per calculator (e.g. compound interest
    returns final_amount/interest_earned; mortgage returns monthly_payment/
    total_paid). Per-calculator response schemas are documented in the
    apps/tools/calculators/ module docstrings.

    Fields:
        result: Calculator output as a flat key-value dict.
        calculator: The calculator_slug that processed the request.
    """

    result = serializers.DictField(
        help_text=(
            "Calculator output. Keys depend on the specific calculator. "
            "All numeric values are rounded to 2 decimal places."
        )
    )
    calculator = serializers.CharField(
        help_text="The calculator_slug that was invoked (mirrors the URL parameter)."
    )