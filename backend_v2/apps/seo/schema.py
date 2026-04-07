"""
JSON-LD Schema.org Structured Data Generation.

This module provides comprehensive Schema.org markup generation for various
content types including Article, BlogPosting, FAQPage, and HowTo. It extracts
structured data from HTML content where applicable and generates valid JSON-LD
for search engine rich snippets.

Integration:
    - Uses django-meta settings for site protocol and defaults
    - Integrates with extruct for schema validation
    - Returns Python dictionaries that can be serialized to JSON-LD
"""

import json
import logging
from typing import Any, Dict, List, Optional, Union
from urllib.parse import urljoin

from bs4 import BeautifulSoup
from django.conf import settings
from django.utils.timezone import is_aware

from .constants import META_SITE_PROTOCOL

logger = logging.getLogger(__name__)


# =============================================================================
# BASE SCHEMA BUILDER
# =============================================================================


def _get_base_schema(post: Any, post_seo: Any) -> Dict[str, Any]:
    """
    Build base schema properties shared across all schema types.
    
    Args:
        post: The blog Post model instance.
        post_seo: The PostSEO companion model instance.
        
    Returns:
        Dictionary with base schema.org properties.
    """
    # Get absolute URL
    url = post.get_absolute_url() if hasattr(post, 'get_absolute_url') else ''
    
    # Build full URL with protocol
    if url and not url.startswith(('http://', 'https://')):
        protocol = META_SITE_PROTOCOL
        domain = getattr(settings, 'SITE_DOMAIN', 'localhost')
        url = f"{protocol}://{domain}{url}"
    
    # Author information
    author = getattr(post, 'author', None)
    author_name = ''
    author_url = ''
    if author:
        author_name = getattr(author, 'get_full_name', lambda: '')() or \
                     getattr(author, 'username', '') or \
                     getattr(author, 'name', '')
        # Try to get author profile URL if available
        if hasattr(author, 'get_absolute_url'):
            author_url = urljoin(url, author.get_absolute_url()) if url else ''
    
    # Publisher/Organization info from settings
    site_name = getattr(settings, 'SITE_NAME', 'Site')
    
    # Image handling
    image_url = None
    if post_seo and post_seo.og_image:
        image_url = post_seo.og_image.url
    elif hasattr(post, 'featured_image') and post.featured_image:
        image_url = post.featured_image.url
    
    if image_url and not image_url.startswith(('http://', 'https://')):
        protocol = META_SITE_PROTOCOL
        domain = getattr(settings, 'SITE_DOMAIN', 'localhost')
        image_url = f"{protocol}://{domain}{image_url}"
    
    # Dates
    published = getattr(post, 'published_at', None) or getattr(post, 'created_at', None)
    modified = getattr(post, 'updated_at', None)
    
    # Format dates to ISO 8601
    date_published = ''
    date_modified = ''
    if published:
        if is_aware(published):
            date_published = published.isoformat()
        else:
            date_published = published.isoformat() + 'Z'
    
    if modified:
        if is_aware(modified):
            date_modified = modified.isoformat()
        else:
            date_modified = modified.isoformat() + 'Z'
    
    # Headline (prioritize SEO title, fall back to post title)
    headline = post_seo.seo_title if post_seo and post_seo.seo_title else \
               getattr(post, 'title', '')
    
    # Description
    description = post_seo.meta_description if post_seo and post_seo.meta_description else \
                  getattr(post, 'excerpt', '') or \
                  getattr(post, 'summary', '')
    
    base = {
        "@context": "https://schema.org",
        "url": url,
        "headline": headline,
        "description": description,
        "datePublished": date_published,
        "dateModified": date_modified or date_published,
        "author": {
            "@type": "Person",
            "name": author_name or "Unknown",
        },
        "publisher": {
            "@type": "Organization",
            "name": site_name,
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        }
    }
    
    # Add author URL if available
    if author_url:
        base["author"]["url"] = author_url
    
    # Add image if available
    if image_url:
        base["image"] = {
            "@type": "ImageObject",
            "url": image_url
        }
    
    # Add keywords from focus keyphrase
    if post_seo and post_seo.focus_keyphrase:
        keywords = [post_seo.focus_keyphrase]
        if post_seo.secondary_keyphrases:
            keywords.extend(post_seo.secondary_keyphrases)
        base["keywords"] = ", ".join(keywords)
    
    # Remove empty values
    return {k: v for k, v in base.items() if v and v not in ('', 'Z', 'Unknown')}


