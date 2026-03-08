from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone

from .models import Category, Post, Tag

User = get_user_model()


class PostModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user("author", "author@example.com", "pass1234")
        self.category = Category.objects.create(name="Tech", slug="tech")
        self.post = Post.objects.create(
            title="Test Post",
            content="Lorem ipsum dolor sit amet.",
            author=self.user,
            category=self.category,
            status="published",
            publish_date=timezone.now(),
        )

    def test_slug_auto_generated(self):
        self.assertEqual(self.post.slug, "test-post")

    def test_slug_uniqueness(self):
        post2 = Post.objects.create(
            title="Test Post",
            content="Different content.",
            author=self.user,
            status="published",
        )
        self.assertNotEqual(self.post.slug, post2.slug)

    def test_published_manager(self):
        draft = Post.objects.create(
            title="Draft Post",
            content="Hidden.",
            author=self.user,
            status="draft",
        )
        published = Post.published.all()
        self.assertIn(self.post, published)
        self.assertNotIn(draft, published)

    def test_get_absolute_url(self):
        self.assertEqual(self.post.get_absolute_url(), f"/{self.post.slug}/")

    def test_seo_title_fallback(self):
        self.assertEqual(self.post.seo_title, "Test Post")
        self.post.meta_title = "Custom SEO Title"
        self.assertEqual(self.post.seo_title, "Custom SEO Title")

    def test_view_count_increment(self):
        self.post.increment_views()
        self.post.refresh_from_db()
        self.assertEqual(self.post.view_count, 1)


class CategoryModelTest(TestCase):
    def test_slug_auto_generated(self):
        cat = Category.objects.create(name="Web Development")
        self.assertEqual(cat.slug, "web-development")


class PostViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user("author", "author@example.com", "pass1234")
        self.post = Post.objects.create(
            title="Published Post",
            slug="published-post",
            content="Content here.",
            author=self.user,
            status="published",
            publish_date=timezone.now(),
        )

    def test_post_list_loads(self):
        resp = self.client.get(reverse("blog:post_list"))
        self.assertEqual(resp.status_code, 200)
        self.assertContains(resp, "Published Post")

    def test_post_detail_loads(self):
        resp = self.client.get(reverse("blog:post_detail", kwargs={"slug": "published-post"}))
        self.assertEqual(resp.status_code, 200)

    def test_draft_hidden_from_anonymous(self):
        draft = Post.objects.create(
            title="Secret Draft",
            slug="secret-draft",
            content="Hidden.",
            author=self.user,
            status="draft",
        )
        resp = self.client.get(reverse("blog:post_detail", kwargs={"slug": "secret-draft"}))
        self.assertEqual(resp.status_code, 404)

    def test_search(self):
        resp = self.client.get(reverse("blog:post_search"), {"q": "Published"})
        self.assertEqual(resp.status_code, 200)
        self.assertContains(resp, "Published Post")

    def test_search_empty_query(self):
        resp = self.client.get(reverse("blog:post_search"), {"q": ""})
        self.assertEqual(resp.status_code, 200)


class SitemapTest(TestCase):
    def setUp(self):
        user = User.objects.create_user("author", "a@example.com", "pass1234")
        Post.objects.create(
            title="Sitemap Test",
            content=".",
            author=user,
            status="published",
            publish_date=timezone.now(),
        )

    def test_sitemap_loads(self):
        resp = self.client.get("/sitemap.xml")
        self.assertEqual(resp.status_code, 200)
        self.assertIn("xml", resp["Content-Type"])
