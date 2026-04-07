"""
SEO Analysis Engine - Core Orchestrator for Content Evaluation.

This module provides the main SEOAnalyzer class that orchestrates all SEO checks,
aggregates results, and provides content structure analysis. It integrates
the registry pattern with concrete check implementations to provide Yoast-level
SEO intelligence.

The engine is pure Python with no Django dependencies, operating entirely on
dictionary data structures for maximum testability and reusability.
"""

import re
from typing import Dict, List, Any, Optional, Tuple
from bs4 import BeautifulSoup

from .checks_registry import (
    register_check,
    execute_all_checks,
    calculate_total_score,
)
from .readability import analyze_readability
from .utils import (
    strip_html,
    extract_headings,
    extract_images,
    extract_links,
    extract_sentences,
    count_words,
    find_keyphrase_positions,
)
from ..constants import (
    SEO_CHECK_WEIGHTS,
    MIN_CONTENT_WORDS,
    KEYPHRASE_DENSITY_MIN,
    KEYPHRASE_DENSITY_MAX,
    MAX_SEO_TITLE_LENGTH,
    MAX_META_DESCRIPTION_LENGTH,
    MIN_INTERNAL_LINKS,
    MIN_EXTERNAL_LINKS,
)


# =============================================================================
# MAIN ANALYZER CLASS
# =============================================================================


