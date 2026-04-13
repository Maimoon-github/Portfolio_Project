# backend/apps/pages/wagtail_hooks.py
"""
Wagtail lifecycle hooks for the pages app.

ISR Revalidation Pattern (same as blog/tools):
    On publish/unpublish of HomePage, AboutPage, or ContactPage,
    a webhook fires to Next.js to purge the ISR cache for the affected page.
"""

from __future__ import annotations

import logging
from typing import Any

from django.conf import settings
from wagtail import hooks

logger = logging.getLogger(__name__)

_REVALIDATE_URL: str = getattr(
    settings, "NEXT_REVALIDATE_URL", "http://localhost:3000/api/revalidate"
)
_REVALIDATE_SECRET: str = getattr(settings, "REVALIDATE_SECRET", "")
_SITE_URL: str = getattr(settings, "NEXT_PUBLIC_SITE_URL", "http://localhost:3000")


def _notify_nextjs(page: Any, tags: list[str]) -> None:
    """Fire POST to Next.js ISR revalidation endpoint (fault-tolerant)."""
    if not _REVALIDATE_URL or not _REVALIDATE_SECRET:
        logger.debug("Skipping Next.js revalidation: settings not configured.")
        return

    payload = {"secret": _REVALIDATE_SECRET, "tags": tags}

    try:
        import requests  # noqa: PLC0415

        response = requests.post(_REVALIDATE_URL, json=payload, timeout=5)
        response.raise_for_status()
        logger.info(
            "Next.js ISR revalidation triggered for page '%s', tags=%s.",
            getattr(page, "slug", "unknown"),
            tags,
        )
    except Exception as exc:  # noqa: BLE001
        logger.warning(
            "Next.js revalidation failed for page '%s': %s",
            getattr(page, "slug", "unknown"),
            exc,
        )


@hooks.register("after_publish_page")
def on_static_page_publish(request: Any, page: Any) -> None:
    """Trigger Next.js revalidation for marketing static pages."""
    from .models import HomePage, AboutPage, ContactPage  # noqa: PLC0415

    if isinstance(page, (HomePage, AboutPage, ContactPage)):
        _notify_nextjs(page, tags=[f"page-{page.slug}"])


@hooks.register("after_unpublish_page")
def on_static_page_unpublish(request: Any, page: Any) -> None:
    """Trigger Next.js revalidation on unpublish."""
    from .models import HomePage, AboutPage, ContactPage  # noqa: PLC0415

    if isinstance(page, (HomePage, AboutPage, ContactPage)):
        _notify_nextjs(page, tags=[f"page-{page.slug}"])


@hooks.register("register_page_listing_buttons")
def add_pages_frontend_preview_button(
    page: Any, page_perms: Any, next_url: str | None = None
) -> list:
    """Add 'Preview on frontend' button in Wagtail for static pages."""
    from .models import HomePage, AboutPage, ContactPage  # noqa: PLC0415

    if not isinstance(page, (HomePage, AboutPage, ContactPage)):
        return []

    try:
        from wagtail.admin.ui.components import PageListingButton  # Wagtail 5+
    except ImportError:
        try:
            from wagtail.snippets.action_menu import PageListingButton  # Wagtail 4
        except ImportError:
            return []

    frontend_url = f"{_SITE_URL}/{page.slug if page.slug != 'home' else ''}"

    return [
        PageListingButton(
            label="Preview on frontend",
            url=frontend_url,
            attrs={"target": "_blank", "rel": "noopener noreferrer"},
            priority=30,
        )
    ]