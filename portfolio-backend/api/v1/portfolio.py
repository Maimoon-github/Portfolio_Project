from ninja import Router, Schema, Query
from ninja.pagination import paginate, PageNumberPagination
from typing import List, Optional
from datetime import date
from django.shortcuts import get_object_or_404
from apps.portfolio.models import Project, Skill, Experience
from django.core.cache import cache
from django.views.decorators.cache import cache_page
from ninja.decorators import django_cache

router = Router(tags=["Portfolio"])

class ProjectListSchema(Schema):
    id: int
    slug: str
    title: str
    description: str
    thumbnail_url: Optional[str] = None
    demo_url: Optional[str] = None
    github_url: Optional[str] = None
    tech_stack: List[str]
    featured: bool
    published_at: date

class ProjectDetailSchema(ProjectListSchema):
    long_description: str
    seo_title: str
    search_description: str

class SkillSchema(Schema):
    id: int
    name: str
    category: str
    proficiency: int
    icon: Optional[str]
    featured: bool

class ExperienceSchema(Schema):
    id: int
    position: str
    company: str
    company_url: Optional[str]
    location: Optional[str]
    start_date: date
    end_date: Optional[date]
    description: str
    current: bool
    tech_stack: List[str]


@router.get("/projects/", response=List[ProjectListSchema])
@paginate(PageNumberPagination, page_size=12)
def list_projects(
    request,
    featured: Optional[bool] = Query(None, description="Filter featured projects"),
    category: Optional[str] = Query(None, description="Tech stack filter (contains)"),
):
    """Cached list endpoint for projects page + home featured grid."""
    qs = Project.objects.all().order_by("order", "-published_at")
    if featured is not None:
        qs = qs.filter(featured=featured)
    if category:
        qs = qs.filter(tech_stack__contains=[category])
    # Simple cache key per query params
    cache_key = f"portfolio:projects:{featured}:{category}"
    cached = cache.get(cache_key)
    if cached:
        return cached
    result = list(qs)
    cache.set(cache_key, result, timeout=3600)  # 1 hour
    return result


@router.get("/projects/{slug}/", response=ProjectDetailSchema)
def get_project(request, slug: str):
    """Detail view with full SEO data."""
    project = get_object_or_404(Project, slug=slug)
    return project


@router.get("/skills/", response=List[SkillSchema])
def list_skills(request):
    """Skills for About + home summary."""
    return Skill.objects.all().order_by("order", "name")


@router.get("/experiences/", response=List[ExperienceSchema])
def list_experiences(request):
    """Timeline data for About page."""
    return Experience.objects.all().order_by("-start_date", "order")