# =============================================================================
# SPECIFIC SCHEMA RENDERERS
# =============================================================================


def render_article_schema(post: Any, post_seo: Any) -> Dict[str, Any]:
    """
    Generate Article schema.org markup.
    
    Args:
        post: The blog Post model instance.
        post_seo: The PostSEO companion model instance.
        
    Returns:
        Dictionary representing Article schema.
    """
    schema = _get_base_schema(post, post_seo)
    schema["@type"] = "Article"
    
    # Add article body if available
    body = getattr(post, 'body', '')
    if body:
        # Strip HTML for articleBody
        soup = BeautifulSoup(body, 'html.parser')
        schema["articleBody"] = soup.get_text(separator=' ', strip=True)
    
    # Word count if available
    if post_seo and post_seo.seo_score_breakdown:
        word_count = post_seo.seo_score_breakdown.get('word_count')
        if word_count:
            schema["wordCount"] = word_count
    
    # Article section/category
    if hasattr(post, 'category'):
        category = post.category
        if category:
            schema["articleSection"] = getattr(category, 'name', str(category))
    
    return schema


def render_blogposting_schema(post: Any, post_seo: Any) -> Dict[str, Any]:
    """
    Generate BlogPosting schema.org markup (subtype of Article).
    
    Args:
        post: The blog Post model instance.
        post_seo: The PostSEO companion model instance.
        
    Returns:
        Dictionary representing BlogPosting schema.
    """
    # BlogPosting is essentially Article with different @type
    schema = render_article_schema(post, post_seo)
    schema["@type"] = "BlogPosting"
    return schema


def render_faq_schema(post: Any, post_seo: Any) -> Dict[str, Any]:
    """
    Generate FAQPage schema.org markup with extracted Q&A pairs.
    
    Extracts questions and answers from HTML content by detecting:
    - Headings ending with ? (questions)
    - Following content blocks as answers
    
    Args:
        post: The blog Post model instance.
        post_seo: The PostSEO companion model instance.
        
    Returns:
        Dictionary representing FAQPage schema.
    """
    schema = _get_base_schema(post, post_seo)
    schema["@type"] = "FAQPage"
    
    # Extract Q&A from body
    body = getattr(post, 'body', '')
    if not body:
        schema["mainEntity"] = []
        return schema
    
    soup = BeautifulSoup(body, 'html.parser')
    main_entity = []
    
    # Find potential question headings (h2, h3, h4 ending with ?)
    question_keywords = ('what', 'how', 'why', 'when', 'where', 'who', 'which', 'can', 'do', 'is', 'are', 'does')
    
    for heading in soup.find_all(['h2', 'h3', 'h4']):
        text = heading.get_text(strip=True)
        
        # Check if it looks like a question
        is_question = text.endswith('?') or text.lower().startswith(question_keywords)
        
        if is_question:
            # Find the answer (next sibling elements until next heading)
            answer_parts = []
            sibling = heading.find_next_sibling()
            
            while sibling and sibling.name not in ['h2', 'h3', 'h4']:
                if sibling.name in ['p', 'div', 'ul', 'ol']:
                    text_content = sibling.get_text(strip=True)
                    if text_content:
                        answer_parts.append(text_content)
                sibling = sibling.find_next_sibling()
            
            if answer_parts:
                main_entity.append({
                    "@type": "Question",
                    "name": text,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": " ".join(answer_parts)
                    }
                })
    
    schema["mainEntity"] = main_entity
    return schema


