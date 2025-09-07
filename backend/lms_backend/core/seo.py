"""
Utilities for structured data and SEO optimization.
"""

import json
from django.urls import reverse


def generate_course_schema(course, request=None):
    """
    Generate JSON-LD schema.org markup for Course.
    """
    base_url = get_base_url(request)
    
    course_schema = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": course.title,
        "description": course.description,
        "provider": {
            "@type": "Organization",
            "name": "Data Science Portfolio",
            "sameAs": base_url
        }
    }
    
    # Add course image if available
    if course.thumbnail:
        course_schema["image"] = f"{base_url}{course.thumbnail.url}"
    
    # Add educational level
    if course.level:
        level_map = {
            'beginner': 'Beginner',
            'intermediate': 'Intermediate',
            'advanced': 'Advanced'
        }
        course_schema["educationalLevel"] = level_map.get(course.level, course.level)
    
    # Add price information
    if course.is_free:
        course_schema["offers"] = {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        }
    else:
        course_schema["offers"] = {
            "@type": "Offer",
            "price": str(course.price_cents / 100),
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        }
    
    # Add learning outcomes if available
    if course.learning_outcomes:
        course_schema["teaches"] = course.learning_outcomes
    
    # Add instructor information
    instructor = course.instructor
    if instructor:
        course_schema["instructor"] = {
            "@type": "Person",
            "name": f"{instructor.first_name} {instructor.last_name}".strip() or instructor.username
        }
    
    # Add aggregate rating if available
    if hasattr(course, 'rating_avg') and course.rating_avg:
        course_schema["aggregateRating"] = {
            "@type": "AggregateRating",
            "ratingValue": str(course.rating_avg),
            "bestRating": "5",
            "ratingCount": course.reviews.count()
        }
    
    return json.dumps(course_schema)


def generate_blog_schema(post, request=None):
    """
    Generate JSON-LD schema.org markup for BlogPosting.
    """
    base_url = get_base_url(request)
    
    blog_schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "datePublished": post.published_at.isoformat() if post.published_at else post.created_at.isoformat(),
        "dateModified": post.updated_at.isoformat(),
        "description": post.excerpt,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": f"{base_url}{post.get_absolute_url()}"
        }
    }
    
    # Add author information
    author = post.author
    if author:
        blog_schema["author"] = {
            "@type": "Person",
            "name": f"{author.first_name} {author.last_name}".strip() or author.username
        }
    
    # Add image if available
    if post.cover_image:
        blog_schema["image"] = f"{base_url}{post.cover_image.url}"
    
    # Add publisher information
    blog_schema["publisher"] = {
        "@type": "Organization",
        "name": "Data Science Portfolio",
        "logo": {
            "@type": "ImageObject",
            "url": f"{base_url}/static/images/logo.png"  # Update with actual logo path
        }
    }
    
    return json.dumps(blog_schema)


def generate_project_schema(project, request=None):
    """
    Generate JSON-LD schema.org markup for Project as CreativeWork.
    """
    base_url = get_base_url(request)
    
    project_schema = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": project.title,
        "description": project.summary,
        "dateCreated": project.completion_date.isoformat() if project.completion_date else project.created_at.isoformat(),
        "dateModified": project.updated_at.isoformat()
    }
    
    # Add image if available
    if project.thumbnail:
        project_schema["image"] = f"{base_url}{project.thumbnail.url}"
    
    # Add URLs if available
    if project.github_url:
        project_schema["codeRepository"] = project.github_url
    
    if project.live_url:
        project_schema["url"] = project.live_url
    
    if project.demo_video:
        project_schema["video"] = project.demo_video
    
    # Add keywords from tech stack
    tech_stack = [tech.name for tech in project.tech_stack.all()]
    if tech_stack:
        project_schema["keywords"] = ", ".join(tech_stack)
    
    return json.dumps(project_schema)


def generate_page_schema(page, request=None):
    """
    Generate JSON-LD schema.org markup for WebPage with breadcrumb.
    """
    base_url = get_base_url(request)
    
    page_schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": page.title,
        "description": page.meta_description,
        "dateModified": page.updated_at.isoformat(),
        "url": f"{base_url}{page.get_absolute_url()}"
    }
    
    # Add breadcrumb if page has ancestors
    if hasattr(page, 'get_ancestors') and callable(page.get_ancestors):
        ancestors = page.get_ancestors(include_self=True)
        if ancestors:
            breadcrumb_list = {
                "@type": "BreadcrumbList",
                "itemListElement": []
            }
            
            for i, ancestor in enumerate(ancestors, start=1):
                breadcrumb_list["itemListElement"].append({
                    "@type": "ListItem",
                    "position": i,
                    "name": ancestor.title,
                    "item": f"{base_url}{ancestor.get_absolute_url()}"
                })
            
            page_schema["breadcrumb"] = breadcrumb_list
    
    return json.dumps(page_schema)


def get_base_url(request):
    """
    Get the base URL for the site based on the request or settings.
    """
    if request:
        return f"{request.scheme}://{request.get_host()}"
    
    # Default base URL for when request is not available
    return "https://datascientist-portfolio.example.com"  # Update with actual domain
