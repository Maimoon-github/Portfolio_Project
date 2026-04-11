from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone

from apps.blog.models import Post

from .models import Comment

User = get_user_model()


class CommentWorkflowTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user("commenter", "c@example.com", "pass1234")
        self.staff = User.objects.create_user(
            "moderator", "m@example.com", "pass1234", is_staff=True
        )
        self.author = User.objects.create_user("author", "a@example.com", "pass1234")
        self.post = Post.objects.create(
            title="Commentable Post",
            content="Content.",
            author=self.author,
            status="published",
            publish_date=timezone.now(),
        )

    def test_add_comment_requires_login(self):
        resp = self.client.post(
            reverse("comments:add_comment", kwargs={"post_id": self.post.pk}),
            {"content": "Hello"},
        )
        self.assertEqual(resp.status_code, 302)
        self.assertIn("login", resp.url)

    def test_add_comment_authenticated(self):
        self.client.login(username="commenter", password="pass1234")
        resp = self.client.post(
            reverse("comments:add_comment", kwargs={"post_id": self.post.pk}),
            {"content": "Great post!"},
        )
        self.assertEqual(resp.status_code, 302)
        self.assertEqual(Comment.objects.count(), 1)
        comment = Comment.objects.first()
        self.assertFalse(comment.approved)  # Pending by default

    def test_comment_not_visible_until_approved(self):
        Comment.objects.create(
            post=self.post, user=self.user, content="Pending", approved=False
        )
        resp = self.client.get(self.post.get_absolute_url())
        self.assertNotContains(resp, "Pending")

    def test_approved_comment_visible(self):
        Comment.objects.create(
            post=self.post, user=self.user, content="Approved comment", approved=True
        )
        resp = self.client.get(self.post.get_absolute_url())
        self.assertContains(resp, "Approved comment")

    def test_moderation_staff_only(self):
        resp = self.client.get(reverse("comments:moderate"))
        self.assertEqual(resp.status_code, 302)

        self.client.login(username="moderator", password="pass1234")
        resp = self.client.get(reverse("comments:moderate"))
        self.assertEqual(resp.status_code, 200)

    def test_approve_comment(self):
        comment = Comment.objects.create(
            post=self.post, user=self.user, content="Approve me", approved=False
        )
        self.client.login(username="moderator", password="pass1234")
        resp = self.client.get(
            reverse("comments:approve", kwargs={"comment_id": comment.pk})
        )
        comment.refresh_from_db()
        self.assertTrue(comment.approved)

    def test_delete_own_comment(self):
        comment = Comment.objects.create(
            post=self.post, user=self.user, content="Delete me", approved=True
        )
        self.client.login(username="commenter", password="pass1234")
        resp = self.client.get(
            reverse("comments:delete", kwargs={"comment_id": comment.pk})
        )
        self.assertEqual(Comment.objects.count(), 0)

    def test_cannot_delete_others_comment(self):
        other_user = User.objects.create_user("other", "o@example.com", "pass1234")
        comment = Comment.objects.create(
            post=self.post, user=other_user, content="Not yours", approved=True
        )
        self.client.login(username="commenter", password="pass1234")
        resp = self.client.get(
            reverse("comments:delete", kwargs={"comment_id": comment.pk})
        )
        self.assertEqual(Comment.objects.count(), 1)
