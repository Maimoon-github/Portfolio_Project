#!/usr/bin/env python
"""
Sample data creation script for the LMS backend.
This script creates sample content for testing the frontend-backend integration.
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
    
    # Get or create admin user
    admin_user = User.objects.filter(email='admin@example.com').first()
    if not admin_user:
        admin_user = User.objects.create_superuser(
            email='admin@example.com',
            username='admin',
            password='password123',
            role='admin'
        )
        print("Created admin user")
    
    # Create blog categories
    ai_category, _ = Category.objects.get_or_create(
        name='AI Research', 
        slug='ai-research'
    )
    tech_category, _ = Category.objects.get_or_create(
        name='Technology', 
        slug='technology'
    )
    
    # Create sample blog posts
    blog_posts = [
        {
            'title': 'The Future of Transformer Architectures in Natural Language Processing',
            'slug': 'future-transformer-architectures-nlp',
            'content': '''
            <p>Transformer architectures have revolutionized the field of Natural Language Processing (NLP) since their introduction in the "Attention Is All You Need" paper. As we look toward the future, several exciting developments are shaping the next generation of transformer models.</p>
            
            <h2>Current State of Transformers</h2>
            <p>Today's transformer models, including GPT, BERT, and T5, have achieved remarkable success across various NLP tasks. However, they also face significant challenges:</p>
            <ul>
                <li>Computational complexity that scales quadratically with sequence length</li>
                <li>Memory requirements that limit practical applications</li>
                <li>Difficulty in handling very long sequences</li>
            </ul>
            
            <h2>Emerging Architectures</h2>
            <p>Several innovative approaches are addressing these limitations:</p>
            <h3>Sparse Attention Mechanisms</h3>
            <p>Models like Longformer and BigBird use sparse attention patterns to reduce computational complexity while maintaining performance on long sequences.</p>
            
            <h3>Linear Attention</h3>
            <p>Approaches such as Performers and Linear Transformers approximate attention mechanisms with linear complexity.</p>
            
            <h2>Future Directions</h2>
            <p>The future of transformer architectures looks promising, with research focusing on:</p>
            <ul>
                <li>Hybrid architectures combining transformers with other neural network types</li>
                <li>More efficient attention mechanisms</li>
                <li>Better pre-training strategies</li>
                <li>Domain-specific optimizations</li>
            </ul>
            ''',
            'excerpt': 'Exploring the latest advances in transformer models and their impact on NLP applications, from GPT to specialized domain models.',
            'status': 'published',
            'featured': True,
            'published_at': timezone.now(),
            'author': admin_user,
            'category': ai_category,
            'meta_title': 'Future of Transformer Architectures in NLP',
            'meta_description': 'Discover the latest advances in transformer models and their revolutionary impact on natural language processing applications.',
            'focus_keyword': 'transformer architectures'
        },
        {
            'title': 'MLOps Best Practices: From Experiment to Production',
            'slug': 'mlops-best-practices-experiment-production',
            'content': '''
            <p>Machine Learning Operations (MLOps) has become crucial for organizations looking to deploy and maintain ML models at scale. This comprehensive guide covers the essential practices for moving from experimental models to production-ready systems.</p>
            
            <h2>The MLOps Lifecycle</h2>
            <p>A successful MLOps pipeline encompasses several key stages:</p>
            <ol>
                <li><strong>Data Management:</strong> Version control for datasets and feature stores</li>
                <li><strong>Model Development:</strong> Experiment tracking and reproducible environments</li>
                <li><strong>Model Deployment:</strong> Containerization and orchestration</li>
                <li><strong>Monitoring:</strong> Performance tracking and drift detection</li>
                <li><strong>Governance:</strong> Compliance and model lineage</li>
            </ol>
            
            <h2>Key Technologies and Tools</h2>
            <h3>Data Version Control</h3>
            <p>Tools like DVC (Data Version Control) and Pachyderm enable tracking of data changes and reproducible data pipelines.</p>
            
            <h3>Experiment Tracking</h3>
            <p>Platforms such as MLflow, Weights & Biases, and Neptune help track experiments, parameters, and metrics.</p>
            
            <h3>Model Serving</h3>
            <p>Solutions like Seldon, KFServing, and BentoML provide scalable model deployment options.</p>
            
            <h2>Best Practices</h2>
            <ul>
                <li>Implement continuous integration and deployment (CI/CD) for ML models</li>
                <li>Establish clear model versioning strategies</li>
                <li>Monitor model performance and data drift</li>
                <li>Implement proper testing strategies for ML code</li>
                <li>Ensure reproducibility across environments</li>
            </ul>
            ''',
            'excerpt': 'A comprehensive guide to implementing robust MLOps pipelines that scale from proof-of-concept to enterprise deployment.',
            'status': 'published',
            'featured': True,
            'published_at': timezone.now(),
            'author': admin_user,
            'category': tech_category,
            'meta_title': 'MLOps Best Practices Guide',
            'meta_description': 'Learn essential MLOps practices for deploying and maintaining machine learning models at scale in production.',
            'focus_keyword': 'MLOps best practices'
        }
    ]
    
    for post_data in blog_posts:
        post, created = BlogPost.objects.get_or_create(
            slug=post_data['slug'],
            defaults=post_data
        )
        if created:
            print(f"Created blog post: {post.title}")
    
    # Create news categories
    news_category, _ = NewsCategory.objects.get_or_create(
        name='Company News',
        slug='company-news'
    )
    
    # Create sample news items
    news_items = [
        {
            'title': 'New AI Research Lab Opens',
            'slug': 'new-ai-research-lab-opens',
            'body': 'We are excited to announce the opening of our new AI research laboratory focused on advancing machine learning technologies.',
            'status': 'published',
            'featured': True,
            'priority': 'high',
            'published_at': timezone.now(),
            'category': news_category,
            'meta_title': 'New AI Research Lab Opens',
            'meta_description': 'Announcement of our new AI research laboratory opening.'
        },
        {
            'title': 'Partnership with Leading Tech Companies',
            'slug': 'partnership-leading-tech-companies',
            'body': 'We have formed strategic partnerships with several leading technology companies to accelerate AI research and development.',
            'status': 'published',
            'featured': False,
            'priority': 'medium',
            'published_at': timezone.now(),
            'category': news_category,
            'meta_title': 'Strategic Tech Partnerships',
            'meta_description': 'New partnerships to accelerate AI research and development.'
        }
    ]
    
    for news_data in news_items:
        news, created = NewsItem.objects.get_or_create(
            slug=news_data['slug'],
            defaults=news_data
        )
        if created:
            print(f"Created news item: {news.title}")
    
    # Create technologies for projects
    technologies = [
        {'name': 'Python', 'category': 'Programming Language'},
        {'name': 'TensorFlow', 'category': 'ML Framework'},
        {'name': 'PyTorch', 'category': 'ML Framework'},
        {'name': 'React', 'category': 'Frontend Framework'},
        {'name': 'Django', 'category': 'Backend Framework'},
        {'name': 'Docker', 'category': 'DevOps'},
        {'name': 'Kubernetes', 'category': 'DevOps'},
    ]
    
    for tech_data in technologies:
        tech, created = Technology.objects.get_or_create(
            name=tech_data['name'],
            defaults=tech_data
        )
        if created:
            print(f"Created technology: {tech.name}")
    
    # Create sample projects
    projects = [
        {
            'title': 'AI-Powered Recommendation System',
            'slug': 'ai-powered-recommendation-system',
            'description': '''
            <p>A sophisticated recommendation system that uses machine learning algorithms to provide personalized content suggestions.</p>
            
            <h2>Key Features</h2>
            <ul>
                <li>Real-time recommendations based on user behavior</li>
                <li>Collaborative filtering and content-based filtering</li>
                <li>A/B testing framework for recommendation strategies</li>
                <li>Scalable architecture handling millions of users</li>
            </ul>
            
            <h2>Technology Stack</h2>
            <p>Built using Python, TensorFlow, and deployed on Kubernetes for scalability.</p>
            ''',
            'summary': 'A machine learning-based recommendation system providing personalized content suggestions with real-time capabilities.',
            'status': 'published',
            'featured': True,
            'project_type': 'ml',
            'completion_date': timezone.now().date(),
            'github_url': 'https://github.com/example/recommendation-system',
            'live_url': 'https://recommendations.example.com',
            'meta_title': 'AI Recommendation System Project',
            'meta_description': 'Advanced machine learning recommendation system with real-time personalization capabilities.'
        },
        {
            'title': 'Data Science Portfolio Website',
            'slug': 'data-science-portfolio-website',
            'description': '''
            <p>A modern, responsive portfolio website built for data scientists to showcase their work and research.</p>
            
            <h2>Features</h2>
            <ul>
                <li>Interactive data visualizations</li>
                <li>Project showcase with detailed case studies</li>
                <li>Blog integration for technical writing</li>
                <li>Contact forms and social media integration</li>
            </ul>
            
            <h2>Technical Implementation</h2>
            <p>Built with React, Django REST API, and deployed using modern DevOps practices.</p>
            ''',
            'summary': 'A comprehensive portfolio website designed specifically for data scientists and researchers.',
            'status': 'published',
            'featured': True,
            'project_type': 'web',
            'completion_date': timezone.now().date(),
            'github_url': 'https://github.com/example/portfolio-site',
            'live_url': 'https://portfolio.example.com',
            'meta_title': 'Data Science Portfolio Website',
            'meta_description': 'Modern portfolio website for data scientists with interactive visualizations and project showcases.'
        }
    ]
    
    for project_data in projects:
        project, created = Project.objects.get_or_create(
            slug=project_data['slug'],
            defaults=project_data
        )
        if created:
            # Add technologies to the project
            if project.title == 'AI-Powered Recommendation System':
                project.tech_stack.add(
                    Technology.objects.get(name='Python'),
                    Technology.objects.get(name='TensorFlow'),
                    Technology.objects.get(name='Docker'),
                    Technology.objects.get(name='Kubernetes')
                )
            elif project.title == 'Data Science Portfolio Website':
                project.tech_stack.add(
                    Technology.objects.get(name='React'),
                    Technology.objects.get(name='Django'),
                    Technology.objects.get(name='Python')
                )
            print(f"Created project: {project.title}")
    
    # Create course category
    course_category, _ = Category.objects.get_or_create(
        name='Machine Learning',
        slug='machine-learning'
    )
    
    # Create sample courses
    courses = [
        {
            'title': 'Introduction to Machine Learning',
            'slug': 'introduction-machine-learning',
            'description': '''
            <p>A comprehensive introduction to machine learning concepts, algorithms, and practical applications.</p>
            
            <h2>What You'll Learn</h2>
            <ul>
                <li>Fundamental machine learning concepts</li>
                <li>Supervised and unsupervised learning algorithms</li>
                <li>Model evaluation and validation techniques</li>
                <li>Hands-on projects with real datasets</li>
            </ul>
            
            <h2>Prerequisites</h2>
            <p>Basic programming knowledge and understanding of statistics.</p>
            ''',
            'subtitle': 'Master the fundamentals of machine learning',
            'status': 'published',
            'is_free': False,
            'price_cents': 9999,  # $99.99
            'level': 'beginner',
            'duration_hours': 40.0,
            'instructor': admin_user,
            'learning_outcomes': [
                'Understand key machine learning algorithms',
                'Build and evaluate ML models',
                'Apply ML to real-world problems',
                'Use popular ML libraries and tools'
            ],
            'meta_title': 'Introduction to Machine Learning Course',
            'meta_description': 'Learn machine learning fundamentals with hands-on projects and real-world applications.'
        }
    ]
    
    for course_data in courses:
        course, created = Course.objects.get_or_create(
            slug=course_data['slug'],
            defaults=course_data
        )
        if created:
            course.categories.add(course_category)
            print(f"Created course: {course.title}")
    
    # Create sample pages
    pages = [
        {
            'title': 'About',
            'slug': 'about',
            'content': '''
            <h1>About Dr. AI Researcher</h1>
            <p>Welcome to my data science portfolio. I am a passionate researcher and practitioner in the field of artificial intelligence and machine learning.</p>
            
            <h2>Background</h2>
            <p>With over 10 years of experience in data science and machine learning, I have worked on various projects ranging from natural language processing to computer vision applications.</p>
            
            <h2>Research Interests</h2>
            <ul>
                <li>Deep Learning and Neural Networks</li>
                <li>Natural Language Processing</li>
                <li>Computer Vision</li>
                <li>MLOps and Production ML Systems</li>
            </ul>
            
            <h2>Education</h2>
            <p>Ph.D. in Computer Science with specialization in Machine Learning</p>
            ''',
            'status': 'published',
            'template': 'about',
            'show_in_menu': True,
            'menu_title': 'About',
            'page_order': 1,
            'meta_title': 'About Dr. AI Researcher',
            'meta_description': 'Learn about Dr. AI Researcher, a passionate data scientist and machine learning expert.'
        },
        {
            'title': 'Contact',
            'slug': 'contact',
            'content': '''
            <h1>Contact Me</h1>
            <p>I'm always interested in discussing new opportunities, collaborations, and exciting projects in the field of data science and machine learning.</p>
            
            <h2>Get In Touch</h2>
            <p>Feel free to reach out through any of the following channels:</p>
            
            <div class="contact-info">
                <p><strong>Email:</strong> contact@example.com</p>
                <p><strong>LinkedIn:</strong> linkedin.com/in/airesearcher</p>
                <p><strong>Twitter:</strong> @airesearcher</p>
                <p><strong>GitHub:</strong> github.com/airesearcher</p>
            </div>
            
            <h2>Areas of Interest</h2>
            <ul>
                <li>Research collaborations</li>
                <li>Consulting opportunities</li>
                <li>Speaking engagements</li>
                <li>Open source contributions</li>
            </ul>
            ''',
            'status': 'published',
            'template': 'contact',
            'show_in_menu': True,
            'menu_title': 'Contact',
            'page_order': 2,
            'meta_title': 'Contact Dr. AI Researcher',
            'meta_description': 'Get in touch for collaborations, consulting, and speaking opportunities in data science and ML.'
        }
    ]
    
    for page_data in pages:
        page, created = Page.objects.get_or_create(
            slug=page_data['slug'],
            defaults=page_data
        )
        if created:
            print(f"Created page: {page.title}")
    
    print("\nSample data creation completed!")
    print("Created:")
    print(f"- {BlogPost.objects.count()} blog posts")
    print(f"- {NewsItem.objects.count()} news items")
    print(f"- {Project.objects.count()} projects")
    print(f"- {Course.objects.count()} courses")
    print(f"- {Page.objects.count()} pages")
