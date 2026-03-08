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
    # Combined list display from both versions
    list_display = (
        "title", "author", "category", "status",
        "publish_date", "published_date", "featured",
        "read_time", "view_count"
    )
    list_filter = ("status", "publish_date", "category", "author")
    search_fields = ("title", "content")
    prepopulated_fields = {"slug": ("title",)}
    raw_id_fields = ("author",)
    date_hierarchy = "publish_date"          # from second version
    ordering = ("-publish_date",)             # from second version
    filter_horizontal = ("tags",)             # common
    readonly_fields = ("view_count", "created_at", "updated_at")
    actions = ["bulk_publish"]                # from first version

    # Enhanced field layout from second version, extended with first version's fields
    fieldsets = (
        (None, {
            "fields": ("title", "slug", "author", "content", "excerpt", "featured_image"),
        }),
        ("Categorisation", {
            "fields": ("category", "tags"),
        }),
        ("Publishing", {
            "fields": ("status", "publish_date", "published_date", "featured"),
        }),
        ("SEO", {
            "classes": ("collapse",),
            "fields": ("meta_title", "meta_description"),
        }),
        ("Stats", {
            "classes": ("collapse",),
            "fields": ("view_count", "created_at", "updated_at", "read_time"),
        }),
    )

    def bulk_publish(self, request, queryset):
        """Publish selected posts by setting their published_date to now."""
        queryset.update(published_date=timezone.now())
        self.message_user(request, f"{queryset.count()} posts published.")
    bulk_publish.short_description = "Publish selected posts"

    def save_model(self, request, obj, form, change):
        """Automatically set the author for new posts."""
        if not change:  # New post
            obj.author = request.user
        super().save_model(request, obj, form, change)


# Simple registration for PostImage (from first version)
admin.site.register(PostImage)