class SEOAnalyzer:
    """
    Comprehensive SEO analysis engine for blog posts.
    
    Orchestrates multiple SEO checks, readability analysis, and schema detection
    to provide complete content optimization assessment. Uses the checks registry
    for extensible check management.
    
    Attributes:
        post_data: Dictionary containing all post content and metadata.
        results: List of individual check results.
        readability_result: Dictionary from readability analysis.
        aggregate_score: Calculated 0-100 SEO score.
        
    Expected post_data keys:
        - title: str (Post title, typically H1)
        - slug: str (URL slug)
        - body: str (HTML content)
        - seo_title: str (Meta title override)
        - meta_description: str (Meta description)
        - focus_keyphrase: str (Primary target keyword)
        - headings: list[dict] (Optional pre-extracted headings)
        - images: list[dict] (Optional pre-extracted images)
        - links: list[dict] (Optional pre-extracted links)
        - word_count: int (Optional pre-calculated word count)
    """
    
    def __init__(self, post_data: Dict[str, Any]):
        """
        Initialize analyzer with post data.
        
        Args:
            post_data: Dictionary containing post content and metadata.
            
        Note:
            Pre-extracted data (headings, images, etc.) is optional;
            the analyzer will extract from body HTML if not provided.
        """
        self.post_data = post_data
        self.results: List[Dict[str, Any]] = []
        self.readability_result: Dict[str, Any] = {}
        self.aggregate_score: int = 0
        self.schema_recommendation: str = 'BlogPosting'
        
        # Ensure required keys exist
        self._normalize_post_data()
    
    def _normalize_post_data(self) -> None:
        """
        Ensure post_data has all required fields with defaults.
        
        Extracts structural data from HTML body if not pre-provided.
        """
        # Set defaults for missing keys
        defaults = {
            'title': '',
            'slug': '',
            'body': '',
            'seo_title': '',
            'meta_description': '',
            'focus_keyphrase': '',
            'headings': [],
            'images': [],
            'links': [],
            'word_count': 0,
            'sentences': [],
        }
        
        for key, default in defaults.items():
            if key not in self.post_data:
                self.post_data[key] = default
        
        # Extract structural data from HTML if not provided
        body = self.post_data['body']
        
        if body and not self.post_data['headings']:
            self.post_data['headings'] = extract_headings(body)
        
        if body and not self.post_data['images']:
            self.post_data['images'] = extract_images(body)
        
        if body and not self.post_data['links']:
            self.post_data['links'] = extract_links(body)
        
        if body and not self.post_data['sentences']:
            plain_text = strip_html(body)
            self.post_data['sentences'] = extract_sentences(plain_text)
        
        if not self.post_data['word_count'] and body:
            plain_text = strip_html(body)
            self.post_data['word_count'] = count_words(plain_text)
    
    def run_all_checks(self) -> Dict[str, Any]:
        """
        Execute complete SEO analysis including all registered checks.
        
        Returns:
            Comprehensive analysis dictionary containing:
            - seo_score: int (0-100)
            - readability_score: int (0-100)
            - readability_details: full readability breakdown
            - check_results: list of individual check results
            - score_breakdown: aggregated scoring details
            - schema_recommendation: suggested schema.org type
            - keyphrase_analysis: keyphrase placement details
        """
        # Run readability analysis first
        self.readability_result = analyze_readability(self.post_data['body'])
        
        # Detect schema type
        self.schema_recommendation = self.detect_schema_type(self.post_data['body'])
        
        # Execute all registered checks
        self.results = execute_all_checks(self.post_data)
        
        # Calculate aggregate score
        score_data = calculate_total_score(self.results)
        self.aggregate_score = score_data['total_score']
        
        # Compile keyphrase analysis
        keyphrase_analysis = self._analyze_keyphrase_placement()
        
        return {
            'seo_score': self.aggregate_score,
            'readability_score': self.readability_result.get('overall_score', 0),
            'readability_details': self.readability_result,
            'check_results': self.results,
            'score_breakdown': score_data,
            'schema_recommendation': self.schema_recommendation,
            'keyphrase_analysis': keyphrase_analysis,
            'word_count': self.post_data['word_count'],
        }
    
    def _analyze_keyphrase_placement(self) -> Dict[str, Any]:
        """
        Analyze where and how often the keyphrase appears in content.
        
        Returns:
            Dictionary with keyphrase presence flags and frequencies.
        """
        keyphrase = self.post_data.get('focus_keyphrase', '').lower()
        if not keyphrase:
            return {
                'found_in_title': False,
                'found_in_seo_title': False,
                'found_in_meta': False,
                'found_in_slug': False,
                'found_in_h1': False,
                'found_in_first_para': False,
                'found_in_headings': [],
                'density': 0.0,
                'occurrences': 0,
            }
        
        body_lower = self.post_data['body'].lower()
        title_lower = self.post_data['title'].lower()
        seo_title_lower = self.post_data['seo_title'].lower()
        meta_lower = self.post_data['meta_description'].lower()
        slug_lower = self.post_data['slug'].lower()
        
        # Check title (H1)
        found_in_h1 = keyphrase in title_lower
        
        # Check SEO title
        found_in_seo_title = keyphrase in seo_title_lower if seo_title_lower else found_in_h1
        
        # Check meta description
        found_in_meta = keyphrase in meta_lower
        
        # Check slug
        found_in_slug = keyphrase in slug_lower
        
        # Check first paragraph (approximate: first 200 chars of text)
        plain_text = strip_html(self.post_data['body'])
        first_para = plain_text[:300].lower()
        found_in_first_para = keyphrase in first_para
        
        # Check headings
        found_in_headings = []
        for heading in self.post_data['headings']:
            if keyphrase in heading['text'].lower():
                found_in_headings.append({
                    'level': heading['level'],
                    'text': heading['text'],
                })
        
        # Calculate density
        word_count = self.post_data['word_count']
        occurrences = len(find_keyphrase_positions(body_lower, keyphrase))
        
        if word_count > 0:
            keyphrase_words = len(keyphrase.split())
            density = ((occurrences * keyphrase_words) / word_count) * 100
        else:
            density = 0.0
        
        return {
            'found_in_title': found_in_h1,
            'found_in_seo_title': found_in_seo_title,
            'found_in_meta': found_in_meta,
            'found_in_slug': found_in_slug,
            'found_in_h1': found_in_h1,
            'found_in_first_para': found_in_first_para,
            'found_in_headings': found_in_headings,
            'density': round(density, 2),
            'occurrences': occurrences,
        }
    
    @staticmethod
    def detect_schema_type(html_body: str) -> str:
        """
        Detect appropriate Schema.org type based on content structure.
        
        Analyzes HTML patterns to recommend structured data markup:
        - FAQPage: Multiple Q&A patterns (questions followed by answers)
        - HowTo: Numbered steps or step-by-step instructions
        - BlogPosting: Default for standard blog content
        
        Args:
            html_body: Raw HTML content to analyze.
            
        Returns:
            String schema type: 'FAQPage', 'HowTo', or 'BlogPosting'.
        """
        if not html_body:
            return 'BlogPosting'
        
        soup = BeautifulSoup(html_body, 'html.parser')
        
        # Check for HowTo patterns
        # Look for ordered lists with step-like content or explicit step markers
        ol_elements = soup.find_all('ol')
        for ol in ol_elements:
            items = ol.find_all('li')
            if len(items) >= 2:
                # Check for step indicators in text
                step_keywords = ['step', 'step', 'first', 'second', 'third', 
                               'next', 'then', 'finally', 'start by', 'begin by']
                text = ol.get_text().lower()
                if any(kw in text for kw in step_keywords):
                    return 'HowTo'
        
        # Check for FAQ patterns
        # Look for question headings followed by content
        faq_patterns = 0
        headings = soup.find_all(['h2', 'h3', 'h4'])
        
        for heading in headings:
            text = heading.get_text().strip()
            # Check if heading looks like a question
            if text.endswith('?') or text.lower().startswith(('what', 'how', 'why', 
                'when', 'where', 'who', 'which', 'can', 'do', 'is', 'are', 'does')):
                # Check if followed by explanatory content
                next_sibling = heading.find_next_sibling()
                if next_sibling and next_sibling.name in ['p', 'div', 'ul', 'ol']:
                    faq_patterns += 1
        
        # If 2+ question-answer patterns found, suggest FAQPage
        if faq_patterns >= 2:
            return 'FAQPage'
        
        # Check for explicit FAQ sections
        faq_keywords = ['faq', 'frequently asked', 'q&a', 'questions and answers']
        body_text = soup.get_text().lower()
        if any(kw in body_text for kw in faq_keywords):
            return 'FAQPage'
        
        return 'BlogPosting'


