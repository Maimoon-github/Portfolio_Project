"""
Management Command: Validate Post Schema.

Validates Schema.org structured data markup using extruct library.
Can validate by post ID, URL, or all published posts. Useful for CI/CD
pipelines and pre-deployment validation.

Exit Codes:
    0: All validations passed
    1: One or more validations failed
    2: Configuration or system error
"""

import json
import logging
import sys
from typing import Any, Dict, List, Optional

import requests
from django.apps import apps
from django.core.management.base import BaseCommand, CommandError
from django.test import Client
from django.urls import reverse

from seo.schema import validate_schema_with_extruct, get_schema_json_ld
from seo.services import render_schema_json_ld

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    """
    Validate Schema.org structured data for blog posts.
    
    Supports three modes:
    1. Single post by ID (--post-id)
    2. Single URL (--url)
    3. All published posts (--all)
    
    Examples:
        python manage.py validate_post_schema --post-id 123
        python manage.py validate_post_schema --url https://example.com/post/slug/
        python manage.py validate_post_schema --all
    """
    
    help = 'Validate Schema.org structured data for posts'
    
    def add_arguments(self, parser: Any) -> None:
        """Define command-line arguments."""
        # Single post by ID
        parser.add_argument(
            '--post-id',
            type=int,
            help='Validate specific post by primary key'
        )
        
        # Single URL
        parser.add_argument(
            '--url',
            type=str,
            help='Validate specific URL (absolute or relative)'
        )
        
        # Validate all posts
        parser.add_argument(
            '--all',
            action='store_true',
            help='Validate all published posts (may be slow)'
        )
        
        # Output format
        parser.add_argument(
            '--format',
            choices=['text', 'json'],
            default='text',
            help='Output format (default: text)'
        )
        
        # Verbose mode
        parser.add_argument(
            '-v', '--verbose',
            action='store_true',
            help='Show detailed validation output'
        )
        
        # Fail on warning
        parser.add_argument(
            '--strict',
            action='store_true',
            help='Treat warnings as failures'
        )
    
    def handle(self, *args: Any, **options: Any) -> None:
        """
        Execute schema validation.
        
        Args:
            *args: Positional arguments.
            **options: Parsed command-line options.
        """
        post_id: Optional[int] = options.get('post_id')
        url: Optional[str] = options.get('url')
        validate_all: bool = options.get('all', False)
        output_format: str = options.get('format', 'text')
        verbose: bool = options.get('verbose', False)
        strict: bool = options.get('strict', False)
        
        # Validate argument combinations
        if sum([bool(post_id), bool(url), validate_all]) != 1:
            raise CommandError(
                "Specify exactly one of: --post-id, --url, or --all"
            )
        
        # Check extruct availability
        try:
            import extruct
        except ImportError:
            raise CommandError(
                "extruct is required for schema validation. "
                "Install with: pip install extruct>=0.17.0"
            )
        
        results: List[Dict[str, Any]] = []
        exit_code = 0
        
        try:
            if post_id:
                results = self._validate_by_id(post_id, verbose)
            elif url:
                results = self._validate_by_url(url, verbose)
            elif validate_all:
                results = self._validate_all(verbose)
            
            # Process results
            passed = sum(1 for r in results if r.get('valid', False))
            failed = len(results) - passed
            warnings = sum(
                1 for r in results 
                if r.get('warnings') and not r.get('valid', False)
            )
            
            # Determine exit code
            if failed > 0:
                exit_code = 1
            elif strict and warnings > 0:
                exit_code = 1
            
            # Output results
            if output_format == 'json':
                self._output_json(results, passed, failed)
            else:
                self._output_text(results, passed, failed, warnings, verbose)
            
        except Exception as e:
            logger.exception("Schema validation failed")
            self.stderr.write(self.style.ERROR(f"Validation error: {e}"))
            sys.exit(2)
        
        sys.exit(exit_code)
    
    def _validate_by_id(self, post_id: int, verbose: bool) -> List[Dict[str, Any]]:
        """
        Validate schema for a single post by ID.
        
        Args:
            post_id: Post primary key.
            verbose: Show detailed output.
            
        Returns:
            List containing single validation result dict.
        """
        Post = apps.get_model('blog', 'Post')
        
        try:
            post = Post.objects.select_related('seo').get(pk=post_id)
        except Post.DoesNotExist:
            raise CommandError(f"Post {post_id} not found")
        
        # Generate schema
        schema_json = render_schema_json_ld(post)
        
        if not schema_json:
            return [{
                'post_id': post_id,
                'url': post.get_absolute_url(),
                'valid': False,
                'error': 'No schema generated for post',
                'schema_type': None
            }]
        
        # Validate
        result = self._validate_schema(schema_json, post)
        result['post_id'] = post_id
        result['url'] = post.get_absolute_url()
        
        return [result]
    
    def _validate_by_url(self, url: str, verbose: bool) -> List[Dict[str, Any]]:
        """
        Validate schema by fetching and parsing URL.
        
        Args:
            url: Absolute or relative URL to validate.
            verbose: Show detailed output.
            
        Returns:
            List containing single validation result dict.
        """
        # Ensure absolute URL
        if url.startswith('/'):
            # Use Django test client for relative URLs
            client = Client()
            response = client.get(url)
            html_content = response.content.decode('utf-8')
        else:
            # Fetch external URL
            try:
                response = requests.get(url, timeout=30)
                response.raise_for_status()
                html_content = response.text
            except requests.RequestException as e:
                return [{
                    'url': url,
                    'valid': False,
                    'error': f'Failed to fetch URL: {e}',
                    'schema_type': None
                }]
        
        # Extract and validate
        validation = validate_schema_with_extruct(html_content)
        
        result = {
            'url': url,
            'valid': 'error' not in validation,
            'schemas_found': self._count_schemas(validation),
            'details': validation if verbose else None
        }
        
        return [result]
    
    def _validate_all(self, verbose: bool) -> List[Dict[str, Any]]:
        """
        Validate schema for all published posts.
        
        Args:
            verbose: Show detailed output.
            
        Returns:
            List of validation result dicts.
        """
        Post = apps.get_model('blog', 'Post')
        
        posts = Post.objects.filter(
            status='published'
        ).select_related('seo').iterator(chunk_size=100)
        
        results = []
        total = 0
        
        self.stdout.write("Validating all published posts...")
        
        for post in posts:
            total += 1
            schema_json = render_schema_json_ld(post)
            
            if not schema_json:
                results.append({
                    'post_id': post.pk,
                    'url': post.get_absolute_url(),
                    'title': post.title[:50],
                    'valid': False,
                    'error': 'No schema generated',
                    'schema_type': None
                })
                continue
            
            result = self._validate_schema(schema_json, post)
            result['post_id'] = post.pk
            result['url'] = post.get_absolute_url()
            result['title'] = post.title[:50]
            
            results.append(result)
            
            if total % 50 == 0:
                self.stdout.write(f"  Processed {total} posts...")
        
        self.stdout.write(f"Validated {total} post(s)")
        return results
    
    def _validate_schema(self, schema_json: str, post: Any) -> Dict[str, Any]:
        """
        Validate a single schema JSON string.
        
        Args:
            schema_json: JSON-LD string to validate.
            post: Post instance (for context).
            
        Returns:
            Validation result dict.
        """
        try:
            # Parse JSON
            schema_data = json.loads(schema_json)
        except json.JSONDecodeError as e:
            return {
                'valid': False,
                'error': f'Invalid JSON: {e}',
                'schema_type': None
            }
        
        # Check required fields
        errors = []
        warnings = []
        
        if '@context' not in schema_data:
            errors.append("Missing @context field")
        elif 'schema.org' not in str(schema_data['@context']).lower():
            errors.append("Invalid @context (should reference schema.org)")
        
        if '@type' not in schema_data:
            errors.append("Missing @type field")
        
        schema_type = schema_data.get('@type', 'Unknown')
        
        # Type-specific validation
        if schema_type in ('BlogPosting', 'Article', 'NewsArticle'):
            required_fields = ['headline', 'author', 'datePublished']
            for field in required_fields:
                if field not in schema_data:
                    errors.append(f"Missing required field: {field}")
            
            # Recommended fields
            recommended = ['description', 'image', 'publisher']
            for field in recommended:
                if field not in schema_data:
                    warnings.append(f"Missing recommended field: {field}")
        
        elif schema_type == 'FAQPage':
            if 'mainEntity' not in schema_data or not schema_data['mainEntity']:
                errors.append("FAQPage requires mainEntity with Question items")
        
        elif schema_type == 'HowTo':
            if 'step' not in schema_data or not schema_data['step']:
                errors.append("HowTo requires step items")
        
        # Validate using extruct (round-trip test)
        try:
            # Wrap in HTML for extruct
            html = f'<html><head><script type="application/ld+json">{schema_json}</script></head></html>'
            extracted = validate_schema_with_extruct(html)
            
            if 'json-ld' not in extracted or not extracted['json-ld']:
                errors.append("extruct could not parse JSON-LD")
                
        except Exception as e:
            warnings.append(f"extruct validation failed: {e}")
        
        return {
            'valid': len(errors) == 0,
            'schema_type': schema_type,
            'errors': errors,
            'warnings': warnings,
            'schema_preview': schema_json[:200] + '...' if len(schema_json) > 200 else schema_json
        }
    
    def _count_schemas(self, validation: Dict[str, Any]) -> Dict[str, int]:
        """
        Count schemas found by type.
        
        Args:
            validation: Extruct validation result.
            
        Returns:
            Dict mapping schema type to count.
        """
        counts = {}
        for syntax in ['json-ld', 'microdata', 'rdfa', 'opengraph']:
            items = validation.get(syntax, [])
            counts[syntax] = len(items)
        return counts
    
    def _output_text(
        self,
        results: List[Dict[str, Any]],
        passed: int,
        failed: int,
        warnings: int,
        verbose: bool
    ) -> None:
        """
        Output results in human-readable text format.
        """
        self.stdout.write("=" * 60)
        self.stdout.write("SCHEMA VALIDATION RESULTS")
        self.stdout.write("=" * 60)
        
        for result in results:
            post_id = result.get('post_id', 'N/A')
            url = result.get('url', result.get('url', 'N/A'))
            title = result.get('title', '')
            schema_type = result.get('schema_type', 'Unknown')
            
            if result.get('valid', False):
                status = self.style.SUCCESS("✓ PASS")
            else:
                status = self.style.ERROR("✗ FAIL")
            
            self.stdout.write(f"\n[{status}] Post {post_id}: {title}")
            self.stdout.write(f"  URL: {url}")
            self.stdout.write(f"  Schema Type: {schema_type}")
            
            if verbose:
                if 'schema_preview' in result:
                    self.stdout.write(f"  Schema: {result['schema_preview']}")
            
            if result.get('errors'):
                for error in result['errors']:
                    self.stdout.write(self.style.ERROR(f"  Error: {error}"))
            
            if result.get('warnings'):
                for warning in result['warnings']:
                    self.stdout.write(self.style.WARNING(f"  Warning: {warning}"))
            
            if result.get('error') and not result.get('errors'):
                self.stdout.write(self.style.ERROR(f"  Error: {result['error']}"))
        
        self.stdout.write("\n" + "=" * 60)
        self.stdout.write(f"Total: {passed} passed, {failed} failed, {warnings} warnings")
        
        if failed == 0:
            self.stdout.write(self.style.SUCCESS("All validations passed!"))
        else:
            self.stdout.write(self.style.ERROR(f"{failed} validation(s) failed."))
    
    def _output_json(
        self,
        results: List[Dict[str, Any]],
        passed: int,
        failed: int
    ) -> None:
        """
        Output results in JSON format.
        """
        output = {
            'summary': {
                'total': len(results),
                'passed': passed,
                'failed': failed,
                'success_rate': passed / len(results) if results else 0
            },
            'results': results
        }
        
        self.stdout.write(json.dumps(output, indent=2))