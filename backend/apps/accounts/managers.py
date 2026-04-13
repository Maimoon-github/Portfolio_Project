# backend/apps/accounts/managers.py
"""
Custom UserManager for the email-based User model.
"""
from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    """
    This manager is attached to apps.accounts.models.User and referenced
    in AUTH_USER_MODEL.
    """

    def create_user(self, email: str, password: str | None = None, **extra_fields):
        """Create and save a regular user with the given email."""
        if not email:
            raise ValueError("Email address is required.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email: str, password: str, **extra_fields):
        """Create and save a superuser with the given email."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)