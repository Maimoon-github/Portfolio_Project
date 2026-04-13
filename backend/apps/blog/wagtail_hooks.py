# backend/apps/blog/wagtail_hooks.py
"""
Wagtail lifecycle hooks for the blog application.

ISR Revalidation Pattern:
    When a blog post is published or unpublished in the Wagtail admin,
    these hooks fire a POST request to the Next.js revalidation endpoint
    (/api/revalidate). Next.js then purges the ISR cache for the specific
    page tag, causing the next visitor request to regenerate the static
    page with fresh content — without requiring a full site rebuild.

    Tag naming convention:
        - `blog-post-{slug}` — targets a single post's ISR cache entry
        - `blog-posts`       — targets the listing page ISR cache entry

    The webhook is fire-and-forget: failures are logged but never raise
    exceptions, ensuring the publish action always succeeds even if
    Next.js is temporarily unreachable.

    Required settings (config/settings/base.py):
        NEXT_REVALIDATE_URL: str  — e.g. "http://frontend:3000/api/revalidate"
        REVALIDATE_SECRET: str    — shared secret checked by Next.js route handler
        NEXT_PUBLIC_SITE_URL: str — e.g. "https://yoursite.com"
"""

from __future__ import annotations

# Standard Library
import logging
from typing import TYPE_CHECKING

# Django Core
from django.conf import settings

# Third-Party: Wagtail
from wagtail import hooks

if TYPE_CHECKING:
    from django.http import HttpRequest
    from wagtail.models import Page

logger = logging.getLogger(__name__)

# ── Settings with safe dev fallbacks ──────────────────────────────────────────
_REVALIDATE_URL: str = getattr(
    settings, "NEXT_REVALIDATE_URL", "http://localhost:3000/api/revalidate"
)
_REVALIDATE_SECRET: str = getattr(settings, "REVALIDATE_SECRET", "")
_SITE_URL: str = getattr(settings, "NEXT_PUBLIC_SITE_URL", "http://localhost:3000")


def _notify_nextjs(page: Page, tags: list[str]) -> None:
    """
    Fire a POST request to the Next.js ISR revalidation endpoint.

    This function is intentionally fault-tolerant: any exception during
    the HTTP call is caught, logged at WARNING level, and silently
    suppressed. The publish workflow must never be blocked by a network
    failure to the frontend.

    Args:
        page: The Wagtail page instance that triggered the hook (used for logging).
        tags: List of Next.js cache tags to revalidate (e.g. ['blog-post-my-slug']).

    Returns:
        None. Failures are logged, never raised.
    """
    if not _REVALIDATE_URL or not _REVALIDATE_SECRET:
        logger.debug(
            "Skipping Next.js revalidation: NEXT_REVALIDATE_URL or "
            "REVALIDATE_SECRET not configured."
        )
        return

    payload = {"secret": _REVALIDATE_SECRET, "tags": tags}

    try:
        # Import requests lazily so the app doesn't hard-fail if the
        # package is absent in a minimal test environment.
        import requests  # noqa: PLC0415

        response = requests.post(
            _REVALIDATE_URL,
            json=payload,
            timeout=5,
        )
        response.raise_for_status()
        logger.info(
            "Next.js ISR revalidation triggered for page '%s' (pk=%s), tags=%s.",
            page.slug,
            page.pk,
            tags,
        )
    except ImportError:
        # Fallback to urllib if requests is not installed.
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
            logger.info(
                "Next.js ISR revalidation triggered via urllib for page '%s', tags=%s.",
                page.slug,
                tags,
            )
        except urllib.error.URLError as exc:
            logger.warning(
                "Next.js revalidation request failed (urllib) for page '%s': %s",
                page.slug,
                exc,
            )
    except Exception as exc:  # noqa: BLE001 — intentional broad catch
        logger.warning(
            "Next.js revalidation request failed for page '%s' (pk=%s): %s",
            page.slug,
            page.pk,
            exc,
        )


# ── Hook registrations ────────────────────────────────────────────────────────

@hooks.register("after_publish_page")
def on_blog_post_publish(request: HttpRequest, page: Page) -> None:
    """
    Trigger Next.js ISR revalidation after a blog post is published.

    Fires for ALL page publishes; the isinstance check ensures we only
    act on BlogDetailPage instances, not other page types.

    Args:
        request: The Wagtail admin HTTP request.
        page: The page instance that was just published.
    """
    # Import here to avoid circular imports at module load time.
    from apps.blog.models import BlogDetailPage  # noqa: PLC0415

    if not isinstance(page, BlogDetailPage):
        return

    _notify_nextjs(
        page,
        tags=[f"blog-post-{page.slug}", "blog-posts"],
    )


@hooks.register("before_publish_page")
def before_blog_post_publish(request: HttpRequest, page: Page) -> None:
    """Prevent publishing when a blog post fails strict SEO validation."""
    from apps.blog.models import BlogDetailPage  # noqa: PLC0415

    if not isinstance(page, BlogDetailPage):
        return

    try:
        page.full_clean()
    except Exception as exc:  # noqa: BLE001 — intentional broad catch
        logger.warning(
            "Blocked publish for blog post '%s' due to SEO validation failure: %s",
            page.slug,
            exc,
        )
        raise


@hooks.register("after_unpublish_page")
def on_blog_post_unpublish(request: HttpRequest, page: Page) -> None:
    """
    Trigger Next.js ISR revalidation after a blog post is unpublished.

    Revalidating on unpublish ensures the listing page no longer
    includes the post and direct post URLs return 404 (Next.js
    notFound() is returned when the API returns an empty result set).

    Args:
        request: The Wagtail admin HTTP request.
        page: The page instance that was just unpublished.
    """
    from apps.blog.models import BlogDetailPage  # noqa: PLC0415

    if not isinstance(page, BlogDetailPage):
        return

    _notify_nextjs(
        page,
        tags=[f"blog-post-{page.slug}", "blog-posts"],
    )


@hooks.register("register_page_listing_buttons")
def add_blog_frontend_preview_button(
    page: Page, page_perms: Any, next_url: str | None = None
) -> list:
    """
    Add a 'Preview on Frontend' button to the Wagtail page explorer
    for BlogDetailPage instances.

    This gives editors a one-click way to open the live Next.js URL
    for a blog post directly from the page listing.

    Args:
        page: The page being listed.
        page_perms: Permission wrapper for the current user.
        next_url: Redirect URL after action (not used here).

    Returns:
        List of button instances to add to the page listing.
    """
    from apps.blog.models import BlogDetailPage  # noqa: PLC0415

    try:
        from wagtail.admin.ui.components import PageListingButton  # Wagtail 5+
    except ImportError:
        try:
            from wagtail.snippets.action_menu import PageListingButton  # Wagtail 4
        except ImportError:
            return []

    if not isinstance(page, BlogDetailPage):
        return []

    frontend_url = f"{_SITE_URL}/blog/{page.slug}"
    return [
        PageListingButton(
            label="Preview on frontend",
            url=frontend_url,
            attrs={"target": "_blank", "rel": "noopener noreferrer"},
            priority=30,
        )
    ]


# Type hint fix for the listing button hook
from typing import Any  # noqa: E402 — must follow the hook definition