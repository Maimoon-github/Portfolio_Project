from django.contrib import admin
from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet
from .models import Project, Skill, Experience


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "featured", "published_at", "order", "get_tech_stack_preview")
    list_filter = ("featured", "published_at")
    search_fields = ("title", "description")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("order", "-published_at")
    fieldsets = (
        (None, {"fields": ("title", "slug", "description", "long_description", "thumbnail")}),
        ("Links & Metadata", {"fields": ("demo_url", "github_url", "tech_stack", "featured", "order", "published_at")}),
        ("SEO (inherited)", {"fields": ("seo_title", "search_description"), "classes": ("collapse",)}),
    )

    def get_tech_stack_preview(self, obj):
        return ", ".join(obj.tech_stack[:5]) if isinstance(obj.tech_stack, list) else ""
    get_tech_stack_preview.short_description = "Tech Stack"


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "proficiency", "featured", "order")
    list_filter = ("featured", "category")
    search_fields = ("name", "category")
    ordering = ("order", "name")


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("position", "company", "start_date", "end_date", "current", "order")
    list_filter = ("current",)
    search_fields = ("company", "position", "description")
    ordering = ("-start_date", "order")


# Wagtail snippet registration for easy CMS management
@register_snippet
class SkillSnippet(Skill):
    pass


@register_snippet
class ExperienceSnippet(Experience):
    pass