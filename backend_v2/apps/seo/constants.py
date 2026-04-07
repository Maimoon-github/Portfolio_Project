"""
SEO Application Constants.

This module defines all constant values used throughout the SEO application,
including choice tuples, thresholds, weights, and linguistic datasets for
content analysis. All constants are typed with Final annotations to ensure
immutability and provide IDE autocompletion support.

Integration Notes:
    - Settings from django-meta are imported with fallback defaults
    - DJANGO_CHECK_SEO_SETTINGS merged with application defaults
    - All linguistic constants (stop words, transitions) use lowercase for
      consistent comparison operations
"""

from typing import Final, Tuple, Dict, Set, Union, List, Any
from django.conf import settings

# =============================================================================
# MODEL CHOICE CONSTANTS
# =============================================================================

ROBOTS_CHOICES: Final[Tuple[Tuple[str, str], ...]] = (
    ('index,follow', 'Index, Follow'),
    ('index,nofollow', 'Index, No Follow'),
    ('noindex,follow', 'No Index, Follow'),
    ('noindex,nofollow', 'No Index, No Follow'),
)
"""Meta robots directive choices for search engine crawling behavior."""

SCHEMA_TYPE_CHOICES: Final[Tuple[Tuple[str, str], ...]] = (
    ('BlogPosting', 'Blog Posting'),
    ('Article', 'Article'),
    ('NewsArticle', 'News Article'),
    ('TechArticle', 'Technical Article'),
    ('ScholarlyArticle', 'Scholarly Article'),
    ('FAQPage', 'FAQ Page'),
    ('HowTo', 'How To'),
    ('WebPage', 'Web Page'),
)
"""Schema.org types supported for structured data generation."""

CHANGEFREQ_CHOICES: Final[Tuple[Tuple[str, str], ...]] = (
    ('always', 'Always'),
    ('hourly', 'Hourly'),
    ('daily', 'Daily'),
    ('weekly', 'Weekly'),
    ('monthly', 'Monthly'),
    ('yearly', 'Yearly'),
    ('never', 'Never'),
)
"""Sitemap changefrequency values indicating content update cadence."""

# =============================================================================
# SCORING THRESHOLDS
# =============================================================================

SEO_SCORE_THRESHOLDS: Final[Dict[str, Tuple[int, int]]] = {
    'red': (0, 49),
    'amber': (50, 69),
    'green': (70, 100),
}
"""SEO score ranges with traffic-light classification."""

READABILITY_THRESHOLDS: Final[Dict[str, Union[int, float]]] = {
    'flesch_reading_ease_good': 60.0,
    'flesch_reading_ease_ok': 40.0,
    'max_sentence_length': 20,
    'max_sentences_over_length_pct': 25,
    'max_passive_voice_pct': 10.0,
    'min_transition_words_pct': 30.0,
    'max_consecutive_same_start': 3,
    'max_words_between_subheadings': 300,
    'max_paragraph_words': 150,
}
"""Readability analysis thresholds based on Flesch-Kincaid and Yoast criteria."""

# =============================================================================
# ALGORITHMIC WEIGHTS
# =============================================================================

SEO_CHECK_WEIGHTS: Final[Dict[str, float]] = {
    'keyphrase_in_title': 0.15,
    'keyphrase_in_meta': 0.10,
    'keyphrase_in_slug': 0.10,
    'keyphrase_in_first_paragraph': 0.10,
    'keyphrase_in_h1': 0.10,
    'keyphrase_in_subheadings': 0.10,
    'keyphrase_density': 0.10,
    'meta_description_length': 0.05,
    'seo_title_length': 0.05,
    'internal_links': 0.05,
    'external_links': 0.05,
    'images_alt_text': 0.05,
    'word_count': 0.10,
}
"""
Weight distribution for SEO score calculation.
Sum equals 1.0 (100%) for normalized aggregation.
"""

# =============================================================================
# LINGUISTIC DATASETS
# =============================================================================

SLUG_STOP_WORDS: Final[Set[str]] = {
    # Articles
    'a', 'an', 'the',
    # Conjunctions
    'and', 'or', 'but', 'nor', 'yet', 'so',
    # Prepositions
    'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'up', 'about',
    'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between',
    'among', 'within', 'without', 'under', 'over', 'again', 'further', 'then', 'once',
    # Auxiliary verbs
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do',
    'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can',
    'need', 'dare', 'ought', 'used', 'shall', 'should',
    # Pronouns
    'this', 'that', 'these', 'those', 'i', 'me', 'my', 'myself', 'we', 'our', 'ours',
    'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his',
    'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them',
    'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'whose',
    # Adverbs (common)
    'very', 'just', 'now', 'then', 'here', 'there', 'when', 'where', 'why', 'how',
    'all', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'not', 'only',
    'own', 'same', 'once', 'too', 'as',
}
"""
English stop words to be stripped during automatic slug generation to create
clean, SEO-friendly URLs without superfluous terms.
"""

