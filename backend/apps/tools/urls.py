# @@CONTENT_PLACEHOLDER@@
@@from django.urls import path
from . import views

urlpatterns = [
    path("compute/<slug:calculator_slug>/", views.compute, name="tool-compute"),
]@@

write_file "backend/apps/tools/views.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@"""
DRF endpoint that receives calculator inputs from Next.js,
runs the pure Python calculator logic, and returns results.
This keeps all business logic server-side — never trust client-sent formulas.
"""
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle
from rest_framework.response import Response
from rest_framework import status
from .calculators import financial, health, scientific, productivity


CALCULATOR_REGISTRY: dict[str, callable] = {
    # Financial
    "compound-interest": financial.compound_interest,
    "mortgage": financial.mortgage_monthly_payment,
    "roi": financial.return_on_investment,
    "loan-amortization": financial.loan_amortization,
    # Health
    "bmi": health.bmi,
    "calories": health.daily_calories,
    "body-fat": health.body_fat_percentage,
    # Scientific
    "unit-converter": scientific.unit_convert,
    # Productivity
    "pomodoro": productivity.pomodoro_sessions,
}


@api_view(["POST"])
@permission_classes([AllowAny])
@throttle_classes([AnonRateThrottle])
def compute(request, calculator_slug: str):
    """
    POST /api/v1/tools/compute/{calculator_slug}/
    Body: { "inputs": { ... } }
    Returns: { "result": { ... }, "metadata": { ... } }
    """
    calc_fn = CALCULATOR_REGISTRY.get(calculator_slug)
    if not calc_fn:
        return Response(
            {"detail": f"Calculator '{calculator_slug}' not found."},
            status=status.HTTP_404_NOT_FOUND,
        )

    inputs = request.data.get("inputs", {})
    if not isinstance(inputs, dict):
        return Response(
            {"detail": "inputs must be a JSON object."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        result = calc_fn(**inputs)
        return Response({"result": result, "calculator": calculator_slug})
    except TypeError as e:
        return Response({"detail": f"Invalid inputs: {e}"}, status=status.HTTP_400_BAD_REQUEST)
    except (ValueError, ZeroDivisionError) as e:
        return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)@@

write_file "backend/apps/tools/wagtail_hooks.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
