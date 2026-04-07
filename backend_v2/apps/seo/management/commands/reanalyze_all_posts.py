"""
Management Command: Reanalyze All Posts.

Bulk reanalysis command for regenerating SEO scores across all or selected
posts. Supports both asynchronous (Celery) and synchronous execution modes,
with batch processing to manage memory usage on large content repositories.

Usage:
    # Reanalyze all posts asynchronously (recommended for production)
    python manage.py reanalyze_all_posts --async
    
    # Reanalyze specific posts synchronously (for debugging)
    python manage.py reanalyze_all_posts --post-ids 1 2 3 4 5
    
    # Process in smaller batches with synchronous execution
    python manage.py reanalyze_all_posts --batch-size 50
    
    # Dry run to see what would be processed
    python manage.py reanalyze_all_posts --dry-run
"""

import logging
import time
from typing import Any, List, Optional

from django.apps import apps
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from seo.services import analyze_post_seo
from seo.tasks import compute_seo_scores_task

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    """
    Management command to bulk reanalyze SEO scores for blog posts.
    
    Processes posts in configurable batches to manage memory usage and
    database connection overhead. Supports both Celery-based async
    processing and synchronous execution for immediate feedback.
    """
    
    help = 'Reanalyze SEO scores for all or selected posts'
    
    def add_arguments(self, parser: Any) -> None:
        """
        Define command-line arguments.
        """
        # Optional list of specific post IDs to process
        parser.add_argument(
            '--post-ids',
            nargs='+',
            type=int,
            metavar='ID',
            help='Specific post IDs to reanalyze (space-separated). '
                 'If omitted, all posts are processed.'
        )
        
        # Batch size for memory management
        parser.add_argument(
            '--batch-size',
            type=int,
            default=100,
            help='Number of posts to process per batch (default: 100). '
                 'Lower values reduce memory usage but increase query count.'
        )
        
        # Async execution flag
        parser.add_argument(
            '--async',
            action='store_true',
            dest='use_async',
            help='Queue tasks via Celery for asynchronous processing. '
                 'Recommended for production environments.'
        )
        
        # Synchronous execution flag (explicit)
        parser.add_argument(
            '--sync',
            action='store_false',
            dest='use_async',
            help='Run analysis synchronously (blocking). '
                 'Useful for debugging or small datasets.'
        )
        
        # Dry run option
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Preview which posts would be processed without executing analysis.'
        )
        
        # Force reanalysis flag
        parser.add_argument(
            '--force',
            action='store_true',
            help='Force reanalysis even if content hash matches (skip cache check).'
        )
        
        # Quiet mode
        parser.add_argument(
            '--quiet',
            action='store_true',
            help='Suppress progress output (only log errors).'
        )
    
    def handle(self, *args: Any, **options: Any) -> None:
        """
        Execute the bulk reanalysis command.
        
        Args:
            *args: Positional arguments (unused).
            **options: Parsed command-line options.
        """
        # Extract options
        post_ids: Optional[List[int]] = options.get('post_ids')
        batch_size: int = options.get('batch_size', 100)
        use_async: bool = options.get('use_async', False)
        dry_run: bool = options.get('dry_run', False)
        force: bool = options.get('force', False)
        quiet: bool = options.get('quiet', False)
        
        # Lazy load Post model to prevent circular imports
        try:
            Post = apps.get_model('blog', 'Post')
        except LookupError:
            raise CommandError("Blog Post model not found. Ensure 'blog' app is installed.")
        
        # Build queryset
        queryset = Post.objects.all()
        
        if post_ids:
            queryset = queryset.filter(pk__in=post_ids)
            self.stdout.write(f"Processing {queryset.count()} specified post(s)...")
        else:
            total = queryset.count()
            self.stdout.write(f"Processing all {total} post(s)...")
        
        # Dry run mode
        if dry_run:
            count = queryset.count()
            self.stdout.write(self.style.WARNING(
                f"DRY RUN: Would process {count} post(s)"
            ))
            for post in queryset[:10]:  # Show first 10
                self.stdout.write(f"  - Post {post.pk}: {post}")
            if count > 10:
                self.stdout.write(f"  ... and {count - 10} more")
            return
        
        # Determine execution mode
        if use_async:
            self._run_async(queryset, batch_size, force, quiet)
        else:
            self._run_sync(queryset, batch_size, force, quiet)
    
    def _run_async(
        self,
        queryset: Any,
        batch_size: int,
        force: bool,
        quiet: bool
    ) -> None:
        """
        Queue Celery tasks for asynchronous processing.
        
        Args:
            queryset: QuerySet of posts to process.
            batch_size: Number of tasks to queue per batch.
            force: Whether to force reanalysis (passed to task).
            quiet: Suppress output if True.
        """
        total = queryset.count()
        processed = 0
        failed = 0
        
        if not quiet:
            self.stdout.write(f"Queueing {total} tasks via Celery...")
        
        # Process in batches to avoid overwhelming the broker
        for i in range(0, total, batch_size):
            batch = queryset[i:i + batch_size]
            
            for post in batch:
                try:
                    # Queue async task
                    # Note: force flag would require task modification, 
                    # for now we pass triggering_event='bulk'
                    task = compute_seo_scores_task.delay(
                        post_id=post.pk,
                        triggering_event='bulk'
                    )
                    
                    processed += 1
                    
                    if not quiet and processed % 100 == 0:
                        self.stdout.write(f"  Queued {processed}/{total}...")
                        
                except Exception as e:
                    failed += 1
                    logger.error(f"Failed to queue task for post {post.pk}: {e}")
                    if not quiet:
                        self.stderr.write(
                            self.style.ERROR(f"  Failed to queue post {post.pk}: {e}")
                        )
        
        # Summary
        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully queued {processed} task(s) for async processing."
            )
        )
        if failed > 0:
            self.stdout.write(
                self.style.WARNING(f"Failed to queue {failed} task(s).")
            )
        self.stdout.write(
            "Check Celery worker logs for task execution status."
        )
    
    def _run_sync(
        self,
        queryset: Any,
        batch_size: int,
        force: bool,
        quiet: bool
    ) -> None:
        """
        Run analysis synchronously (blocking execution).
        
        Args:
            queryset: QuerySet of posts to process.
            batch_size: Number of posts per transaction batch.
            force: Whether to force reanalysis.
            quiet: Suppress progress output if True.
        """
        total = queryset.count()
        processed = 0
        failed = 0
        skipped = 0
        
        if not quiet:
            self.stdout.write(f"Processing {total} post(s) synchronously...")
        
        start_time = time.time()
        
        # Process in batches with progress tracking
        for i in range(0, total, batch_size):
            batch = list(queryset[i:i + batch_size])
            
            for post in batch:
                try:
                    # Check if we should skip (unless force flag)
                    if not force:
                        try:
                            post_seo = post.seo
                            from seo.analysis.utils import calculate_content_hash
                            current_hash = calculate_content_hash(
                                getattr(post, 'body', '') or ''
                            )
                            if post_seo.content_hash == current_hash and post_seo.seo_score is not None:
                                skipped += 1
                                if not quiet and (processed + skipped) % 100 == 0:
                                    self.stdout.write(f"  Processed {processed + skipped}/{total}...")
                                continue
                        except (AttributeError, ObjectDoesNotExist):
                            pass  # No existing SEO record, proceed with analysis
                    
                    # Run analysis synchronously
                    result = analyze_post_seo(
                        post_id=post.pk,
                        triggering_event='bulk'
                    )
                    
                    if 'error' in result:
                        failed += 1
                        logger.error(f"Failed to analyze post {post.pk}: {result['error']}")
                        if not quiet:
                            self.stderr.write(
                                self.style.ERROR(f"  Failed to analyze post {post.pk}: {result['error']}")
                            )
                    else:
                        processed += 1
                except Exception as e:
                    failed += 1
                    logger.error(f"Failed to analyze post {post.pk}: {e}")
                    if not quiet:
                        self.stderr.write(
                            self.style.ERROR(f"  Failed to analyze post {post.pk}: {e}")
                        )