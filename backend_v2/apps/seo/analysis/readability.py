"""
Readability analysis engine using textstat and linguistic heuristics.

This module provides comprehensive readability metrics computation including
Flesch-Kincaid scores, sentence structure analysis, passive voice detection,
and transition word coverage. It operates on plain text and HTML content
without Django dependencies for standalone testability.

All functions return structured dictionaries with raw metrics and qualitative
assessments (pass/warning/fail) based on established readability thresholds.
"""

import textstat
from typing import Dict, List, Tuple, Optional
from collections import Counter
import re

from .utils import (
    strip_html,
    extract_sentences,
    is_passive_voice,
    starts_with_transition_word,
    count_words,
)

# =============================================================================
# READABILITY THRESHOLDS (local constants for zero Django dependency)
# =============================================================================

FLESCH_READING_EASE_GOOD = 60.0
FLESCH_READING_EASE_OK = 40.0
MAX_SENTENCE_LENGTH = 20
MAX_SENTENCES_OVER_LENGTH_PCT = 25.0
MAX_PASSIVE_VOICE_PCT = 10.0
MIN_TRANSITION_WORDS_PCT = 30.0
MAX_CONSECUTIVE_SAME_START = 3
MAX_PARAGRAPH_WORDS = 150

# =============================================================================
# FLESCH-KINCAID METRICS
# =============================================================================


def compute_flesch_reading_ease(text: str) -> float:
    """
    Calculate Flesch Reading Ease score.
    
    Higher scores indicate easier readability. Scale typically ranges
    from 0-100, with 60-70 considered standard/plain English.
    
    Formula: 206.835 - (1.015 × avg sentence length) - (84.6 × avg syllables per word)
    
    Args:
        text: Plain text content to analyze.
        
    Returns:
        Float score. Returns 0.0 for empty/invalid input.
        
    Interpretation:
        90-100: Very Easy (5th grade)
        80-89: Easy (6th grade)
        70-79: Fairly Easy (7th grade)
        60-69: Standard (8th-9th grade)
        50-59: Fairly Difficult (10th-12th grade)
        30-49: Difficult (College level)
        0-29: Very Difficult (Graduate level)
    """
    if not text or not isinstance(text, str):
        return 0.0
    
    try:
        # textstat expects string
        score = textstat.flesch_reading_ease(text)
        # Ensure we return a float, handling any NaN or None
        if score is None:
            return 0.0
        return float(score)
    except Exception:
        # Fallback for textstat errors on malformed input
        return 0.0


def compute_flesch_kincaid_grade(text: str) -> float:
    """
    Calculate Flesch-Kincaid Grade Level.
    
    Indicates the US school grade level required to understand the text.
    For general audiences, aim for 8th grade or below.
    
    Formula: (0.39 × avg sentence length) + (11.8 × avg syllables per word) - 15.59
    
    Args:
        text: Plain text content to analyze.
        
    Returns:
        Float representing grade level (e.g., 8.5 = 8th grade, 5th month).
        Returns 0.0 for empty/invalid input.
    """
    if not text or not isinstance(text, str):
        return 0.0
    
    try:
        grade = textstat.flesch_kincaid_grade(text)
        if grade is None:
            return 0.0
        return float(grade)
    except Exception:
        return 0.0


# =============================================================================
# SENTENCE STRUCTURE METRICS
# =============================================================================


def compute_sentence_metrics(sentences: List[str]) -> Dict[str, float]:
    """
    Analyze sentence length distribution and complexity.
    
    Args:
        sentences: List of sentence strings from extract_sentences().
        
    Returns:
        Dictionary containing:
            - avg_length: Average words per sentence (float)
            - max_length: Maximum sentence word count (int)
            - total_sentences: Total number of sentences (int)
            - long_sentences: Count of sentences > 20 words (int)
            - long_sentence_pct: Percentage of long sentences (float)
            
    Example:
        >>> compute_sentence_metrics(["Short.", "This is a much longer sentence with many words."])
        {
            'avg_length': 6.0,
            'max_length': 9,
            'total_sentences': 2,
            'long_sentences': 0,
            'long_sentence_pct': 0.0
        }
    """
    if not sentences:
        return {
            'avg_length': 0.0,
            'max_length': 0,
            'total_sentences': 0,
            'long_sentences': 0,
            'long_sentence_pct': 0.0,
        }
    
    word_counts = [count_words(sent) for sent in sentences]
    total = len(word_counts)
    
    if total == 0:
        return {
            'avg_length': 0.0,
            'max_length': 0,
            'total_sentences': 0,
            'long_sentences': 0,
            'long_sentence_pct': 0.0,
        }
    
    long_sentences = sum(1 for wc in word_counts if wc > MAX_SENTENCE_LENGTH)
    
    return {
        'avg_length': sum(word_counts) / total,
        'max_length': max(word_counts) if word_counts else 0,
        'total_sentences': total,
        'long_sentences': long_sentences,
        'long_sentence_pct': (long_sentences / total) * 100,
    }


