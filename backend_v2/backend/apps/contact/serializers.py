# apps/contact/serializers.py
from rest_framework import serializers
from .models import ContactSubmission

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['name', 'email', 'subject', 'message', 'honeypot']
        extra_kwargs = {
            'name': {'write_only': True},
            'email': {'write_only': True},
            'subject': {'write_only': True},
            'message': {'write_only': True},
            'honeypot': {'write_only': True},
        }

    def validate_honeypot(self, value):
        if value:
            raise serializers.ValidationError("Invalid submission.")
        return value