# =============================================================================
# CHECK IMPLEMENTATIONS (REGISTERED WITH DECORATORS)
# =============================================================================


@register_check('keyphrase_in_title', SEO_CHECK_WEIGHTS.get('keyphrase_in_title', 0.15))
def check_keyphrase_in_title(post_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Verify focus keyphrase appears in the post title/H1.
    """
    keyphrase = post_data.get('focus_keyphrase', '').lower()
    title = post_data.get('title', '').lower()
    seo_title = post_data.get('seo_title', '').lower()
    
    weight = SEO_CHECK_WEIGHTS.get('keyphrase_in_title', 0.15)
    
    if not keyphrase:
        return {
            'check_id': 'keyphrase_in_title',
            'status': 'fail',
            'message': 'No focus keyphrase set.',
            'weight': weight,
            'score_contribution': 0.0,
        }
    
    found_in_title = keyphrase in title
    found_in_seo = keyphrase in seo_title if seo_title else found_in_title
    
    if found_in_seo or found_in_title:
        # Check if at beginning (bonus consideration)
        title_to_check = seo_title if seo_title else title
        at_beginning = title_to_check.startswith(keyphrase)
        
        if at_beginning:
            msg = 'Keyphrase appears at the beginning of the title (optimal).'
        else:
            msg = 'Keyphrase appears in the title.'
        
        return {
            'check_id': 'keyphrase_in_title',
            'status': 'pass',
            'message': msg,
            'weight': weight,
            'score_contribution': weight,
        }
    
    return {
        'check_id': 'keyphrase_in_title',
        'status': 'fail',
        'message': f'Keyphrase "{keyphrase}" not found in title.',
        'weight': weight,
        'score_contribution': 0.0,
    }


@register_check('keyphrase_in_meta_description', SEO_CHECK_WEIGHTS.get('keyphrase_in_meta', 0.10))
def check_keyphrase_in_meta_description(post_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Verify focus keyphrase appears in meta description.
    """
    keyphrase = post_data.get('focus_keyphrase', '').lower()
    meta = post_data.get('meta_description', '').lower()
    weight = SEO_CHECK_WEIGHTS.get('keyphrase_in_meta', 0.10)
    
    if not keyphrase:
        return {
            'check_id': 'keyphrase_in_meta_description',
            'status': 'fail',
            'message': 'No focus keyphrase set.',
            'weight': weight,
            'score_contribution': 0.0,
        }
    
    if not meta:
        return {
            'check_id': 'keyphrase_in_meta_description',
            'status': 'fail',
            'message': 'Meta description is empty.',
            'weight': weight,
            'score_contribution': 0.0,
        }
    
    if keyphrase in meta:
        return {
            'check_id': 'keyphrase_in_meta_description',
            'status': 'pass',
            'message': 'Keyphrase appears in meta description.',
            'weight': weight,
            'score_contribution': weight,
        }
    
    return {
        'check_id': 'keyphrase_in_meta_description',
        'status': 'fail',
        'message': f'Keyphrase not found in meta description.',
        'weight': weight,
        'score_contribution': 0.0,
    }


@register_check('keyphrase_in_slug', SEO_CHECK_WEIGHTS.get('keyphrase_in_slug', 0.10))
def check_keyphrase_in_slug(post_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Verify focus keyphrase appears in URL slug.
    """
    keyphrase = post_data.get('focus_keyphrase', '').lower()
    slug = post_data.get('slug', '').lower()
    weight = SEO_CHECK_WEIGHTS.get('keyphrase_in_slug', 0.10)
    
    if not keyphrase:
        return {
            'check_id': 'keyphrase_in_slug',
            'status': 'fail',
            'message': 'No focus keyphrase set.',
            'weight': weight,
            'score_contribution': 0.0,
        }
    
    # Normalize keyphrase for slug comparison (remove spaces, common words)
    keyphrase_normalized = keyphrase.replace(' ', '-')
    
    if keyphrase in slug or keyphrase_normalized in slug:
        return {
            'check_id': 'keyphrase_in_slug',
            'status': 'pass',
            'message': 'Keyphrase appears in URL slug.',
            'weight': weight,
            'score_contribution': weight,
        }
    
    return {
        'check_id': 'keyphrase_in_slug',
        'status': 'fail',
        'message': f'Keyphrase not found in slug. Current slug: "{slug}"',
        'weight': weight,
        'score_contribution': 0.0,
    }


@register_check('keyphrase_in_first_paragraph', SEO_CHECK_WEIGHTS.get('keyphrase_in_first_paragraph', 0.10))
def check_keyphrase_in_first_paragraph(post_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Verify keyphrase appears in first paragraph (first 150 words).
    """
    keyphrase = post_data.get('focus_keyphrase', '').lower()
    body = post_data.get('body', '')
    weight = SEO_CHECK_WEIGHTS.get('keyphrase_in_first_paragraph', 0.10)
    
    if not keyphrase:
        return {
            'check_id': 'keyphrase_in_first_paragraph',
            'status': 'fail',
            'message': 'No focus keyphrase set.',
            'weight': weight,
            'score_contribution': 0.0,
        }
    
    if not body:
        return {
            'check_id': 'keyphrase_in_first_paragraph',
            'status': 'fail',
            'message': 'Content body is empty.',
            'weight': weight,
            'score_contribution': 0.0,
        }
    
    # Get first ~150 words
    plain_text = strip_html(body)
    words = plain_text.split()
    first_para = ' '.join(words[:150]).lower()
    
    if keyphrase in first_para:
        return {
            'check_id': 'keyphrase_in_first_paragraph',
            'status': 'pass',
            'message': 'Keyphrase appears in first paragraph.',
            'weight': weight,
            'score_contribution': weight,
        }
    
    return {
        'check_id': 'keyphrase_in_first_paragraph',
        'status': 'fail',
        'message': 'Keyphrase not found in first paragraph.',
        'weight': weight,
        'score_contribution': 0.0,
    }


@register_check('keyphrase_in_h1', SEO_CHECK_WEIGHTS.get('keyphrase_in_h1', 0.10))
def check_keyphrase_in_h1(post_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Verify keyphrase appears in H1 heading (usually the title).
    """
    keyphrase = post_data.get('focus_keyphrase', '').lower()
    headings = post_data.get('headings', [])
    weight = SEO_CHECK_WEIGHTS.get('keyphrase_in_h1', 0.10)
    
    if not keyphrase:
        return {
            'check_id': 'keyphrase_in_h1',
            'status': 'fail',
            'message': 'No focus keyphrase set.',
            'weight': weight,
            'score_contribution': 0.0,
        }
    
    h1_headings = [h for h in headings if h.get('level') == 1]
    
    if not h1_headings:
        return {
            'check_id': 'keyphrase_in_h1',
            'status': 'warning',
            'message': 'No H1 heading found in content.',
            'weight': weight,
            'score_contribution': weight * 0.5,
        }
    
    for h1 in h1_headings:
        if keyphrase in h1.get('text', '').lower():
            return {
                'check_id': 'keyphrase_in_h1',
                'status': 'pass',
                'message': 'Keyphrase appears in H1 heading.',
                'weight': weight,
                'score_contribution': weight,
            }
    
    return {
        'check_id': 'keyphrase_in_h1',
        'status': 'fail',
        'message': 'Keyphrase not found in H1 heading.',
        'weight': weight,
        'score_contribution': 0.0,
    }


@register_check('keyphrase_in_subheadings', SEO_CHECK_WEIGHTS.get('keyphrase_in_subheadings', 0.10))
def check_keyphrase_in_subheadings(post_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Verify keyphrase appears in H2/H3 subheadings.
    """
    keyphrase = post_data.get('focus_keyphrase', '').lower()
    headings = post_data.get('headings', [])
    weight = SEO_CHECK_WEIGHTS.get('keyphrase_in_subheadings', 0.10)
    
    if not keyphrase:
        return {
            'check_id': 'keyphrase_in_subheadings',
            'status': 'fail',
            'message': 'No focus keyphrase set.',
            'weight': weight,
            'score_contribution': 0.0,
        }
    
    # Get H2 and H3 headings
    subheadings = [h for h in headings if h.get('level') in [2, 3]]
    
    if not subheadings:
        return {
            'check_id': 'keyphrase_in_subheadings',
            'status': 'warning',
            'message': 'No subheadings (H2/H3) found in content.',
            'weight': weight,
            'score_contribution': 0.0,
        }
    
    matches = sum(1 for h in subheadings if keyphrase in h.get('text', '').lower())
    
    if matches > 0:
        return {
            'check_id': 'keyphrase_in_subheadings',
            'status': 'pass',
            'message': f'Keyphrase appears in {matches} subheading(s).',
            'weight': weight,
            'score_contribution': weight,
        }
    
    return {
        'check_id': 'keyphrase_in_subheadings',
        'status': 'fail',
        'message': 'Keyphrase not found in any subheadings.',
        'weight': weight,
        'score_contribution': 0.0,
    }


@register_check('keyphrase_density', SEO_CHECK_WEIGHTS.get('keyphrase_density', 0.10))
def check_keyphrase_density(post_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Verify keyphrase density is within optimal range (0.5% - 2.5%).
    """
    keyphrase = post_data.get('focus_keyphrase', '').lower()
    body = post_data.get('body', '')
    word_count = post_data.get('word_count', 0)
    weight = SEO_CHECK_WEIGHTS.get('keyphrase_density', 0.10)
    
    if not keyphrase:
        return {
            'check_id': 'keyphrase_density',
            'status': 'fail',
            'message': 'No focus keyphrase set.',
            'weight': weight,
            'score_contribution': 0.0,
        }
    
    if word_count == 0:
        return {
            'check_id': 'keyphrase_density',
            'status': 'fail',
            'message': 'Content has no words to analyze.',
            'weight': weight,
            'score_contribution': 0.0,
        }
    
    # Calculate density
    body_lower = body.lower()
    occurrences = len(find_keyphrase_positions(body_lower, keyphrase))
    keyphrase_words = len(keyphrase.split())
    density = ((occurrences * keyphrase_words) / word_count) * 100
    
    if KEYPHRASE_DENSITY_MIN <= density <= KEYPHRASE_DENSITY_MAX:
        return {
            'check_id': 'keyphrase_density',
            'status': 'pass',
            'message': f'Keyphrase density ({density:.1f}%) is optimal.',
            'weight': weight,
            'score_contribution': weight,
        }
    elif density < KEYPHRASE_DENSITY_MIN:
        return {
            'check_id': 'keyphrase_density',
            'status': 'warning',
            'message': f'Keyphrase density ({density:.1f}%) is too low. Target: {KEYPHRASE_DENSITY_MIN}%-{KEYPHRASE_DENSITY_MAX}%',
            'weight': weight,
            'score_contribution': weight * 0.5,
        }
    else:
        return {
            'check_id': 'keyphrase_density',
            'status': 'fail',
            'message': f'Keyphrase density ({density:.1f}%) is too high (over-optimization risk).',
            'weight': weight,
            'score_contribution': 0.0,
        }


@register_check('word_count', SEO_CHECK_WEIGHTS.get('word_count', 0.10))
def check_word_count(post_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Verify content meets minimum word count for indexing.
    """
    word_count = post_data.get('word_count', 0)
    weight = SEO_CHECK_WEIGHTS.get('word_count', 0.10)
    
    if word_count >= MIN_CONTENT_WORDS:
        return {
            'check_id': 'word_count',
            'status': 'pass',
            'message': f'Content length ({word_count} words) is sufficient.',
            'weight': weight,
            'score_contribution': weight,
        }
    elif word_count >= MIN_CONTENT_WORDS * 0.5:
        return {
            'check_id': 'word_count',
            'status': 'warning',
            'message': f'Content ({word_count} words) is below recommended {MIN_CONTENT_WORDS}.',
            'weight': weight,
            'score_contribution': weight * 0.5,
        }
    else:
        return {
            'check_id': 'word_count',
            'status': 'fail',
            'message': f'Content ({word_count} words) is too short for effective SEO.',
            'weight': weight,
            'score_contribution': 0.0,
        }


@register_check('internal_links', SEO_CHECK_WEIGHTS.get('internal_links', 0.05))
def check_internal_links(post_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Verify post contains minimum recommended internal links.
    """
    links = post_data.get('links', [])
    weight = SEO_CHECK_WEIGHTS.get('internal_links', 0.05)
    
    internal_links = [l for l in links if not l.get('is_external', False) and l.get('href')]
    
    count = len(internal_links)
    
    if count >= MIN_INTERNAL_LINKS:
        return {
            'check_id': 'internal_links',
            'status': 'pass',
            'message': f'Found {count} internal link(s).',
            'weight': weight,
            'score_contribution': weight,
        }
    
    return {
        'check_id': 'internal_links',
        'status': 'warning',
        'message': f'Only {count} internal links found. Recommended: at least {MIN_INTERNAL_LINKS}.',
        'weight': weight,
        'score_contribution': weight * 0.5,
    }


@register_check('external_links', SEO_CHECK_WEIGHTS.get('external_links', 0.05))
def check_external_links(post_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Verify post contains minimum recommended external links.
    """
    links = post_data.get('links', [])
    weight = SEO_CHECK_WEIGHTS.get('external_links', 0.05)
    
    external_links = [l for l in links if l.get('is_external', False) and not l.get('is_nofollow', False)]
    
    count = len(external_links)
    
    if count >= MIN_EXTERNAL_LINKS:
        return {
            'check_id': 'external_links',
            'status': 'pass',
            'message': f'Found {count} external link(s).',
            'weight': weight,
            'score_contribution': weight,
        }
    
    return {
        'check_id': 'external_links',
        'status': 'warning',
        'message': f'Only {count} external links found. Recommended: at least {MIN_EXTERNAL_LINKS}.',
        'weight': weight,
        'score_contribution': weight * 0.5,
    }


@register_check('image_alt_text', SEO_CHECK_WEIGHTS.get('images_alt_text', 0.05))
def check_image_alt_text(post_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Verify all images have alt text and at least one contains keyphrase.
    """
    images = post_data.get('images', [])
    keyphrase = post_data.get('focus_keyphrase', '').lower()
    weight = SEO_CHECK_WEIGHTS.get('images_alt_text', 0.05)
    
    if not images:
        return {
            'check_id': 'image_alt_text',
            'status': 'pass',
            'message': 'No images in content.',
            'weight': weight,
            'score_contribution': weight,
        }
    
    missing_alt = [img for img in images if not img.get('alt', '').strip()]
    
    if missing_alt:
        return {
            'check_id': 'image_alt_text',
            'status': 'fail',
            'message': f'{len(missing_alt)} image(s) missing alt text.',
            'weight': weight,
            'score_contribution': 0.0,
        }
    
    # Check for keyphrase in alt text (bonus, not required for pass)
    if keyphrase:
        keyphrase_in_alt = any(keyphrase in img.get('alt', '').lower() for img in images)
        if keyphrase_in_alt:
            return {
                'check_id': 'image_alt_text',
                'status': 'pass',
                'message': 'All images have alt text, keyphrase found in alt text.',
                'weight': weight,
                'score_contribution': weight,
            }
    
    return {
        'check_id': 'image_alt_text',
        'status': 'pass',
        'message': f'All {len(images)} image(s) have alt text.',
        'weight': weight,
        'score_contribution': weight,
    }


@register_check('heading_hierarchy', 0.05)
def check_heading_hierarchy(post_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Verify proper heading hierarchy (single H1, no skipped levels).
    """
    headings = post_data.get('headings', [])
    weight = 0.05  # Not in main weights, assign default
    
    if not headings:
        return {
            'check_id': 'heading_hierarchy',
            'status': 'warning',
            'message': 'No headings found in content.',
            'weight': weight,
            'score_contribution': 0.0,
        }
    
    h1_count = sum(1 for h in headings if h.get('level') == 1)
    
    issues = []
    
    if h1_count == 0:
        issues.append('Missing H1 heading')
    elif h1_count > 1:
        issues.append(f'Multiple H1 headings ({h1_count})')
    
    # Check for skipped levels
    levels = [h.get('level') for h in headings if h.get('level')]
    for i in range(1, len(levels)):
        if levels[i] > levels[i-1] + 1:
            issues.append(f'Skipped heading level (H{levels[i-1]} to H{levels[i]})')
    
    if issues:
        return {
            'check_id': 'heading_hierarchy',
            'status': 'warning',
            'message': '; '.join(issues),
            'weight': weight,
            'score_contribution': weight * 0.5,
        }
    
    return {
        'check_id': 'heading_hierarchy',
        'status': 'pass',
        'message': 'Heading hierarchy is valid.',
        'weight': weight,
        'score_contribution': weight,
    }


@register_check('seo_title_length', SEO_CHECK_WEIGHTS.get('seo_title_length', 0.05))
def check_seo_title_length(post_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Verify SEO title length is within optimal range (50-60 chars).
    """
    seo_title = post_data.get('seo_title', '')
    title = post_data.get('title', '')
    weight = SEO_CHECK_WEIGHTS.get('seo_title_length', 0.05)
    
    # Use SEO title if set, otherwise fall back to regular title
    check_title = seo_title if seo_title else title
    
    if not check_title:
        return {
            'check_id': 'seo_title_length',
            'status': 'fail',
            'message': 'Title is empty.',
            'weight': weight,
            'score_contribution': 0.0,
        }
    
    length = len(check_title)
    
    if 50 <= length <= MAX_SEO_TITLE_LENGTH:
        return {
            'check_id': 'seo_title_length',
            'status': 'pass',
            'message': f'Title length ({length} chars) is optimal.',
            'weight': weight,
            'score_contribution': weight,
        }
    elif 30 <= length < 50:
        return {
            'check_id': 'seo_title_length',
            'status': 'warning',
            'message': f'Title ({length} chars) is slightly short. Target: 50-{MAX_SEO_TITLE_LENGTH}.',
            'weight': weight,
            'score_contribution': weight * 0.7,
        }
    elif length > MAX_SEO_TITLE_LENGTH:
        return {
            'check_id': 'seo_title_length',
            'status': 'warning',
            'message': f'Title ({length} chars) may be truncated in SERPs (max {MAX_SEO_TITLE_LENGTH}).',
            'weight': weight,
            'score_contribution': weight * 0.7,
        }
    
    return {
        'check_id': 'seo_title_length',
        'status': 'fail',
        'message': f'Title ({length} chars) is too short.',
        'weight': weight,
        'score_contribution': 0.0,
    }


@register_check('meta_description_length', SEO_CHECK_WEIGHTS.get('meta_description_length', 0.05))
def check_meta_description_length(post_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Verify meta description length is within optimal range (120-160 chars).
    """
    meta = post_data.get('meta_description', '')
    weight = SEO_CHECK_WEIGHTS.get('meta_description_length', 0.05)
    
    if not meta:
        return {
            'check_id': 'meta_description_length',
            'status': 'fail',
            'message': 'Meta description is empty.',
            'weight': weight,
            'score_contribution': 0.0,
        }
    
    length = len(meta)
    
    if 120 <= length <= MAX_META_DESCRIPTION_LENGTH:
        return {
            'check_id': 'meta_description_length',
            'status': 'pass',
            'message': f'Meta description length ({length} chars) is optimal.',
            'weight': weight,
            'score_contribution': weight,
        }
    elif 70 <= length < 120:
        return {
            'check_id': 'meta_description_length',
            'status': 'warning',
            'message': f'Meta description ({length} chars) is short. Target: 120-{MAX_META_DESCRIPTION_LENGTH}.',
            'weight': weight,
            'score_contribution': weight * 0.7,
        }
    elif length > MAX_META_DESCRIPTION_LENGTH:
        return {
            'check_id': 'meta_description_length',
            'status': 'warning',
            'message': f'Meta description ({length} chars) may be truncated (max {MAX_META_DESCRIPTION_LENGTH}).',
            'weight': weight,
            'score_contribution': weight * 0.7,
        }
    
    return {
        'check_id': 'meta_description_length',
        'status': 'fail',
        'message': f'Meta description ({length} chars) is too short.',
        'weight': weight,
        'score_contribution': 0.0,
    }


# =============================================================================
# MODULE-LEVEL ENTRY POINT
# =============================================================================


def analyze_post(post_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Main entry point for complete post SEO analysis.
    
    Orchestrates the SEOAnalyzer class to perform comprehensive analysis
    of a blog post, returning all metrics, scores, and recommendations.
    
    Args:
        post_data: Dictionary containing post content and metadata.
            Required keys: title, body, slug
            Recommended keys: seo_title, meta_description, focus_keyphrase
            
    Returns:
        Complete analysis dictionary with:
        - seo_score: int (0-100)
        - readability_score: int (0-100)
        - readability_details: full breakdown
        - check_results: list of all check results
        - score_breakdown: aggregated scoring
        - schema_recommendation: suggested schema type
        - keyphrase_analysis: placement details
        - word_count: total words
        
    Example:
        >>> post_data = {
        ...     'title': 'SEO Best Practices',
        ...     'body': '<h1>SEO Best Practices</h1><p>Content here...</p>',
        ...     'slug': 'seo-best-practices',
        ...     'focus_keyphrase': 'seo best practices'
        ... }
        >>> result = analyze_post(post_data)
        >>> print(result['seo_score'])
        85
    """
    analyzer = SEOAnalyzer(post_data)
    return analyzer.run_all_checks()