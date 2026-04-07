"""
Management Command: Find Orphan Posts.

Identifies and reports blog posts that have zero incoming internal links
from other posts. Orphan posts are difficult for users and search engines
to discover, hurting SEO performance.

Exit Codes:
    0: No orphan posts found (success)
    N: Number of orphan posts found (where N > 0)
    255: Error occurred during execution

Usage:
    # Find all orphan posts
    python manage.py find_orphan_posts
    
    # Output as JSON for processing
    python manage.py find_orphan_posts --format json
    
    # Limit results (useful for large sites)
    python manage.py find_orphan_posts --limit 50
    
    # Quiet mode (exit code only)
    python manage.py find_orphan_posts --quiet
"""

import json
import logging
import sys
from typing import Any, Dict, List, Optional

from django.core.management.base import BaseCommand, CommandError
from django.db.models import QuerySet

from seo.services import find_orphan_posts

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    """
    Command to identify orphan posts (posts with no incoming internal links).
    
    Scans published posts to detect those not linked from any other content,
    helping editorial teams improve site structure and internal linking.
    """
    
    help = 'Find posts with no incoming internal links (orphan posts)'
    
    def add_arguments(self, parser: Any) -> None:
        """
        Define command-line arguments.
        """
        # Output format
        parser.add_argument(
            '--format',
            choices=['text', 'json', 'csv'],
            default='text',
            help='Output format (default: text)'
        )
        
        # Limit results
        parser.add_argument(
            '--limit',
            type=int,
            default=1000,
            help='Maximum number of orphan posts to display (default: 1000)'
        )
        
        # Quiet mode
        parser.add_argument(
            '--quiet',
            '-q',
            action='store_true',
            help='Suppress output, only return exit code'
        )
        
        # Include unpublished posts
        parser.add_argument(
            '--include-unpublished',
            action='store_true',
            help='Also check unpublished/draft posts'
        )
    
    def handle(self, *args: Any, **options: Any) -> None:
        """
        Execute orphan post detection.
        
        Args:
            *args: Positional arguments.
            **options: Parsed command-line options.
        """
        output_format: str = options.get('format', 'text')
        limit: int = options.get('limit', 1000)
        quiet: bool = options.get('quiet', False)
        include_unpublished: bool = options.get('include_unpublished', False)
        
        try:
            if not quiet:
                self.stdout.write("Scanning for orphan posts...")
                self.stdout.write("(This may take a while for large sites)")
            
            # Retrieve orphan posts via service layer
            orphan_qs: QuerySet = find_orphan_posts()
            
            # Apply limit
            orphans = list(orphan_qs[:limit])
            count = len(orphans)
            
            # Get total count (approximate for large querysets)
            total_orphans = orphan_qs.count() if count < limit else count
            
            if not quiet:
                if output_format == 'json':
                    self._output_json(orphans, total_orphans)
                elif output_format == 'csv':
                    self._output_csv(orphans)
                else:
                    self._output_text(orphans, total_orphans, limit)
            
            # Exit with count (capped at 255 for shell compatibility)
            exit_code = min(count, 255)
            
            if count > 0 and not quiet:
                self.stdout.write(
                    self.style.WARNING(
                        f"\nFound {count} orphan post(s). "
                        f"Exit code: {exit_code}"
                    )
                )
            elif not quiet:
                self.stdout.write(
                    self.style.SUCCESS("No orphan posts found!")
                )
            
            sys.exit(exit_code)
            
        except Exception as e:
            logger.exception("Error finding orphan posts")
            if not quiet:
                self.stderr.write(
                    self.style.ERROR(f"Error: {e}")
                )
            sys.exit(255)
    
    def _output_text(
        self,
        orphans: List[Any],
        total_count: int,
        limit: int
    ) -> None:
        """
        Output orphan posts in human-readable text format.
        
        Args:
            orphans: List of orphan post objects.
            total_count: Total number of orphans (may exceed limit).
            limit: Applied result limit.
        """
        if not orphans:
            return
        
        self.stdout.write("\n" + "=" * 70)
        self.stdout.write("ORPHAN POSTS (No Incoming Internal Links)")
        self.stdout.write("=" * 70)
        
        for i, post in enumerate(orphans, 1):
            # Get post attributes safely
            post_id = getattr(post, 'pk', getattr(post, 'id', 'unknown'))
            title = getattr(post, 'title', 'Untitled')
            slug = getattr(post, 'slug', 'no-slug')
            
            # Get URL
            try:
                url = post.get_absolute_url()
            except Exception:
                url = f"/post/{slug}/"
            
            # Get status
            status = getattr(post, 'status', 'unknown')
            
            # Format output
            self.stdout.write(f"\n{i}. {title}")
            self.stdout.write(f"   ID: {post_id}")
            self.stdout.write(f"   URL: {url}")
            self.stdout.write(f"   Status: {status}")
            self.stdout.write(f"   Slug: {slug}")
        
        if total_count > limit:
            self.stdout.write(
                f"\n... and {total_count - limit} more (use --limit to show more)"
            )
        
        self.stdout.write("\n" + "=" * 70)
        self.stdout.write(f"Total: {total_count} orphan post(s)")
        self.stdout.write("=" * 70)
        
        # Recommendations
        self.stdout.write("\nRecommendations:")
        self.stdout.write("  1. Add internal links to these posts from related content")
        self.stdout.write("  2. Ensure they appear in category listings or archives")
        self.stdout.write("  3. Consider linking from navigation or footer if important")
    
    def _output_json(self, orphans: List[Any], total_count: int) -> None:
        """
        Output orphan posts in JSON format for programmatic processing.
        
        Args:
            orphans: List of orphan post objects.
            total_count: Total count of orphans.
        """
        data = {
            'meta': {
                'total_count': total_count,
                'returned_count': len(orphans),
                'status': 'orphans_found' if orphans else 'no_orphans'
            },
            'orphans': []
        }
        
        for post in orphans:
            post_id = getattr(post, 'pk', getattr(post, 'id', None))
            title = getattr(post, 'title', 'Untitled')
            slug = getattr(post, 'slug', '')
            
            try:
                url = post.get_absolute_url()
            except Exception:
                url = None
            
            data['orphans'].append({
                'id': post_id,
                'title': title,
                'slug': slug,
                'url': url,
                'status': getattr(post, 'status', None),
                'published_at': (
                    post.published_at.isoformat() 
                    if hasattr(post, 'published_at') and post.published_at 
                    else None
                ),
                'seo_score': (
                    post.seo.seo_score 
                    if hasattr(post, 'seo') and post.seo 
                    else None
                )
            })
        
        self.stdout.write(json.dumps(data, indent=2))
    
    def _output_csv(self, orphans: List[Any]) -> None:
        """
        Output orphan posts in CSV format.
        
        Args:
            orphans: List of orphan post objects.
        """
        import csv
        import io
        
        output = io.StringIO()
        writer = csv.writer(output)
        
        # Header
        writer.writerow(['ID', 'Title', 'Slug', 'URL', 'Status', 'Published'])
        
        for post in orphans:
            post_id = getattr(post, 'pk', getattr(post, 'id', ''))
            title = getattr(post, 'title', '')
            slug = getattr(post, 'slug', '')
            
            try:
                url = post.get_absolute_url()
            except Exception:
                url = ''
            
            status = getattr(post, 'status', '')
            
            published = ''
            if hasattr(post, 'published_at') and post.published_at:
                published = post.published_at.isoformat()
            
            writer.writerow([post_id, title, slug, url, status, published])
        
        self.stdout.write(output.getvalue())