TRANSITION_WORDS: Final[Set[str]] = {
    # Addition
    'also', 'again', 'besides', 'furthermore', 'likewise', 'moreover', 'similarly',
    'additionally', 'in addition', 'plus', 'further',
    # Contrast
    'however', 'nevertheless', 'nonetheless', 'conversely', 'otherwise', 'instead',
    'rather', 'but', 'yet', 'although', 'though', 'even though', 'despite',
    'in spite of', 'regardless', 'whereas', 'while', 'whilst', 'on the other hand',
    'on the contrary', 'in contrast', 'conversely',
    # Cause/Effect
    'hence', 'consequently', 'therefore', 'thus', 'accordingly', 'as a result',
    'because', 'since', 'as', 'so', 'due to', 'owing to', 'resulting in',
    'leading to', 'given that',
    # Example/Emphasis
    'for example', 'for instance', 'in fact', 'specifically', 'that is', 'namely',
    'particularly', 'especially', 'notably', 'indeed', 'in particular',
    # Time/Sequence
    'first', 'second', 'third', 'firstly', 'secondly', 'thirdly', 'finally', 'lastly',
    'next', 'then', 'after', 'before', 'previously', 'meanwhile', 'during', 'while',
    'subsequently', 'thereafter', 'afterward', 'eventually', 'at last', 'last',
    'in the meantime', 'simultaneously', 'until', 'till', 'when', 'whenever',
    'as soon as', 'once', 'immediately', 'afterwards',
    # Summary/Conclusion
    'in conclusion', 'to conclude', 'to sum up', 'ultimately', 'overall', 'in brief',
    'in summary', 'to summarize', 'in short', 'in essence', 'all in all',
    'by and large', 'for the most part',
    # Comparison
    'equally', 'in the same way', 'by comparison', 'compared to', 'in comparison',
    'likewise', 'similarly', 'as with',
    # Clarification
    'in other words', 'to put it differently', 'that is to say', 'to clarify',
    'to rephrase', 'put another way',
    # Condition
    'if', 'unless', 'provided that', 'in the event that', 'as long as', 'assuming',
    'given that', 'on condition that', 'only if',
}
"""
Transition words and phrases for readability analysis. Presence of these at
sentence beginnings indicates good text flow and structure.
"""

# =============================================================================
# NUMERIC CONSTANTS
# =============================================================================

DEFAULT_SITEMAP_PRIORITY: Final[float] = 0.7
"""Default priority value for sitemap entries (0.0 - 1.0 scale)."""

DEFAULT_CHANGEFREQ: Final[str] = 'weekly'
"""Default change frequency for sitemap entries."""

CONTENT_HASH_ALGORITHM: Final[str] = 'sha256'
"""Hashing algorithm for content change detection (cache invalidation)."""

CACHE_KEY_PREFIX: Final[str] = 'seo'
"""Prefix for all cache keys to prevent namespace collisions."""

MAX_SEO_TITLE_LENGTH: Final[int] = 70
"""Maximum recommended characters for SEO title (browser tab/SERP display)."""

MAX_META_DESCRIPTION_LENGTH: Final[int] = 165
"""Maximum recommended characters for meta description (SERP snippet)."""

MIN_CONTENT_WORDS: Final[int] = 300
"""Minimum word count for basic indexing eligibility."""

KEYPHRASE_DENSITY_MIN: Final[float] = 0.5
"""Minimum optimal keyphrase density percentage."""

KEYPHRASE_DENSITY_MAX: Final[float] = 2.5
"""Maximum optimal keyphrase density percentage (avoid over-optimization)."""

WORDS_PER_MINUTE: Final[int] = 200
"""Average reading speed for estimated reading time calculation."""

MAX_SLUG_LENGTH: Final[int] = 75
"""Maximum URL-safe characters for post slug (SEO best practice)."""

MIN_INTERNAL_LINKS: Final[int] = 1
"""Minimum recommended internal links per post."""

MIN_EXTERNAL_LINKS: Final[int] = 1
"""Minimum recommended external links per post."""

# =============================================================================
# THIRD-PARTY INTEGRATION SETTINGS
# =============================================================================

# django-meta integration with safe fallbacks
META_SITE_PROTOCOL: Final[str] = getattr(settings, 'META_SITE_PROTOCOL', 'https')
META_USE_OG_PROPERTIES: Final[bool] = getattr(settings, 'META_USE_OG_PROPERTIES', True)
META_USE_TWITTER_PROPERTIES: Final[bool] = getattr(settings, 'META_USE_TWITTER_PROPERTIES', True)
META_TWITTER_TYPE: Final[str] = getattr(settings, 'META_TWITTER_TYPE', 'summary_large_image')
META_USE_SCHEMAORG_PROPERTIES: Final[bool] = getattr(settings, 'META_USE_SCHEMAORG_PROPERTIES', True)
META_DEFAULT_IMAGE: Final[str] = getattr(settings, 'META_DEFAULT_IMAGE', '')
META_INCLUDE_KEYWORDS: Final[bool] = getattr(settings, 'META_INCLUDE_KEYWORDS', True)

# django-check-seo integration with merged defaults
CHECK_SEO_SETTINGS: Final[Dict[str, Any]] = getattr(settings, 'DJANGO_CHECK_SEO_SETTINGS', {
    "content_words_number": [MIN_CONTENT_WORDS, 600],
    "internal_links": [MIN_INTERNAL_LINKS, 2],
    "external_links": [MIN_EXTERNAL_LINKS, 2],
    "meta_description_length": [120, MAX_META_DESCRIPTION_LENGTH],
    "title_length": [30, 60],
    "keywords_in_title": True,
    "keywords_in_h1": True,
    "keywords_in_first_paragraph": True,
    "image_alt_tags": True,
})

# =============================================================================
# CACHE TIMEOUTS (seconds)
# =============================================================================

SEO_SCORE_CACHE_TIMEOUT: Final[int] = 3600  # 1 hour
SOCIAL_PREVIEW_CACHE_TIMEOUT: Final[int] = 7200  # 2 hours
SITEMAP_CACHE_TIMEOUT: Final[int] = 86400  # 24 hours
INTERNAL_LINK_SUGGESTIONS_CACHE_TIMEOUT: Final[int] = 3600  # 1 hour