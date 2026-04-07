"""
SEO Checks Registry - Plugin System for Extensible Analysis.

Implements a registry pattern allowing SEO checks to be dynamically registered,
unregistered, and executed. This enables plugin-like extensibility where new
checks can be added without modifying core analysis logic.

The registry maintains check metadata (ID, weight) alongside callable functions,
enabling weighted score aggregation and modular check management.

Note:
    This module has zero Django dependencies for standalone testability.
    Check functions receive pure Python dictionaries (post_data) and return
    structured result dictionaries.
"""

import functools
import logging
from typing import Callable, Dict, List, Optional, Any, Union

# Configure module logger
logger = logging.getLogger(__name__)

# =============================================================================
# REGISTRY STORAGE
# =============================================================================

# Internal registry storage: {check_id: {'weight': float, 'func': callable}}
_registry: Dict[str, Dict[str, Any]] = {}

# Valid statuses for check results
VALID_STATUSES = {'pass', 'warning', 'fail'}

# =============================================================================
# REGISTRY MANAGEMENT
# =============================================================================


def register_check(
    check_id: str,
    weight: float,
    func: Optional[Callable[[Dict[str, Any]], Dict[str, Any]]] = None
) -> Union[Callable, Callable[[Callable], Callable]]:
    """
    Register an SEO check function with the global registry.
    
    Can be used as a decorator or as a direct function call:
    
    As decorator:
        @register_check('keyphrase_in_title', 0.15)
        def check_title(post_data):
            ...
    
    As function:
        register_check('keyphrase_in_title', 0.15, check_title_func)
    
    Args:
        check_id: Unique identifier for this check (e.g., 'keyphrase_in_title').
        weight: Float between 0.0 and 1.0 representing contribution to total score.
        func: The check function to register. If None, returns decorator.
        
    Returns:
        Decorator function if func is None, otherwise the registered function.
        
    Raises:
        ValueError: If check_id already registered or weight invalid.
        
    Check Function Signature:
        func(post_data: dict) -> dict
        
        post_data contains:
            - title: str
            - body: str (HTML)
            - slug: str
            - seo_title: str
            - meta_description: str
            - focus_keyphrase: str
            - headings: list[dict]
            - images: list[dict]
            - links: list[dict]
            - word_count: int
            - sentences: list[str]
            - (and other extracted post data)
            
        Return dict must contain:
            - check_id: str (should match registered ID)
            - status: str ('pass', 'warning', or 'fail')
            - message: str (human-readable explanation)
            - weight: float (echo back the weight)
            - score_contribution: float (0.0 to weight, partial credit allowed)
    """
    if not isinstance(check_id, str) or not check_id:
        raise ValueError("check_id must be a non-empty string")
    
    if not (0.0 <= weight <= 1.0):
        raise ValueError(f"weight must be between 0.0 and 1.0, got {weight}")
    
    if check_id in _registry:
        raise ValueError(f"Check '{check_id}' is already registered")
    
    def decorator(f: Callable[[Dict[str, Any]], Dict[str, Any]]) -> Callable[[Dict[str, Any]], Dict[str, Any]]:
        """
        Inner decorator that validates and registers the function.
        """
        # Validate function signature (basic check)
        if not callable(f):
            raise TypeError(f"Registered check must be callable, got {type(f)}")
        
        # Store in registry
        _registry[check_id] = {
            'weight': weight,
            'func': f,
            'check_id': check_id,
        }
        
        logger.debug(f"Registered SEO check '{check_id}' with weight {weight}")
        
        # Preserve function metadata
        @functools.wraps(f)
        def wrapper(post_data: Dict[str, Any]) -> Dict[str, Any]:
            """
            Wrapper that executes the check with error handling.
            """
            try:
                result = f(post_data)
                # Validate result structure
                _validate_check_result(result, check_id)
                return result
            except Exception as e:
                logger.error(f"Check '{check_id}' failed with error: {e}")
                # Return fail status on error to prevent crashes
                return {
                    'check_id': check_id,
                    'status': 'fail',
                    'message': f'Check execution error: {str(e)}',
                    'weight': weight,
                    'score_contribution': 0.0,
                }
        
        # Store wrapper reference for execution
        _registry[check_id]['wrapper'] = wrapper
        
        return wrapper
    
    if func is not None:
        # Direct registration: register_check('id', 0.5, my_func)
        return decorator(func)
    
    # Decorator usage: @register_check('id', 0.5)
    return decorator


def unregister_check(check_id: str) -> bool:
    """
    Remove a check from the registry.
    
    Useful for testing or dynamically disabling checks. Silently returns
    False if check_id doesn't exist.
    
    Args:
        check_id: The unique identifier of the check to remove.
        
    Returns:
        True if check was removed, False if not found.
    """
    if check_id in _registry:
        del _registry[check_id]
        logger.debug(f"Unregistered SEO check '{check_id}'")
        return True
    return False


def get_check(check_id: str) -> Optional[Callable[[Dict[str, Any]], Dict[str, Any]]]:
    """
    Retrieve a registered check function by ID.
    
    Args:
        check_id: The unique identifier of the check.
        
    Returns:
        The check wrapper function, or None if not found.
    """
    check_info = _registry.get(check_id)
    if check_info:
        return check_info.get('wrapper') or check_info['func']
    return None


