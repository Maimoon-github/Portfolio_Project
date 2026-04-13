# backend/apps/tools/__init__.py
"""
Tools app: Wagtail-powered calculator tool pages.
ToolIndexPage and ToolDetailPage manage content via StreamField (descriptions, formulas, FAQ, use cases).
A DRF compute endpoint at /api/v1/tools/compute/{calculator_slug}/
accepts JSON inputs, runs pure-Python calculator logic from apps/tools/calculators/,
and returns JSON results. The calculator_slug field on ToolDetailPage maps to
a React component in the Next.js frontend.
"""