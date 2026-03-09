from django.contrib import admin
from django.utils import timezone
from .models import Post, Category, Tag, PostImage

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
        "publish_date", "featured", "read_time", "view_count"
    )
    list_filter = ("status", "publish_date", "category", "author")
    search_fields = ("title", "content")
    prepopulated_fields = {"slug": ("title",)}
    raw_id_fields = ("author",)
    date_hierarchy = "publish_date"
    ordering = ("-publish_date",)
    filter_horizontal = ("tags",)
    readonly_fields = ("view_count", "created_at", "updated_at", "read_time")
    actions = ["bulk_publish"]

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
        # ("SEO", {
        #     "classes": ("collapse",),
        #     "fields": ("meta_title", "meta_description"),
        # }),
        ("Stats", {
            "classes": ("collapse",),
            "fields": ("view_count", "created_at", "updated_at", "read_time"),
        }),
    )

    def bulk_publish(self, request, queryset):
        """Publish selected posts by setting status and publish_date to now."""
        updated = queryset.update(status='published', publish_date=timezone.now())
        self.message_user(request, f"{updated} posts published.")
    bulk_publish.short_description = "Publish selected posts"

    def save_model(self, request, obj, form, change):
        if not change:  # New post
            obj.author = request.user
        super().save_model(request, obj, form, change)


admin.site.register(PostImage)