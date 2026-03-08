from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import UserPassesTestMixin
from django.shortcuts import get_object_or_404, redirect
from django.views.decorators.http import require_POST
from django.views.generic import ListView

from blog.models import Post

from .forms import CommentForm
from .models import Comment


@login_required
@require_POST
def add_comment(request, post_id: int):
    """Add a comment to a post. Requires login. POST only."""
    post = get_object_or_404(Post.published, pk=post_id)
    form = CommentForm(request.POST)

    if form.is_valid():
        comment = form.save(commit=False)
        comment.post = post
        comment.user = request.user
        comment.save()
        messages.success(
            request, "Your comment has been submitted and is awaiting moderation."
        )
    else:
        messages.error(request, "There was an error with your comment.")

    return redirect(post.get_absolute_url())


class CommentModerationView(UserPassesTestMixin, ListView):
    """Staff-only view for pending comments."""

    model = Comment
    template_name = "comments/moderate.html"
    context_object_name = "comments"
    paginate_by = 30

    def test_func(self) -> bool:
        return self.request.user.is_staff

    def get_queryset(self):
        return (
            Comment.objects.filter(approved=False)
            .select_related("user", "post")
            .order_by("-created_at")
        )


@login_required
def approve_comment(request, comment_id: int):
    """Approve a single comment (staff only)."""
    if not request.user.is_staff:
        messages.error(request, "Permission denied.")
        return redirect("blog:post_list")

    comment = get_object_or_404(Comment, pk=comment_id)
    comment.approved = True
    comment.save(update_fields=["approved"])
    messages.success(request, "Comment approved.")
    return redirect("comments:moderate")


@login_required
def delete_comment(request, comment_id: int):
    """Delete a comment — owner or staff."""
    comment = get_object_or_404(Comment, pk=comment_id)
    if request.user == comment.user or request.user.is_staff:
        post_url = comment.post.get_absolute_url()
        comment.delete()
        messages.success(request, "Comment deleted.")
        return redirect(post_url)
    messages.error(request, "Permission denied.")
    return redirect("blog:post_list")
