# backend/apps/accounts/serializers.py
"""
DRF serializers for the accounts app.
"""
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    """Read-only user representation."""
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "full_name", "bio", "avatar", "date_joined"]
        read_only_fields = ["email", "date_joined"]

    def get_full_name(self, obj: User) -> str:
        return obj.full_name


class RegisterSerializer(serializers.ModelSerializer):
    """User registration serializer."""
    password = serializers.CharField(write_only=True, style={"input_type": "password"})

    class Meta:
        model = User
        fields = ["email", "password", "first_name", "last_name"]

    def validate_password(self, value: str) -> str:
        validate_password(value)
        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserUpdateSerializer(serializers.ModelSerializer):
    """Profile update serializer (PATCH)."""
    class Meta:
        model = User
        fields = ["first_name", "last_name", "bio", "avatar"]
        extra_kwargs = {field: {"required": False} for field in fields}