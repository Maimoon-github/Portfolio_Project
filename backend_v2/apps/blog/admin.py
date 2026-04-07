from django.contrib import admin
from django.utils import timezone
from .models import Post, Category, Tag, PostImage
from apps.seo.admin import PostSEOInline  # Import SEO inline
from apps.seo.services import get_or_create_post_seo, analyze_post_seo

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "created_at")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name",)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name",)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "title", "author", "category", "status",
        "publish_date", "featured", "read_time", "view_count",
        "seo_score_display",  # Add SEO score column
    )
    list_filter = ("status", "publish_date", "category", "author")
    search_fields = ("title", "content")
    prepopulated_fields = {"slug": ("title",)}
    raw_id_fields = ("author",)
    date_hierarchy = "publish_date"
    ordering = ("-publish_date",)
    filter_horizontal = ("tags",)
    readonly_fields = ("view_count", "created_at", "updated_at", "read_time")
    actions = ["bulk_publish", "reanalyze_seo"]  # Add SEO action
    inlines = [PostSEOInline]  # Add SEO inline

    fieldsets = (
        (None, {
            "fields": ("title", "slug", "author", "content", "excerpt", "featured_image"),
        }),
        ("Categorisation", {
            "fields": ("category", "tags"),
        }),
        ("Publishing", {
            "fields": ("status", "publish_date", "featured"),
        }),
        ("Stats", {
            "classes": ("collapse",),
            "fields": ("view_count", "created_at", "updated_at", "read_time"),
        }),
    )

    def get_queryset(self, request):
        """Optimize query with select_related for SEO data."""
        return super().get_queryset(request).select_related('seo')

    def seo_score_display(self, obj):
        """Display SEO score with color coding."""
        if hasattr(obj, 'seo') and obj.seo.seo_score is not None:
            score = obj.seo.seo_score
            color = "green" if score >= 70 else "orange" if score >= 50 else "red"
            return format_html(
                '<span style="color: {}; font-weight: bold;">{}</span>',
                color, f"{score}/100"
            )
        return format_html('<span style="color: gray;">N/A</span>')
    seo_score_display.short_description = "SEO Score"

    def bulk_publish(self, request, queryset):
        """Publish selected posts by setting status and publish_date to now."""
        updated = queryset.update(status='published', publish_date=timezone.now())
        self.message_user(request, f"{updated} posts published.")
    bulk_publish.short_description = "Publish selected posts"

    def reanalyze_seo(self, request, queryset):
        """Reanalyze SEO for selected posts."""
        from apps.seo.tasks import compute_seo_scores_task
        count = 0
        for post in queryset:
            compute_seo_scores_task.delay(post.id)
            count += 1
        self.message_user(request, f"Queued SEO reanalysis for {count} posts.")
    reanalyze_seo.short_description = "Reanalyze SEO scores"

    def save_model(self, request, obj, form, change):
        if not change:  # New post
            obj.author = request.user
        super().save_model(request, obj, form, change)
        
        # Ensure SEO record exists after save
        get_or_create_post_seo(obj)


admin.site.register(PostImage)