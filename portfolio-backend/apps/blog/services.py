from django.db.models import QuerySet
from .models import BlogPost


class BlogService:
    """Service layer for blog business logic (clean architecture)."""

    @staticmethod
    def get_published_posts() -> QuerySet:
        """Return only live + public posts ordered by publish date."""
        return BlogPost.objects.live().public().order_by("-first_published_at")

    @staticmethod
    def get_posts_by_category(category_slug: str) -> QuerySet:
        return BlogService.get_published_posts().filter(category__slug=category_slug)

    @staticmethod
    def get_posts_by_tag(tag_slug: str) -> QuerySet:
        return BlogService.get_published_posts().filter(tags__slug=tag_slug)