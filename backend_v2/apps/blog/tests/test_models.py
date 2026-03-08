from datetime import timedelta
from unittest.mock import patch, MagicMock

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.utils import timezone
from django.utils.text import slugify

from .models import Category, Post, PostImage, Tag

User = get_user_model()


class BaseModelTest(TestCase):
    """Base class with common setup for all model tests."""

    @classmethod
    def setUpTestData(cls):
        # Create a user for post authorship
        cls.user = User.objects.create_user(
            username="testuser", password="testpass"
        )

        # Create a category
        cls.category = Category.objects.create(
            name="Technology", description="Tech related posts"
        )

        # Create a tag
        cls.tag = Tag.objects.create(name="Python")

        # Create a sample post with minimal fields
        cls.post = Post.objects.create(
            title="Sample Post",
            author=cls.user,
            category=cls.category,
            content="This is a sample post content.",
            status=Post.Status.PUBLISHED,
            publish_date=timezone.now() - timedelta(days=1),
        )
        cls.post.tags.add(cls.tag)


class CategoryModelTest(BaseModelTest):
    """Test Category model."""

    def test_string_representation(self):
        self.assertEqual(str(self.category), "Technology")

    def test_slug_auto_generation(self):
        """Slug should be generated from name if not provided."""
        category = Category.objects.create(name="Artificial Intelligence")
        self.assertEqual(category.slug, slugify("Artificial Intelligence"))

    def test_get_absolute_url(self):
        url = self.category.get_absolute_url()
        expected = f"/blog/category/{self.category.slug}/"  # Adjust if your URL conf differs
        self.assertEqual(url, expected)


class TagModelTest(BaseModelTest):
    """Test Tag model."""

    def test_string_representation(self):
        self.assertEqual(str(self.tag), "Python")

    def test_slug_auto_generation(self):
        tag = Tag.objects.create(name="Django REST Framework")
        self.assertEqual(tag.slug, slugify("Django REST Framework"))

    def test_get_absolute_url(self):
        url = self.tag.get_absolute_url()
        expected = f"/blog/tag/{self.tag.slug}/"
        self.assertEqual(url, expected)


