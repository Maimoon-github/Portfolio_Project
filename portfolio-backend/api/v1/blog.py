from ninja import Router, Schema, Query
from ninja.pagination import paginate, PageNumberPagination
from typing import List, Optional
from datetime import datetime
from django.shortcuts import get_object_or_404
from django.core.cache import cache
from apps.blog.models import BlogPost, BlogCategory
from apps.blog.services import BlogService


router = Router(tags=["Blog"])


class CategorySchema(Schema):
    id: int
    name: str
    slug: str


class PostListSchema(Schema):
    id: int
    slug: str
    title: str
    subtitle: str
    intro: str
    reading_time: int
    first_published_at: datetime
    category: Optional[CategorySchema] = None
    tags: List[str]
    hero_image_url: Optional[str] = None
    seo_title: str
    search_description: str


class PostDetailSchema(PostListSchema):
    body: dict  # StreamField JSON
    og_image_url: Optional[str] = None
    canonical_url: str


@router.get("/posts/", response=List[PostListSchema])
@paginate(PageNumberPagination, page_size=12)
def list_posts(
    request,
    category: Optional[str] = Query(None),
    tag: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
):
    """Cached, filtered list of published blog posts."""
    cache_key = f"blog:posts:{category}:{tag}:{search}"
    cached = cache.get(cache_key)
    if cached:
        return cached

    qs = BlogService.get_published_posts()
    if category:
        qs = qs.filter(category__slug=category)
    if tag:
        qs = qs.filter(tags__slug=tag)
    if search:
        qs = qs.search(search)

    result = list(qs)
    cache.set(cache_key, result, timeout=300)  # 5 minutes
    return result


@router.get("/posts/{slug}/", response=PostDetailSchema)
def get_post(request, slug: str):
    """Single post detail with full SEO data."""
    post = get_object_or_404(BlogPost, slug=slug, live=True)
    return post


@router.get("/categories/", response=List[CategorySchema])
def list_categories(request):
    """All blog categories."""
    return BlogCategory.objects.all()