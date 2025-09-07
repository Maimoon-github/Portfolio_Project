"""
Models for hierarchical page management.
"""

from django.db import models
from django.core.exceptions import ValidationError
from mptt.models import MPTTModel, TreeForeignKey
from lms_backend.core.models import BaseContentModel


class Page(MPTTModel, BaseContentModel):
    """
    Dynamic page model with hierarchical structure.
    """
    
    # Template choices for page rendering
    TEMPLATE_CHOICES = (
        ('default', 'Default Template'),
        ('landing', 'Landing Page'),
        ('about', 'About Page'),
        ('contact', 'Contact Page'),
        ('portfolio', 'Portfolio Page'),
    )
    
    # Page content and template
    content = models.TextField()
    template = models.CharField(
        max_length=50, 
        choices=TEMPLATE_CHOICES, 
        default='default'
    )
    
    # Hierarchical structure using MPTT
    parent = TreeForeignKey(
        'self', 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True,
        related_name='children'
    )
    page_order = models.IntegerField(default=0)
    
    # Navigation settings
    is_homepage = models.BooleanField(default=False)
    show_in_menu = models.BooleanField(default=True)
    menu_title = models.CharField(max_length=50, blank=True)
    
    # Custom code
    custom_css = models.TextField(blank=True)
    custom_js = models.TextField(blank=True)
    
    class Meta:
        ordering = ['page_order', 'title']
        constraints = [
            models.UniqueConstraint(
                fields=['is_homepage'],
                condition=models.Q(is_homepage=True),
                name='unique_homepage'
            ),
        ]
    
    class MPTTMeta:
        order_insertion_by = ['page_order']
    
    def clean(self):
        """Validate that there's only one homepage."""
        if self.is_homepage:
            # Check if another page is already set as homepage
            existing_homepage = Page.objects.filter(is_homepage=True).exclude(pk=self.pk).first()
            if existing_homepage:
                raise ValidationError({
                    'is_homepage': f'There is already a homepage set: {existing_homepage.title}'
                })
    
    def save(self, *args, **kwargs):
        """Override save to run validations and set menu title."""
        self.clean()
        
        # Set menu title if not provided
        if not self.menu_title and self.title:
            self.menu_title = self.title[:50]
            
        super().save(*args, **kwargs)
    
    def get_content_for_seo_analysis(self):
        """Return page content for SEO analysis."""
        return self.content
    
    def get_absolute_url(self):
        """Generate frontend URL based on page hierarchy."""
        if self.is_homepage:
            return "/"
            
        ancestors = self.get_ancestors(include_self=True)
        slugs = [ancestor.slug for ancestor in ancestors]
        return "/" + "/".join(slugs) + "/"
