# backend/apps/blog/__init__.py
"""
Blog app: Wagtail-powered blogging system.
Defines BlogIndexPage (listing) and BlogDetailPage (post) as Wagtail Page subclasses
with StreamField body, tagging via django-taggit, and ISR-compatible API fields
exposed through the Wagtail v2 Pages API.
"""