@patch("core.utils.sanitize_html", side_effect=lambda x: x)  # Mock sanitize to return input
class PostModelTest(BaseModelTest):
    """Test Post model."""

    def test_string_representation(self, mock_sanitize):
        self.assertEqual(str(self.post), "Sample Post")

    def test_slug_generation_on_save(self, mock_sanitize):
        """Slug should be generated from title if not provided."""
        post = Post.objects.create(
            title="New Post",
            author=self.user,
            category=self.category,
            content="Content here",
        )
        self.assertEqual(post.slug, slugify("New Post"))

    def test_slug_uniqueness(self, mock_sanitize):
        """If slug already exists, a counter should be appended."""
        post1 = Post.objects.create(
            title="Unique Title",
            author=self.user,
            category=self.category,
            content="First",
        )
        post2 = Post.objects.create(
            title="Unique Title",
            author=self.user,
            category=self.category,
            content="Second",
        )
        self.assertEqual(post1.slug, slugify("Unique Title"))
        self.assertEqual(post2.slug, slugify("Unique Title-1"))

    def test_excerpt_auto_generation(self, mock_sanitize):
        """Excerpt should be generated from content if not provided."""
        long_content = "word " * 300  # 300 words, approx 1500 chars
        post = Post.objects.create(
            title="Long Post",
            author=self.user,
            category=self.category,
            content=long_content,
        )
        # Excerpt should be first 497 chars + "..."
        self.assertTrue(post.excerpt.endswith("..."))
        self.assertLessEqual(len(post.excerpt), 500)
        self.assertEqual(post.excerpt[:497], long_content[:497])

    def test_excerpt_not_overwritten(self, mock_sanitize):
        """If excerpt is provided, it should not be auto-generated."""
        custom_excerpt = "Custom summary."
        post = Post.objects.create(
            title="Post with Excerpt",
            author=self.user,
            category=self.category,
            content="Some long content that would generate an excerpt.",
            excerpt=custom_excerpt,
        )
        self.assertEqual(post.excerpt, custom_excerpt)

    def test_read_time_calculation(self, mock_sanitize):
        """Read time should be based on word count (200 wpm)."""
        content = "word " * 400  # 400 words
        post = Post.objects.create(
            title="Read Time Test",
            author=self.user,
            category=self.category,
            content=content,
        )
        self.assertEqual(post.read_time, 2)  # 400/200 = 2

        # Minimum of 1 minute for very short posts
        post2 = Post.objects.create(
            title="Short Post",
            author=self.user,
            category=self.category,
            content="Just a few words.",
        )
        self.assertEqual(post2.read_time, 1)

    def test_sanitize_html_called(self, mock_sanitize):
        """save() should call sanitize_html on content."""
        post = Post(
            title="Dirty HTML",
            author=self.user,
            category=self.category,
            content="<script>alert('xss')</script><p>Safe</p>",
        )
        post.save()
        mock_sanitize.assert_called_once_with("<script>alert('xss')</script><p>Safe</p>")

    def test_published_manager(self, mock_sanitize):
        """Published manager should return only published posts with publish_date <= now."""
        now = timezone.now()
        # Create posts with different statuses and dates
        published_post = Post.objects.create(
            title="Published",
            author=self.user,
            category=self.category,
            content="OK",
            status=Post.Status.PUBLISHED,
            publish_date=now - timedelta(days=1),
        )
        draft_post = Post.objects.create(
            title="Draft",
            author=self.user,
            category=self.category,
            content="No",
            status=Post.Status.DRAFT,
            publish_date=now,
        )
        scheduled_post = Post.objects.create(
            title="Scheduled",
            author=self.user,
            category=self.category,
            content="Future",
            status=Post.Status.PUBLISHED,
            publish_date=now + timedelta(days=1),
        )

        published_qs = Post.published.all()
        self.assertIn(published_post, published_qs)
        self.assertNotIn(draft_post, published_qs)
        self.assertNotIn(scheduled_post, published_qs)

    def test_is_published_property(self, mock_sanitize):
        """is_published should be True for published posts with publish_date <= now."""
        now = timezone.now()
        post_published = Post(
            status=Post.Status.PUBLISHED, publish_date=now - timedelta(hours=1)
        )
        post_draft = Post(status=Post.Status.DRAFT, publish_date=now)
        post_scheduled = Post(
            status=Post.Status.PUBLISHED, publish_date=now + timedelta(days=1)
        )
        self.assertTrue(post_published.is_published)
        self.assertFalse(post_draft.is_published)
        self.assertFalse(post_scheduled.is_published)

    def test_seo_title_property(self, mock_sanitize):
        """seo_title should return meta_title if set, else title."""
        post = Post(title="Regular Title")
        self.assertEqual(post.seo_title, "Regular Title")
        post.meta_title = "Custom SEO Title"
        self.assertEqual(post.seo_title, "Custom SEO Title")

    def test_seo_description_property(self, mock_sanitize):
        """seo_description should return meta_description if set, else excerpt truncated."""
        post = Post(excerpt="This is a short excerpt.")
        self.assertEqual(post.seo_description, "This is a short excerpt.")
        post.meta_description = "Custom meta desc"
        self.assertEqual(post.seo_description, "Custom meta desc")

        # Truncation when excerpt longer than 160
        long_excerpt = "a" * 200
        post.excerpt = long_excerpt
        post.meta_description = ""
        self.assertEqual(post.seo_description, long_excerpt[:160])

    def test_increment_views(self, mock_sanitize):
        """increment_views should atomically increase view_count."""
        post = self.post
        initial = post.view_count
        post.increment_views()
        post.refresh_from_db()
        self.assertEqual(post.view_count, initial + 1)

    def test_get_absolute_url(self, mock_sanitize):
        url = self.post.get_absolute_url()
        expected = f"/blog/post/{self.post.slug}/"  # Adjust to your URL conf
        self.assertEqual(url, expected)

    def test_approved_comments_count_property(self, mock_sanitize):
        """
        approved_comments_count should return count of approved comments.
        This test mocks the reverse 'comments' relation to avoid needing a Comment model.
        """
        post = self.post
        # Create a mock for the comments manager that returns a filtered count
        mock_comments = MagicMock()
        mock_comments.filter.return_value.count.return_value = 3
        post.comments = mock_comments

        count = post.approved_comments_count
        self.assertEqual(count, 3)
        mock_comments.filter.assert_called_once_with(approved=True)
        mock_comments.filter.return_value.count.assert_called_once()


class PostImageModelTest(TestCase):
    """Test PostImage model."""

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username="author", password="pass")
        cls.category = Category.objects.create(name="Science")
        cls.post = Post.objects.create(
            title="Image Post",
            author=cls.user,
            category=cls.category,
            content="Content",
        )

    def test_string_representation(self):
        image = PostImage.objects.create(post=self.post, image="test.jpg")
        self.assertEqual(str(image), f"Image for {self.post.title}")

    def test_ordering(self):
        img1 = PostImage.objects.create(post=self.post, image="a.jpg", order=2)
        img2 = PostImage.objects.create(post=self.post, image="b.jpg", order=1)
        images = PostImage.objects.all()
        self.assertEqual(images[0], img2)
        self.assertEqual(images[1], img1)

    def test_default_order(self):
        img = PostImage.objects.create(post=self.post, image="c.jpg")
        self.assertEqual(img.order, 0)

    def test_caption_and_alt_text(self):
        img = PostImage.objects.create(
            post=self.post,
            image="d.jpg",
            caption="Nice view",
            alt_text="A beautiful landscape",
        )
        self.assertEqual(img.caption, "Nice view")
        self.assertEqual(img.alt_text, "A beautiful landscape")