def compute_passive_voice_percentage(sentences: List[str]) -> float:
    """
    Calculate percentage of sentences using passive voice constructions.
    
    Uses heuristic detection from utils.is_passive_voice() to identify
    passive constructions like "was written", "is done", etc.
    
    Args:
        sentences: List of sentence strings.
        
    Returns:
        Float percentage (0.0-100.0) of passive sentences.
    """
    if not sentences:
        return 0.0
    
    passive_count = sum(1 for sent in sentences if is_passive_voice(sent))
    return (passive_count / len(sentences)) * 100


def compute_transition_word_coverage(sentences: List[str]) -> float:
    """
    Calculate percentage of sentences beginning with transition words.
    
    Transition words (however, furthermore, therefore, etc.) indicate
    good text flow and structure. Target: 30%+ of sentences.
    
    Args:
        sentences: List of sentence strings.
        
    Returns:
        Float percentage (0.0-100.0) of sentences with transition words.
    """
    if not sentences:
        return 0.0
    
    transition_count = sum(
        1 for sent in sentences if starts_with_transition_word(sent)
    )
    return (transition_count / len(sentences)) * 100


def compute_consecutive_sentence_starts(sentences: List[str]) -> List[str]:
    """
    Identify words that start three or more consecutive sentences.
    
    Repeated sentence starts indicate monotonous writing style.
    Returns the problematic starting words for user feedback.
    
    Args:
        sentences: List of sentence strings in original order.
        
    Returns:
        List of lowercase words that start 3+ consecutive sentences.
        
    Example:
        >>> compute_consecutive_sentence_starts([
        ...     "The cat sat.", "The dog ran.", "The bird flew.",
        ...     "Then it stopped."
        ... ])
        ['the']
    """
    if not sentences or len(sentences) < MAX_CONSECUTIVE_SAME_START:
        return []
    
    # Extract first words
    first_words = []
    for sent in sentences:
        # Get first word, lowercase, strip punctuation
        words = re.findall(r'\b\w+\b', sent.lower())
        if words:
            first_words.append(words[0])
        else:
            first_words.append('')
    
    problematic = []
    current_word = None
    count = 1
    
    for word in first_words:
        if word == current_word and word:
            count += 1
            if count == MAX_CONSECUTIVE_SAME_START:
                problematic.append(word)
        else:
            current_word = word
            count = 1
    
    return list(set(problematic))  # Return unique words only


# =============================================================================
# PARAGRAPH METRICS
# =============================================================================


def compute_paragraph_lengths(html: str) -> List[int]:
    """
    Calculate word counts for each paragraph in HTML content.
    
    Identifies long paragraphs that may hurt readability (>150 words).
    
    Args:
        html: Raw HTML content.
        
    Returns:
        List of word counts, one per paragraph.
    """
    if not html:
        return []
    
    # Use BeautifulSoup to find paragraph blocks
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'html.parser')
    
    # Find p tags and divs that look like paragraphs
    paragraphs = soup.find_all(['p', 'div'])
    lengths = []
    
    for p in paragraphs:
        text = p.get_text(strip=True)
        if text:
            wc = count_words(text)
            if wc > 0:  # Only count non-empty paragraphs
                lengths.append(wc)
    
    return lengths


# =============================================================================
# ORCHESTRATION
# =============================================================================