def render_howto_schema(post: Any, post_seo: Any) -> Dict[str, Any]:
    """
    Generate HowTo schema.org markup with extracted steps.
    
    Extracts steps from:
    - Ordered lists (ol) with step indicators
    - Headings containing "Step X" patterns
    - Numbered sections
    
    Args:
        post: The blog Post model instance.
        post_seo: The PostSEO companion model instance.
        
    Returns:
        Dictionary representing HowTo schema.
    """
    schema = _get_base_schema(post, post_seo)
    schema["@type"] = "HowTo"
    
    body = getattr(post, 'body', '')
    if not body:
        schema["step"] = []
        return schema
    
    soup = BeautifulSoup(body, 'html.parser')
    steps = []
    step_counter = 1
    
    # Method 1: Look for ordered lists that look like steps
    for ol in soup.find_all('ol'):
        items = ol.find_all('li', recursive=False)
        if len(items) >= 2:  # At least 2 steps to be a how-to
            for li in items:
                step_text = li.get_text(strip=True)
                if step_text:
                    steps.append({
                        "@type": "HowToStep",
                        "position": step_counter,
                        "text": step_text
                    })
                    step_counter += 1
    
    # Method 2: If no steps found via OL, look for headings with step indicators
    if not steps:
        step_keywords = ['step', 'step', 'phase', 'stage']
        for heading in soup.find_all(['h2', 'h3']):
            text = heading.get_text(strip=True).lower()
            
            # Check if heading contains step indicators
            is_step = any(kw in text for kw in step_keywords) or \
                     re.match(r'^\d+\.', heading.get_text(strip=True))
            
            if is_step:
                # Get content until next heading
                step_content = []
                sibling = heading.find_next_sibling()
                
                while sibling and sibling.name not in ['h2', 'h3']:
                    if sibling.name in ['p', 'div']:
                        content = sibling.get_text(strip=True)
                        if content:
                            step_content.append(content)
                    sibling = sibling.find_next_sibling()
                
                if step_content:
                    steps.append({
                        "@type": "HowToStep",
                        "position": step_counter,
                        "name": heading.get_text(strip=True),
                        "text": " ".join(step_content)
                    })
                    step_counter += 1
    
    schema["step"] = steps
    
    # Add estimated time if available (reading time from post_seo or calculate)
    if steps and post_seo and hasattr(post_seo, 'word_count'):
        # Rough estimate: 2 minutes per step
        total_minutes = len(steps) * 2
        schema["totalTime"] = f"PT{total_minutes}M"
    
    return schema


# =============================================================================
# MAIN ENTRY POINT
# =============================================================================


def get_schema_json_ld(post: Any, post_seo: Any) -> str:
    """
    Generate JSON-LD string based on post_seo.schema_type.
    
    Main entry point for schema generation. Determines which schema type
    to render based on the post_seo.schema_type field and returns properly
    formatted JSON-LD script content.
    
    Args:
        post: The blog Post model instance.
        post_seo: The PostSEO companion model instance.
        
    Returns:
        JSON string suitable for embedding in <script type="application/ld+json">.
        Returns empty string if generation fails.
        
    Example:
        >>> schema_json = get_schema_json_ld(post, post.seo)
        >>> print(schema_json)
        {"@context": "https://schema.org", "@type": "BlogPosting", ...}
    """
    if not post_seo:
        return ""
    
    schema_type = getattr(post_seo, 'schema_type', 'BlogPosting')
    
    try:
        if schema_type == 'Article':
            schema = render_article_schema(post, post_seo)
        elif schema_type == 'BlogPosting':
            schema = render_blogposting_schema(post, post_seo)
        elif schema_type == 'FAQPage':
            schema = render_faq_schema(post, post_seo)
        elif schema_type == 'HowTo':
            schema = render_howto_schema(post, post_seo)
        elif schema_type == 'NewsArticle':
            schema = render_article_schema(post, post_seo)
            schema["@type"] = "NewsArticle"
        elif schema_type == 'TechArticle':
            schema = render_article_schema(post, post_seo)
            schema["@type"] = "TechArticle"
        elif schema_type == 'ScholarlyArticle':
            schema = render_article_schema(post, post_seo)
            schema["@type"] = "ScholarlyArticle"
        else:
            # Default to BlogPosting for unknown types
            schema = render_blogposting_schema(post, post_seo)
        
        # Add any extra schema properties from post_seo.schema_extra
        if post_seo.schema_extra and isinstance(post_seo.schema_extra, dict):
            schema.update(post_seo.schema_extra)
        
        # Remove None values and empty strings
        cleaned_schema = _clean_schema_dict(schema)
        
        return json.dumps(cleaned_schema, indent=2, ensure_ascii=False)
        
    except Exception as e:
        logger.error(f"Error generating schema for post {getattr(post, 'pk', 'unknown')}: {e}")
        return ""


