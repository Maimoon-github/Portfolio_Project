# apps/blog/tests/test_models.py
from django.test import TestCase
from django.contrib.auth.models import User
from .models import Category, Tag, Post, PostImage

class BlogModelsTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.category = Category.objects.create(name='Technology', slug='technology')
        self.tag = Tag.objects.create(name='Python', slug='python')
        self.post = Post.objects.create(
            title='Test Post',
            body='This is the body of the test post.',
            excerpt='A short excerpt for the test post.',
            category=self.category,
            author=self.user,
            featured=True
        )
        self.post.tags.add(self.tag)

    def test_category_model(self):
        self.assertEqual(self.category.name, 'Technology')
        self.assertEqual(self.category.slug, 'technology')

    def test_tag_model(self):
        self.assertEqual(self.tag.name, 'Python')
        self.assertEqual(self.tag.slug, 'python')

    def test_post_model(self):
        self.assertEqual(self.post.title, 'Test Post')
        self.assertEqual(self.post.category, self.category)
        self.assertEqual(self.post.author, self.user)
        self.assertTrue(self.post.featured)
        self.assertIn(self.tag, self.post.tags.all())
        self.assertIsNotNone(self.post.published_date)
        self.assertIsNotNone(self.post.updated_date)

    def test_post_image_model(self):
        image = PostImage.objects.create(
            post=self.post,
            image='test.jpg',
            order=1,
            caption='Test image'
        )
        self.assertEqual(image.post, self.post)
        self.assertEqual(image.order, 1)
        self.assertEqual(image.caption, 'Test image')

    def test_post_read_time(self):
        # Simple word count based calculation
        self.assertIsNotNone(self.post.read_time)

    def test_post_seo_fields(self):
        self.post.meta_title = 'Test Meta Title'
        self.post.meta_description = 'Test Meta Description'
        self.post.meta_keywords = 'test, keywords'
        self.post.save()
        
        self.assertEqual(self.post.get_meta_title(), 'Test Meta Title')
        self.assertEqual(self.post.get_meta_description(), 'Test Meta Description')
        self.assertEqual(self.post.get_meta_keywords(), 'test, keywords')
        self.assertEqual(self.post.get_meta_robots(), 'index, follow')