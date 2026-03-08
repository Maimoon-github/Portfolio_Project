from django.contrib import admin

from .models import Category, Post, Tag


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
    list_display = ("title", "author", "category", "status", "publish_date", "view_count")
    list_filter = ("status", "publish_date", "category", "author")
    search_fields = ("title", "content")
    prepopulated_fields = {"slug": ("title",)}
    raw_id_fields = ("author",)
    date_hierarchy = "publish_date"
    ordering = ("-publish_date",)
    filter_horizontal = ("tags",)
    readonly_fields = ("view_count", "created_at", "updated_at")

    fieldsets = (
        (None, {
            "fields": ("title", "slug", "author", "content", "excerpt", "featured_image"),
        }),
        ("Categorisation", {
            "fields": ("category", "tags"),
        }),
        ("Publishing", {
            "fields": ("status", "publish_date"),
        }),
        ("SEO", {
            "classes": ("collapse",),
            "fields": ("meta_title", "meta_description"),
        }),
        ("Stats", {
            "classes": ("collapse",),
            "fields": ("view_count", "created_at", "updated_at"),
        }),
    )

    def save_model(self, request, obj, form, change):
        if not change:  # New post
            obj.author = request.user
        super().save_model(request, obj, form, change)