def _clean_schema_dict(d: Dict[str, Any]) -> Dict[str, Any]:
    """
    Recursively remove None values and empty strings from schema dict.
    
    Args:
        d: Dictionary to clean.
        
    Returns:
        Cleaned dictionary.
    """
    if not isinstance(d, dict):
        return d
    
    cleaned = {}
    for k, v in d.items():
        if v is None or v == '' or v == []:
            continue
        if isinstance(v, dict):
            cleaned_v = _clean_schema_dict(v)
            if cleaned_v:  # Only add if not empty
                cleaned[k] = cleaned_v
        elif isinstance(v, list):
            cleaned_list = [_clean_schema_dict(i) if isinstance(i, dict) else i for i in v]
            cleaned_list = [i for i in cleaned_list if i is not None and i != '']
            if cleaned_list:
                cleaned[k] = cleaned_list
        else:
            cleaned[k] = v
    
    return cleaned


# =============================================================================
# SCHEMA VALIDATION
# =============================================================================


def validate_schema_with_extruct(html_content: str) -> Dict[str, Any]:
    """
    Validate schema markup using extruct library.
    
    Parses rendered HTML to extract and validate JSON-LD, Microdata, and
    RDFa structured data. Useful for testing and debugging schema output.
    
    Args:
        html_content: Full HTML page content containing schema markup.
        
    Returns:
        Dictionary with extracted structured data by format:
        {
            'json-ld': [...],
            'microdata': [...],
            'rdfa': [...],
            'opengraph': [...],
            'microformat': [...]
        }
        
    Note:
        Requires extruct to be installed. Returns empty dict if extruct
        is not available or on parsing error.
    """
    try:
        import extruct
    except ImportError:
        logger.warning("extruct library not installed. Schema validation unavailable.")
        return {'error': 'extruct not installed'}
    
    if not html_content:
        return {}
    
    try:
        # Extract all structured data
        data = extruct.extract(
            html_content,
            syntaxes=['json-ld', 'microdata', 'rdfa', 'opengraph', 'microformat']
        )
        
        # Log findings
        json_ld_count = len(data.get('json-ld', []))
        if json_ld_count:
            logger.debug(f"Found {json_ld_count} JSON-LD objects in content")
        
        return data
        
    except Exception as e:
        logger.error(f"Schema validation error: {e}")
        return {'error': str(e)}


def validate_schema_json(schema_json: str) -> Dict[str, Any]:
    """
    Validate JSON-LD string can be parsed and has required fields.
    
    Args:
        schema_json: JSON-LD string to validate.
        
    Returns:
        Dictionary with validation results:
        {
            'valid': bool,
            'errors': list[str],
            'data': parsed_dict or None
        }
    """
    result = {
        'valid': False,
        'errors': [],
        'data': None
    }
    
    if not schema_json:
        result['errors'].append("Empty schema string")
        return result
    
    try:
        data = json.loads(schema_json)
        result['data'] = data
    except json.JSONDecodeError as e:
        result['errors'].append(f"Invalid JSON: {e}")
        return result
    
    # Check required Schema.org fields
    if '@context' not in data:
        result['errors'].append("Missing @context field")
    elif 'schema.org' not in data['@context']:
        result['errors'].append("Invalid @context (should contain schema.org)")
    
    if '@type' not in data:
        result['errors'].append("Missing @type field")
    
    if not result['errors']:
        result['valid'] = True
    
    return result