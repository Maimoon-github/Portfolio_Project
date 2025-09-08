#!/usr/bin/env python
"""
Simple sample data creation script for the LMS backend.
"""

import os
import sys
import django

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lms_backend.settings")
    django.setup()
    
    from django.contrib.auth import get_user_model
    from lms_backend.blog.models import BlogPost
    from lms_backend.news.models import NewsItem, NewsCategory
    from lms_backend.projects.models import Project, Technology
    from lms_backend.courses.models import Course, Category, Tag
    from lms_backend.pages.models import Page
    from django.utils import timezone
    
    User = get_user_model()
    
    # Get admin user
    admin_user = User.objects.filter(email='admin@example.com').first()
    if not admin_user:
        print("No admin user found. Creating one...")
        admin_user = User.objects.create_superuser(
            email='admin@example.com',
            username='admin',
            password='admin123',
            role='admin'
        )
    
    # Create categories
    tech_category, _ = Category.objects.get_or_create(
        name='Technology', 
        slug='technology'
    )
    
    # Create tags
    ai_tag, _ = Tag.objects.get_or_create(
        name='AI', 
        slug='ai'
    )
    
    # Create a simple blog post
    blog_post, created = BlogPost.objects.get_or_create(
        slug='sample-blog-post',
        defaults={
            'title': 'Sample Blog Post',
            'excerpt': 'This is a sample blog post to test the backend functionality.',
            'content': 'This is the content of the sample blog post. It demonstrates that the blog system is working correctly.',
            'status': 'published',
            'featured': True,
            'published_at': timezone.now(),
            'author': admin_user,
            'meta_title': 'Sample Blog Post',
            'meta_description': 'A sample blog post for testing.',
        }
    )
    if created:
        blog_post.categories.add(tech_category)
        blog_post.tags.add(ai_tag)
        print(f"Created blog post: {blog_post.title}")
    
    # Create technologies
    python_tech, _ = Technology.objects.get_or_create(
        name='Python',
        slug='python',
        icon='python'
    )
    
    django_tech, _ = Technology.objects.get_or_create(
        name='Django',
        slug='django',
        icon='django'
    )
    
    # Create a simple project
    project, created = Project.objects.get_or_create(
        slug='sample-project',
        defaults={
            'title': 'Sample Project',
            'summary': 'A sample project to demonstrate the portfolio functionality.',
            'description': 'This is a detailed description of the sample project.',
            'project_type': 'web',
            'status': 'published',
            'featured': True,
            'published_at': timezone.now(),
            'meta_title': 'Sample Project',
            'meta_description': 'A sample project for testing.',
        }
    )
    if created:
        project.tech_stack.add(python_tech, django_tech)
        print(f"Created project: {project.title}")
    
    # Create news category
    news_category, _ = NewsCategory.objects.get_or_create(
        name='General',
        slug='general'
    )
    
    # Create a simple news item
    news_item, created = NewsItem.objects.get_or_create(
        slug='sample-news',
        defaults={
            'title': 'Sample News Item',
            'body': 'This is a sample news item to test the news functionality.',
            'status': 'published',
            'published_at': timezone.now(),
            'category': news_category,
            'priority': 'medium',
            'meta_title': 'Sample News',
            'meta_description': 'A sample news item for testing.',
        }
    )
    if created:
        print(f"Created news item: {news_item.title}")
    
    # Create a simple course
    course, created = Course.objects.get_or_create(
        slug='sample-course',
        defaults={
            'title': 'Sample Course',
            'subtitle': 'Learn the basics',
            'description': 'This is a sample course to test the LMS functionality.',
            'level': 'beginner',
            'duration_hours': 5.0,
            'is_free': True,
            'status': 'published',
            'published_at': timezone.now(),
            'instructor': admin_user,
            'meta_title': 'Sample Course',
            'meta_description': 'A sample course for testing.',
        }
    )
    if created:
        course.categories.add(tech_category)
        course.tags.add(ai_tag)
        print(f"Created course: {course.title}")
    
    # Create a simple page
    page, created = Page.objects.get_or_create(
        slug='sample-page',
        defaults={
            'title': 'Sample Page',
            'content': 'This is a sample page to test the page management functionality.',
            'template': 'default',
            'status': 'published',
            'published_at': timezone.now(),
            'meta_title': 'Sample Page',
            'meta_description': 'A sample page for testing.',
        }
    )
    if created:
        print(f"Created page: {page.title}")
    
    print("\nSample data creation completed!")
    print("You can now access the admin at http://localhost:8000/admin/")
    print("Login with: admin@example.com / admin123")