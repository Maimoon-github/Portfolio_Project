from django.contrib import admin

from .models import Comment


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("user", "post", "approved", "is_reply", "created_at")
    list_filter = ("approved", "created_at")
    search_fields = ("user__username", "content", "post__title")
    list_editable = ("approved",)
    raw_id_fields = ("post", "user", "parent")
    actions = ["approve_comments", "reject_comments"]

    @admin.action(description="Approve selected comments")
    def approve_comments(self, request, queryset):
        count = queryset.update(approved=True)
        self.message_user(request, f"{count} comment(s) approved.")

    @admin.action(description="Reject selected comments")
    def reject_comments(self, request, queryset):
        count = queryset.update(approved=False)
        self.message_user(request, f"{count} comment(s) rejected.")
