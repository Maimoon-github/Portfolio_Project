"""
Serializers for user models.
"""

from rest_framework import serializers
from .models import User, Profile


class ProfileSerializer(serializers.ModelSerializer):
    """Serializer for user profiles."""
    
    class Meta:
        model = Profile
        fields = [
            'bio', 'avatar', 'headline', 'website', 
            'social_links', 'location', 'timezone'
        ]
        read_only_fields = []


class UserSerializer(serializers.ModelSerializer):
    """Serializer for user data."""
    
    profile = ProfileSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = [
            'id', 'email', 'username', 'first_name', 'last_name',
            'role', 'is_email_verified', 'profile', 'date_joined'
        ]
        read_only_fields = ['id', 'is_email_verified', 'date_joined']


class UserCreateSerializer(serializers.ModelSerializer):
    """Serializer for user creation."""
    
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    confirm_password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = [
            'email', 'username', 'password', 'confirm_password',
            'first_name', 'last_name', 'role'
        ]
    
    def validate(self, attrs):
        if attrs['password'] != attrs.pop('confirm_password'):
            raise serializers.ValidationError({'confirm_password': 'Passwords do not match'})
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role=validated_data.get('role', 'student')
        )
        return user


class ProfileUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating user profile."""
    
    class Meta:
        model = Profile
        fields = [
            'bio', 'avatar', 'headline', 'website', 
            'social_links', 'location', 'timezone'
        ]
