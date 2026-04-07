"""
SEO Analysis Engine - Public API

Pure-Python SEO analysis subpackage providing Yoast-level intelligence
for blog content. Zero Django dependencies for maximum testability,
reusability, and standalone usage.

Public API:
    SEOAnalyzer          - Main orchestrator class
    analyze_post         - High-level convenience function
    analyze_readability  - Standalone readability analysis
    register_check       - Decorator for extensible SEO checks
    execute_all_checks   - Run all registered checks
    calculate_total_score- Aggregate weighted SEO score

All checks are automatically registered when this package is imported
(via decorators in engine.py).
"""

# =============================================================================
# PUBLIC API EXPORTS
# =============================================================================

# Core analysis engine (imports checks_registry + utils + readability)
from .engine import (
    SEOAnalyzer,
    analyze_post,
)

# Expose static method as function for convenience
detect_schema_type = SEOAnalyzer.detect_schema_type

# Readability analysis
from .readability import analyze_readability

# Extensible registry system
from .checks_registry import (
    register_check,
    execute_all_checks,
    calculate_total_score,
    unregister_check,
    get_all_checks,
    clear_registry,
    get_check,
)

# Frequently used utilities (for custom checks or external tools)
from .utils import (
    strip_html,
    extract_headings,
    extract_images,
    extract_links,
    extract_sentences,
    count_words,
    calculate_content_hash,
    slugify_title,
    find_keyphrase_positions,
    is_passive_voice,
    starts_with_transition_word,
    calculate_reading_time,
)

# =============================================================================
# PACKAGE METADATA
# =============================================================================

__version__ = "1.0.0"
__all__ = [
    # Core engine
    "SEOAnalyzer",
    "analyze_post",
    "detect_schema_type",
    # Readability
    "analyze_readability",
    # Registry & execution
    "register_check",
    "execute_all_checks",
    "calculate_total_score",
    "unregister_check",
    "get_all_checks",
    "clear_registry",
    "get_check",
    # Utilities
    "strip_html",
    "extract_headings",
    "extract_images",
    "extract_links",
    "extract_sentences",
    "count_words",
    "calculate_content_hash",
    "slugify_title",
    "find_keyphrase_positions",
    "is_passive_voice",
    "starts_with_transition_word",
    "calculate_reading_time",
]

# Auto-register all checks when the analysis package is imported
# (the @register_check decorators in engine.py execute on import)
# This ensures the registry is always populated for production use.