def analyze_readability(html_body: str) -> Dict[str, any]:
    """
    Comprehensive readability analysis orchestration.
    
    Performs complete readability assessment including Flesch scores,
    sentence metrics, passive voice detection, transition word usage,
    and paragraph structure analysis.
    
    Args:
        html_body: Raw HTML content from the post body.
        
    Returns:
        Structured dictionary containing:
            - flesch_reading_ease: Score and status
            - flesch_kincaid_grade: Grade level
            - sentence_metrics: Length distribution analysis
            - passive_voice: Percentage and status
            - transition_words: Percentage and status
            - consecutive_starts: Problematic repeated starters
            - paragraph_metrics: Length distribution
            - overall_score: Normalized 0-100 readability score
            - overall_status: 'pass', 'warning', or 'fail'
            
    Status Logic:
        - pass: Flesch >= 60, passive <= 10%, transitions >= 30%
        - warning: Flesch >= 40, passive <= 15%, transitions >= 20%
        - fail: Below warning thresholds
    """
    if not html_body:
        return {
            'flesch_reading_ease': {'score': 0.0, 'status': 'fail'},
            'flesch_kincaid_grade': 0.0,
            'sentence_metrics': {
                'avg_length': 0.0,
                'max_length': 0,
                'total_sentences': 0,
                'long_sentences': 0,
                'long_sentence_pct': 0.0,
                'status': 'fail',
            },
            'passive_voice': {'percentage': 0.0, 'status': 'pass'},
            'transition_words': {'percentage': 0.0, 'status': 'fail'},
            'consecutive_starts': [],
            'paragraph_metrics': {
                'count': 0,
                'avg_length': 0.0,
                'max_length': 0,
                'too_long_count': 0,
            },
            'overall_score': 0,
            'overall_status': 'fail',
            'word_count': 0,
        }
    
    # Extract text and sentences
    plain_text = strip_html(html_body)
    sentences = extract_sentences(plain_text)
    word_count = count_words(plain_text)
    
    # Flesch metrics
    flesch_score = compute_flesch_reading_ease(plain_text)
    if flesch_score >= FLESCH_READING_EASE_GOOD:
        flesch_status = 'pass'
    elif flesch_score >= FLESCH_READING_EASE_OK:
        flesch_status = 'warning'
    else:
        flesch_status = 'fail'
    
    grade_level = compute_flesch_kincaid_grade(plain_text)
    
    # Sentence metrics
    sent_metrics = compute_sentence_metrics(sentences)
    if sent_metrics['long_sentence_pct'] <= MAX_SENTENCES_OVER_LENGTH_PCT:
        sent_status = 'pass'
    elif sent_metrics['long_sentence_pct'] <= MAX_SENTENCES_OVER_LENGTH_PCT + 10:
        sent_status = 'warning'
    else:
        sent_status = 'fail'
    
    # Passive voice
    passive_pct = compute_passive_voice_percentage(sentences)
    if passive_pct <= MAX_PASSIVE_VOICE_PCT:
        passive_status = 'pass'
    elif passive_pct <= MAX_PASSIVE_VOICE_PCT + 5:
        passive_status = 'warning'
    else:
        passive_status = 'fail'
    
    # Transition words
    transition_pct = compute_transition_word_coverage(sentences)
    if transition_pct >= MIN_TRANSITION_WORDS_PCT:
        transition_status = 'pass'
    elif transition_pct >= MIN_TRANSITION_WORDS_PCT - 10:
        transition_status = 'warning'
    else:
        transition_status = 'fail'
    
    # Consecutive starts
    consecutive_starts = compute_consecutive_sentence_starts(sentences)
    
    # Paragraph metrics
    para_lengths = compute_paragraph_lengths(html_body)
    if para_lengths:
        para_count = len(para_lengths)
        para_avg = sum(para_lengths) / para_count
        para_max = max(para_lengths)
        para_too_long = sum(1 for pl in para_lengths if pl > MAX_PARAGRAPH_WORDS)
    else:
        para_count = 0
        para_avg = 0.0
        para_max = 0
        para_too_long = 0
    
    # Calculate overall score (0-100) based on weighted factors
    # Flesch: 40%, Sentences: 20%, Passive: 20%, Transitions: 20%
    flesch_normalized = min(100, max(0, flesch_score))
    sentence_normalized = max(0, 100 - (sent_metrics['long_sentence_pct'] * 2))
    passive_normalized = max(0, 100 - (passive_pct * 5))
    transition_normalized = min(100, transition_pct * 3)  # 30% = 90 pts max
    
    overall_score = int(
        (flesch_normalized * 0.4) +
        (sentence_normalized * 0.2) +
        (passive_normalized * 0.2) +
        (transition_normalized * 0.2)
    )
    
    # Determine overall status
    status_checks = [flesch_status, sent_status, passive_status, transition_status]
    if 'fail' in status_checks:
        overall_status = 'fail'
    elif 'warning' in status_checks:
        overall_status = 'warning'
    else:
        overall_status = 'pass'
    
    return {
        'flesch_reading_ease': {
            'score': round(flesch_score, 1),
            'status': flesch_status,
            'interpretation': _get_flesch_interpretation(flesch_score),
        },
        'flesch_kincaid_grade': round(grade_level, 1),
        'sentence_metrics': {
            **sent_metrics,
            'status': sent_status,
        },
        'passive_voice': {
            'percentage': round(passive_pct, 1),
            'status': passive_status,
        },
        'transition_words': {
            'percentage': round(transition_pct, 1),
            'status': transition_status,
        },
        'consecutive_starts': consecutive_starts,
        'paragraph_metrics': {
            'count': para_count,
            'avg_length': round(para_avg, 1),
            'max_length': para_max,
            'too_long_count': para_too_long,
        },
        'overall_score': overall_score,
        'overall_status': overall_status,
        'word_count': word_count,
    }


def _get_flesch_interpretation(score: float) -> str:
    """
    Convert Flesch score to human-readable interpretation.
    
    Args:
        score: Flesch Reading Ease score.
        
    Returns:
        String describing the difficulty level.
    """
    if score >= 90:
        return 'Very Easy (5th grade)'
    elif score >= 80:
        return 'Easy (6th grade)'
    elif score >= 70:
        return 'Fairly Easy (7th grade)'
    elif score >= 60:
        return 'Standard (8th-9th grade)'
    elif score >= 50:
        return 'Fairly Difficult (10th-12th grade)'
    elif score >= 30:
        return 'Difficult (College)'
    else:
        return 'Very Difficult (Graduate)'