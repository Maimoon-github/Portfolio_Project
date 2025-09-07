"""
User models for authentication and profiles.
"""

import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """
    Custom User model with email as the unique identifier.
    """
    
    # Role choices for user types
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('instructor', 'Instructor'),
        ('student', 'Student'),
    )
    
    # Override the id field to use UUID
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Make email unique and required
    email = models.EmailField(_('email address'), unique=True)
    
    # Add role field for user type
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')
    
    # Track email verification and creation date
    is_email_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Use email for authentication
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        ordering = ['-date_joined']
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['role']),
        ]
        
    def __str__(self):
        return self.email
    
    @property
    def is_instructor(self):
        return self.role == 'instructor'
    
    @property
    def is_student(self):
        return self.role == 'student'
    
    @property
    def is_admin_user(self):
        return self.role == 'admin' or self.is_staff


class Profile(models.Model):
    """
    User profile with additional information.
    """
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True)
    headline = models.CharField(max_length=100, blank=True)
    website = models.URLField(blank=True)
    social_links = models.JSONField(default=dict)
    location = models.CharField(max_length=100, blank=True)
    timezone = models.CharField(max_length=50, default='UTC')
    
    class Meta:
        verbose_name = _('profile')
        verbose_name_plural = _('profiles')
    
    def __str__(self):
        return f"Profile for {self.user.email}"
