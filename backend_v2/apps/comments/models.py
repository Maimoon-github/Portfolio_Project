from django.conf import settings
from django.db import models

from blog.models import Post


class Comment(models.Model):
    """
    User comment on a blog post.
    Requires admin approval before public display.
    """

    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="comments"
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="comments",
    )
    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="replies",
    )
    content = models.TextField(max_length=2000)
    approved = models.BooleanField(default=False, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["post", "approved", "-created_at"]),
        ]

    def __str__(self) -> str:
        return f"Comment by {self.user.username} on {self.post.title[:30]}"

    @property
    def is_reply(self) -> bool:
        return self.parent is not None
