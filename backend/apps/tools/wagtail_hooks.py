# backend/apps/tools/wagtail_hooks.py
"""
Wagtail lifecycle hooks for the tools application.

ISR Revalidation Pattern:
    Mirrors the pattern in apps.blog.wagtail_hooks. On ToolDetailPage
    publish/unpublish, a webhook fires to Next.js to purge the ISR
    cache for the affected tool page and the tools listing page.

    Tag naming convention:
        - `tool-{slug}` — targets a single tool page ISR entry
        - `tools`       — targets the tools listing ISR entry

    Additionally registers a 'Preview on Frontend' button in the Wagtail
    page explorer that links directly to the live Next.js tool URL.

    Required settings:
        NEXT_REVALIDATE_URL: str
        REVALIDATE_SECRET: str
        NEXT_PUBLIC_SITE_URL: str
"""

from __future__ import annotations

# Standard Library
import logging
from typing import Any

# Django Core
from django.conf import settings

# Third-Party: Wagtail
from wagtail import hooks

logger = logging.getLogger(__name__)

_REVALIDATE_URL: str = getattr(
    settings, "NEXT_REVALIDATE_URL", "http://localhost:3000/api/revalidate"
)
_REVALIDATE_SECRET: str = getattr(settings, "REVALIDATE_SECRET", "")
_SITE_URL: str = getattr(settings, "NEXT_PUBLIC_SITE_URL", "http://localhost:3000")


def _notify_nextjs(page: Any, tags: list[str]) -> None:
    """
    Fire a POST request to the Next.js ISR revalidation endpoint.

    Defined locally rather than imported from apps.blog.wagtail_hooks
    to avoid circular import risks (Wagtail loads all wagtail_hooks.py
    files at startup; cross-app imports in those files can cause
    AppRegistryNotReady errors in certain load orders).

    Args:
        page: The Wagtail page instance (used for logging only).
        tags: Cache tags to invalidate in Next.js.
    """
    if not _REVALIDATE_URL or not _REVALIDATE_SECRET:
        logger.debug(
            "Skipping Next.js revalidation: NEXT_REVALIDATE_URL or REVALIDATE_SECRET not set."
        )
        return

    payload = {"secret": _REVALIDATE_SECRET, "tags": tags}

    try:
        import requests  # noqa: PLC0415

        response = requests.post(_REVALIDATE_URL, json=payload, timeout=5)
        response.raise_for_status()
        logger.info(
            "Next.js ISR revalidation triggered for tool '%s', tags=%s.",
            getattr(page, "slug", "unknown"),
            tags,
        )
    except ImportError:
        import json
        import urllib.error
        import urllib.request

        try:
            req = urllib.request.Request(
                _REVALIDATE_URL,
                data=json.dumps(payload).encode(),
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=5):
                pass
        except urllib.error.URLError as exc:
            logger.warning(
                "Next.js revalidation failed (urllib) for tool '%s': %s",
                getattr(page, "slug", "unknown"),
                exc,
            )
    except Exception as exc:  # noqa: BLE001
        logger.warning(
            "Next.js revalidation failed for tool '%s': %s",
            getattr(page, "slug", "unknown"),
            exc,
        )


# ── Hook registrations ────────────────────────────────────────────────────────

@hooks.register("after_publish_page")
def on_tool_publish(request: Any, page: Any) -> None:
    """
    Trigger Next.js ISR revalidation after a ToolDetailPage is published.

    Args:
        request: The Wagtail admin HTTP request.
        page: The page instance that was just published.
    """
    from apps.tools.models import ToolDetailPage  # noqa: PLC0415

    if not isinstance(page, ToolDetailPage):
        return

    _notify_nextjs(page, tags=[f"tool-{page.slug}", "tools"])


@hooks.register("after_unpublish_page")
def on_tool_unpublish(request: Any, page: Any) -> None:
    """
    Trigger Next.js ISR revalidation after a ToolDetailPage is unpublished.

    Args:
        request: The Wagtail admin HTTP request.
        page: The page instance that was just unpublished.
    """
    from apps.tools.models import ToolDetailPage  # noqa: PLC0415

    if not isinstance(page, ToolDetailPage):
        return

    _notify_nextjs(page, tags=[f"tool-{page.slug}", "tools"])


@hooks.register("register_page_listing_buttons")
def add_tool_frontend_preview_button(
    page: Any, page_perms: Any, next_url: str | None = None
) -> list:
    """
    Add a 'Preview on frontend' button to the Wagtail page explorer
    for ToolDetailPage instances.

    The URL format matches the Next.js route:
        /tools/{category}/{slug}

    Args:
        page: The page being listed.
        page_perms: Permission wrapper for the current user.
        next_url: Redirect URL after action (unused here).

    Returns:
        List containing one PageListingButton, or empty list if not applicable.
    """
    from apps.tools.models import ToolDetailPage  # noqa: PLC0415

    if not isinstance(page, ToolDetailPage):
        return []

    try:
        from wagtail.admin.ui.components import PageListingButton  # Wagtail 5+
    except ImportError:
        try:
            from wagtail.snippets.action_menu import PageListingButton  # Wagtail 4
        except ImportError:
            logger.debug("PageListingButton not available in this Wagtail version.")
            return []

    # Route: /tools/{category}/{slug} — matches Next.js App Router structure.
    frontend_url = f"{_SITE_URL}/tools/{page.category}/{page.slug}"

    return [
        PageListingButton(
            label="Preview on frontend",
            url=frontend_url,
            attrs={"target": "_blank", "rel": "noopener noreferrer"},
            priority=30,
        )
    ]