def get_all_checks() -> Dict[str, Dict[str, Any]]:
    """
    Retrieve all registered checks.
    
    Returns:
        Dictionary mapping check_id to check metadata dict containing:
        - weight: float
        - func: original callable
        - check_id: str
        - wrapper: wrapped callable with error handling
        
    Note:
        Returns a copy to prevent external mutation of registry.
    """
    return dict(_registry)


def clear_registry() -> None:
    """
    Clear all registered checks.
    
    WARNING: This removes all checks from the registry. Intended primarily
    for testing purposes to ensure clean state between test cases.
    """
    global _registry
    _registry = {}
    logger.debug("Cleared all SEO checks from registry")


# =============================================================================
# VALIDATION HELPERS
# =============================================================================


def _validate_check_result(result: Dict[str, Any], expected_id: str) -> None:
    """
    Validate that a check result conforms to expected structure.
    
    Args:
        result: The dictionary returned by a check function.
        expected_id: The expected check_id for this result.
        
    Raises:
        ValueError: If result structure is invalid.
    """
    if not isinstance(result, dict):
        raise ValueError(f"Check result must be dict, got {type(result)}")
    
    # Required keys
    required_keys = {'check_id', 'status', 'message', 'weight', 'score_contribution'}
    missing = required_keys - set(result.keys())
    if missing:
        raise ValueError(f"Check result missing required keys: {missing}")
    
    # Validate check_id matches
    if result['check_id'] != expected_id:
        raise ValueError(
            f"Check ID mismatch: expected '{expected_id}', got '{result['check_id']}'"
        )
    
    # Validate status
    if result['status'] not in VALID_STATUSES:
        raise ValueError(
            f"Invalid status '{result['status']}'. Must be one of: {VALID_STATUSES}"
        )
    
    # Validate weight is number
    if not isinstance(result['weight'], (int, float)):
        raise ValueError(f"Weight must be numeric, got {type(result['weight'])}")
    
    # Validate score_contribution
    contrib = result['score_contribution']
    if not isinstance(contrib, (int, float)):
        raise ValueError(f"score_contribution must be numeric, got {type(contrib)}")
    if not (0.0 <= contrib <= result['weight']):
        raise ValueError(
            f"score_contribution {contrib} must be between 0.0 and weight {result['weight']}"
        )


# =============================================================================
# EXECUTION HELPERS
# =============================================================================


def execute_check(check_id: str, post_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    Execute a single registered check against post data.
    
    Args:
        check_id: The ID of the check to execute.
        post_data: Dictionary containing post content and metadata.
        
    Returns:
        Check result dictionary, or None if check not found.
    """
    check_func = get_check(check_id)
    if not check_func:
        logger.warning(f"Check '{check_id}' not found in registry")
        return None
    
    return check_func(post_data)


def execute_all_checks(post_data: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Execute all registered checks against post data.
    
    Args:
        post_data: Dictionary containing post content and metadata.
        
    Returns:
        List of check result dictionaries from all registered checks.
    """
    results = []
    for check_id, check_info in _registry.items():
        try:
            func = check_info.get('wrapper') or check_info['func']
            result = func(post_data)
            results.append(result)
        except Exception as e:
            logger.error(f"Unexpected error executing check '{check_id}': {e}")
            # Append error result to maintain consistency
            results.append({
                'check_id': check_id,
                'status': 'fail',
                'message': f'Execution error: {str(e)}',
                'weight': check_info.get('weight', 0.0),
                'score_contribution': 0.0,
            })
    
    return results


def calculate_total_score(results: List[Dict[str, Any]]) -> Dict[str, Union[int, List[str]]]:
    """
    Calculate aggregate SEO score from individual check results.
    
    Args:
        results: List of check result dictionaries.
        
    Returns:
        Dictionary containing:
            - total_score: int (0-100)
            - max_possible: float (sum of all weights, typically 1.0)
            - actual_score: float (sum of contributions)
            - passing_checks: list of check_ids with 'pass' status
            - warning_checks: list of check_ids with 'warning' status
            - failing_checks: list of check_ids with 'fail' status
    """
    if not results:
        return {
            'total_score': 0,
            'max_possible': 0.0,
            'actual_score': 0.0,
            'passing_checks': [],
            'warning_checks': [],
            'failing_checks': [],
        }
    
    max_possible = sum(r['weight'] for r in results)
    actual_score = sum(r['score_contribution'] for r in results)
    
    # Normalize to 0-100 scale
    if max_possible > 0:
        total_score = int((actual_score / max_possible) * 100)
    else:
        total_score = 0
    
    passing = [r['check_id'] for r in results if r['status'] == 'pass']
    warnings = [r['check_id'] for r in results if r['status'] == 'warning']
    failing = [r['check_id'] for r in results if r['status'] == 'fail']
    
    return {
        'total_score': total_score,
        'max_possible': round(max_possible, 3),
        'actual_score': round(actual_score, 3),
        'passing_checks': passing,
        'warning_checks': warnings,
        'failing_checks': failing,
    }