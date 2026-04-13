# backend/apps/accounts/__init__.py
"""
Accounts app: custom email-based user model using AbstractBaseUser, custom UserManager,
JWT authentication endpoints (obtain/refresh/verify/logout/me), and DRF serializers.
AUTH_USER_MODEL = accounts.User.
"""