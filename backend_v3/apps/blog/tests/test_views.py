# apps/blog/tests/test_views.py
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Post, Category, Tag

class BlogViewsTest(TestCase):
    def setUp(self):
        self.client = Client()
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

    def test_post_list_view(self):
        response = self.client.get(reverse('blog:post-list'))
        self.assertEqual(response.status_code, 200)
        # default DRF paginated response structure
        self.assertIn('results', response.data)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['title'], 'Test Post')

    def test_post_detail_view(self):
        response = self.client.get(reverse('blog:post-detail', args=[self.post.slug]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['title'], 'Test Post')

    def test_related_posts_view(self):
        # Create another post in same category
        post2 = Post.objects.create(
            title='Another Post',
            body='Body 2',
            excerpt='Excerpt 2',
            category=self.category,
            author=self.user
        )
        post2.tags.add(self.tag)
        
        response = self.client.get(reverse('blog:related-posts', args=[self.post.slug]))
        self.assertEqual(response.status_code, 200)
        # Related endpoint returns simple list
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Another Post')