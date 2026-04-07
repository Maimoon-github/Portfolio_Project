"""
Pure Python utility functions for SEO content analysis.

This module provides HTML parsing, text extraction, and linguistic analysis
functions with zero Django dependencies, enabling standalone testing and
reuse in non-Django contexts. All functions are optimized for performance
and handle edge cases gracefully.

Note:
    This module must remain free of Django imports to maintain purity
    and allow usage in standalone analysis scripts or external tools.
"""

import hashlib
import re
import string
from typing import Dict, List, Optional, Tuple, Set
from urllib.parse import urlparse

from bs4 import BeautifulSoup, Tag

# Import constants from parent module (relative import safe since constants has no Django deps)
from ..constants import (
    CONTENT_HASH_ALGORITHM,
    SLUG_STOP_WORDS,
    TRANSITION_WORDS,
    MAX_SLUG_LENGTH,
)


def strip_html(html: str) -> str:
    """
    Extract plain text from HTML content.
    
    Removes all HTML tags and converts common block-level elements to
    line breaks for better readability analysis.
    
    Args:
        html: Raw HTML string potentially containing tags and entities.
        
    Returns:
        Plain text with normalized whitespace.
        
    Example:
        >>> strip_html("<p>Hello <b>world</b></p>")
        'Hello world'
    """
    if not html:
        return ""
    
    soup = BeautifulSoup(html, 'html.parser')
    
    # Convert block elements to preserved line breaks for sentence detection
    for tag in soup.find_all(['p', 'div', 'br', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
        tag.insert_after('\n')
    
    # Get text and normalize whitespace
    text = soup.get_text(separator=' ', strip=False)
    
    # Normalize multiple spaces and newlines
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n ', '\n', text)
    text = re.sub(r' \n', '\n', text)
    text = re.sub(r'\n+', '\n', text)
    
    return text.strip()


def extract_headings(html: str) -> List[Dict[str, any]]:
    """
    Extract heading elements (H1-H6) from HTML.
    
    Identifies heading hierarchy and text content for structure analysis
    and keyphrase placement checks.
    
    Args:
        html: Raw HTML content.
        
    Returns:
        List of dictionaries containing 'level' (1-6) and 'text' (str).
        
    Example:
        >>> extract_headings("<h1>Title</h1><h2>Subtitle</h2>")
        [{'level': 1, 'text': 'Title'}, {'level': 2, 'text': 'Subtitle'}]
    """
    if not html:
        return []
    
    soup = BeautifulSoup(html, 'html.parser')
    headings = []
    
    for level in range(1, 7):
        for tag in soup.find_all(f'h{level}'):
            text = tag.get_text(strip=True)
            if text:  # Only include non-empty headings
                headings.append({
                    'level': level,
                    'text': text
                })
    
    return headings


def extract_images(html: str, base_url: str = '') -> List[Dict[str, str]]:
    """
    Extract image elements from HTML content.
    
    Captures source URLs and alt text for image SEO analysis, including
    alt text completeness and keyphrase inclusion checks.
    
    Args:
        html: Raw HTML content.
        base_url: Optional base URL for resolving relative image paths.
        
    Returns:
        List of dictionaries containing 'src', 'alt', and 'title' attributes.
        
    Example:
        >>> extract_images('<img src="/pic.jpg" alt="Description">')
        [{'src': '/pic.jpg', 'alt': 'Description', 'title': ''}]
    """
    if not html:
        return []
    
    soup = BeautifulSoup(html, 'html.parser')
    images = []
    
    for img in soup.find_all('img'):
        src = img.get('src', '')
        
        # Resolve relative URLs if base provided
        if base_url and src and not src.startswith(('http://', 'https://', 'data:')):
            from urllib.parse import urljoin
            src = urljoin(base_url, src)
        
        images.append({
            'src': src,
            'alt': img.get('alt', ''),
            'title': img.get('title', ''),
        })
    
    return images


def extract_links(html: str, base_domain: str = '') -> List[Dict[str, any]]:
    """
    Extract anchor tags from HTML with internal/external classification.
    
    Identifies link targets and anchor text for internal linking analysis
    and external authority signal detection.
    
    Args:
        html: Raw HTML content.
        base_domain: Current site's domain for external link detection 
                    (e.g., 'example.com').
        
    Returns:
        List of dictionaries with 'href', 'text', 'is_external', 'is_nofollow'.
        
    Example:
        >>> extract_links('<a href="/page">Link</a>', 'example.com')
        [{'href': '/page', 'text': 'Link', 'is_external': False, 'is_nofollow': False}]
    """
    if not html:
        return []
    
    soup = BeautifulSoup(html, 'html.parser')
    links = []
    
    for a in soup.find_all('a'):
        href = a.get('href', '')
        text = a.get_text(strip=True)
        rel = a.get('rel', [])
        
        # Handle rel attribute (could be string or list)
        if isinstance(rel, str):
            rel = rel.split()
        
        is_nofollow = 'nofollow' in rel
        is_external = False
        
        if href:
            parsed = urlparse(href)
            
            # Check if external by domain comparison
            if base_domain and parsed.netloc and base_domain not in parsed.netloc:
                is_external = True
            elif href.startswith(('http://', 'https://', '//')):
                # Starts with protocol but no base_domain provided, assume external
                if not base_domain:
                    is_external = True
                else:
                    is_external = base_domain not in parsed.netloc
        
        links.append({
            'href': href,
            'text': text,
            'is_external': is_external,
            'is_nofollow': is_nofollow,
        })
    
    return links


def extract_sentences(text: str) -> List[str]:
    """
    Split text into sentences using boundary detection.
    
    Handles common abbreviations (Mr., Mrs., Dr., etc.) and decimal numbers
    to avoid false sentence breaks. Strips leading/trailing whitespace.
    
    Args:
        text: Plain text content (should be HTML-stripped first).
        
    Returns:
        List of sentence strings.
        
    Example:
        >>> extract_sentences("First sentence. Second sentence! Third?")
        ['First sentence.', 'Second sentence!', 'Third?']
    """
    if not text:
        return []
    
    # Common abbreviations that end with periods but don't end sentences
    abbreviations = {
        'mr.', 'mrs.', 'ms.', 'dr.', 'prof.', 'sr.', 'jr.', 'inc.', 'ltd.',
        'corp.', 'co.', 'llc.', 'plc.', 'et al.', 'etc.', 'e.g.', 'i.e.',
        'vol.', 'vols.', 'pp.', 'pg.', 'p.', 'fig.', 'no.', 'nos.',
        'ave.', 'blvd.', 'rd.', 'st.', 'vs.', 'vol.', 'jan.', 'feb.', 'mar.',
        'apr.', 'jun.', 'jul.', 'aug.', 'sep.', 'sept.', 'oct.', 'nov.', 'dec.'
    }
    
    # Protect abbreviations temporarily
    placeholder = "\x00"
    protected_text = text
    
    for abbr in abbreviations:
        # Replace abbreviation periods with placeholder
        pattern = re.escape(abbr)
        protected_text = re.sub(
            rf'\b{pattern}', 
            abbr.replace('.', placeholder),
            protected_text,
            flags=re.IGNORECASE
        )
    
    # Split on sentence boundaries (.!? followed by space or end)
    # Also handle newlines as sentence boundaries
    sentence_endings = re.compile(r'[.!?]+\s+|[\n\r]+')
    raw_sentences = sentence_endings.split(protected_text)
    
    # Restore abbreviations and clean up
    sentences = []
    for sent in raw_sentences:
        sent = sent.replace(placeholder, '.').strip()
        # Remove leading punctuation except quotes/parentheses
        sent = re.sub(r'^[^\w\s"\']+', '', sent)
        if sent:
            sentences.append(sent)
    
    return sentences


def count_words(text: str) -> int:
    """
    Count words in text excluding punctuation.
    
    Splits on whitespace after removing punctuation, handling contractions
    and hyphenated words appropriately.
    
    Args:
        text: Plain text content.
        
    Returns:
        Integer word count.
        
    Example:
        >>> count_words("Hello, world! This is a test.")
        6
    """
    if not text or not isinstance(text, str):
        return 0
    
    # Convert to lowercase and remove punctuation except hyphens/apostrophes
    # Keep hyphens for compound words, apostrophes for contractions
    text = re.sub(r'[^\w\s\-\']', ' ', text.lower())
    
    # Split on whitespace and filter empty strings
    words = [w.strip('-\'') for w in text.split() if w.strip('-\'')]
    
    return len(words)


def calculate_content_hash(content: str) -> str:
    """
    Generate SHA-256 hash of content for change detection.
    
    Used to determine if post content has changed since last SEO analysis,
    allowing cache invalidation and avoiding unnecessary reprocessing.
    
    Args:
        content: String content to hash (typically HTML body).
        
    Returns:
        Hexadecimal digest string of the hash.
        
    Note:
        Returns empty string for None/empty input rather than hashing empty content.
    """
    if not content:
        return ""
    
    # Normalize content for consistent hashing (normalize newlines)
    normalized = content.replace('\r\n', '\n').strip()
    
    if CONTENT_HASH_ALGORITHM.lower() == 'sha256':
        return hashlib.sha256(normalized.encode('utf-8')).hexdigest()
    elif CONTENT_HASH_ALGORITHM.lower() == 'md5':
        return hashlib.md5(normalized.encode('utf-8')).hexdigest()
    else:
        # Default to sha256 if unknown algorithm specified
        return hashlib.sha256(normalized.encode('utf-8')).hexdigest()


def slugify_title(title: str, existing_slugs: Optional[List[str]] = None) -> str:
    """
    Convert title to URL-friendly slug with stop word removal.
    
    Process:
    1. Lowercase conversion
    2. Stop word removal (from SLUG_STOP_WORDS set)
    3. Special character removal/replacement
    4. Whitespace to hyphen conversion
    5. Uniqueness enforcement via numeric suffix
    
    Args:
        title: The post title to slugify.
        existing_slugs: List of existing slugs to check for uniqueness.
        
    Returns:
        Unique, URL-safe slug string.
        
    Example:
        >>> slugify_title("The Quick Brown Fox", ["the-quick-brown-fox"])
        'quick-brown-fox-1'
    """
    if not title:
        return ""
    
    existing_slugs = existing_slugs or []
    
    # Lowercase and split into words
    title_lower = title.lower()
    
    # Remove apostrophes and possessives first
    title_lower = re.sub(r"['’]s\b", '', title_lower)
    title_lower = title_lower.replace("'", '').replace("’", '')
    
    # Split into words, filter stop words, remove punctuation from words
    words = []
    for word in re.split(r'[^\w]+', title_lower):
        word = word.strip()
        if word and word not in SLUG_STOP_WORDS and len(word) > 0:
            # Remove any remaining non-alphanumeric from word
            word = re.sub(r'[^\w]', '', word)
            if word:
                words.append(word)
    
    # Join with hyphens
    base_slug = '-'.join(words)
    
    # Truncate to max length while preserving whole words
    if len(base_slug) > MAX_SLUG_LENGTH:
        truncated = base_slug[:MAX_SLUG_LENGTH]
        # Cut to last hyphen to preserve word boundaries
        last_hyphen = truncated.rfind('-')
        if last_hyphen > 10:  # Ensure we keep reasonable length
            base_slug = truncated[:last_hyphen]
        else:
            base_slug = truncated
    
    # Ensure uniqueness
    slug = base_slug
    counter = 1
    while slug in existing_slugs:
        suffix = f'-{counter}'
        # Make room for suffix if needed
        if len(slug) + len(suffix) > MAX_SLUG_LENGTH:
            slug = base_slug[:MAX_SLUG_LENGTH - len(suffix)] + suffix
        else:
            slug = base_slug + suffix
        counter += 1
    
    return slug


def find_keyphrase_positions(text: str, keyphrase: str) -> List[Tuple[int, int]]:
    """
    Find all case-insensitive occurrences of keyphrase in text.
    
    Returns start and end character positions for highlighting and
    proximity analysis.
    
    Args:
        text: The text to search within.
        keyphrase: The phrase to locate (case-insensitive).
        
    Returns:
        List of (start_index, end_index) tuples.
        
    Example:
        >>> find_keyphrase_positions("Hello world, hello World", "hello")
        [(0, 5), (14, 19)]
    """
    if not text or not keyphrase:
        return []
    
    positions = []
    text_lower = text.lower()
    keyphrase_lower = keyphrase.lower()
    key_len = len(keyphrase)
    
    # Find all non-overlapping occurrences
    start = 0
    while True:
        idx = text_lower.find(keyphrase_lower, start)
        if idx == -1:
            break
        positions.append((idx, idx + key_len))
        start = idx + 1
    
    return positions


def is_passive_voice(sentence: str) -> bool:
    """
    Detect passive voice using heuristic patterns.
    
    Identifies common passive constructions:
    - Forms of "be" + past participle
    - Auxiliary verbs + past participle
    
    Note:
        This is a heuristic and may have false positives/negatives.
        It catches common patterns like "is done", "was written", etc.
        
    Args:
        sentence: A single sentence string.
        
    Returns:
        True if passive voice patterns detected, False otherwise.
        
    Example:
        >>> is_passive_voice("The ball was thrown by John.")
        True
        >>> is_passive_voice("John threw the ball.")
        False
    """
    if not sentence:
        return False
    
    sentence_lower = sentence.lower()
    
    # Forms of "be" (including contractions)
    be_forms = [
        'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
        "'m", "'s", "'re", "'ve"
    ]
    
    # Common past participles (irregular)
    common_participles = {
        'done', 'made', 'taken', 'given', 'written', 'spoken', 'driven',
        'eaten', 'fallen', 'felt', 'found', 'gotten', 'got', 'hidden',
        'hit', 'held', 'kept', 'known', 'led', 'left', 'lent', 'let',
        'lost', 'meant', 'met', 'paid', 'put', 'read', 'ridden', 'rung',
        'risen', 'run', 'said', 'seen', 'sold', 'sent', 'set', 'shaken',
        'shown', 'shut', 'sung', 'sunk', 'sat', 'slept', 'spent', 'stood',
        'stolen', 'stuck', 'struck', 'sworn', 'swept', 'swollen', 'swum',
        'taken', 'taught', 'torn', 'told', 'thought', 'thrown', 'understood',
        'woken', 'worn', 'won', 'written', 'built', 'bought', 'brought',
        'caught', 'chosen', 'come', 'cost', 'cut', 'drawn', 'drunk', 'driven',
        'eaten', 'fallen', 'fed', 'felt', 'fought', 'found', 'flown', 'forgotten',
        'frozen', 'grown', 'hung', 'had', 'heard', 'hidden', 'created', 'used',
        'based', 'required', 'considered', 'called', 'found', 'provided',
        'needed', 'wanted', 'helped', 'started', 'turned', 'showed', 'played',
        'moved', 'believed', 'held', 'brought', 'happened', 'stood', 'opened',
        'walked', 'offered', 'remembered', 'loved', 'looked', 'shown'
    }
    
    # Pattern: be form + word ending in -ed/-en (regular participles)
    # or be form + common irregular participle
    
    words = re.findall(r'\b\w+\b', sentence_lower)
    
    for i, word in enumerate(words):
        # Check for "be" form
        if word in be_forms and i + 1 < len(words):
            next_word = words[i + 1]
            
            # Check if next word looks like a participle
            # Regular: ends in -ed or -en (but not -eed or -and)
            if next_word.endswith(('ed', 'en')):
                # Exclude common false positives
                if next_word not in {'seed', 'weed', 'fred', 'bed', 'red', 'led'}:
                    return True
            
            # Irregular participle
            if next_word in common_participles:
                return True
            
            # Check for adverb between be and participle (e.g., "was carefully written")
            if i + 2 < len(words) and next_word.endswith('ly'):
                following = words[i + 2]
                if following.endswith(('ed', 'en')) or following in common_participles:
                    return True
    
    # Pattern: "get/got/gotten + participle" (get-passive)
    for i, word in enumerate(words):
        if word in {'get', 'gets', 'got', 'gotten', 'getting'} and i + 1 < len(words):
            next_word = words[i + 1]
            if next_word.endswith(('ed', 'en')) or next_word in common_participles:
                return True
    
    return False


def starts_with_transition_word(sentence: str) -> bool:
    """
    Check if sentence begins with a transition word or phrase.
    
    Transition words indicate good text flow and structure. This checks
    against the comprehensive TRANSITION_WORDS set from constants.
    
    Args:
        sentence: A single sentence string.
        
    Returns:
        True if sentence starts with a transition word/phrase, False otherwise.
        
    Example:
        >>> starts_with_transition_word("However, this is not true.")
        True
        >>> starts_with_transition_word("This is a simple sentence.")
        False
    """
    if not sentence:
        return False
    
    sentence_lower = sentence.lower().strip()
    
    # Remove leading punctuation and whitespace
    sentence_lower = re.sub(r'^[^\w]+', '', sentence_lower)
    
    # Check for multi-word transitions first (longer phrases first)
    for transition in sorted(TRANSITION_WORDS, key=len, reverse=True):
        if sentence_lower.startswith(transition):
            # Ensure it's a whole word/phrase match (followed by space, punctuation, or end)
            remainder = sentence_lower[len(transition):]
            if not remainder or remainder[0] in ' \t\n\r,.;:!?':
                return True
    
    return False


def calculate_reading_time(word_count: int, words_per_minute: int = 200) -> int:
    """
    Calculate estimated reading time in minutes.
    
    Args:
        word_count: Total number of words in content.
        words_per_minute: Average reading speed (default 200 wpm).
        
    Returns:
        Estimated minutes to read, rounded up. Minimum 1 minute.
        
    Example:
        >>> calculate_reading_time(450)
        3
    """
    if word_count <= 0:
        return 0
    
    minutes = word_count / words_per_minute
    return max(1, int(minutes + 0.5))  # Round to nearest, minimum 1