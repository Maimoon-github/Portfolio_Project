# apps/contact/serializers.py
from rest_framework import serializers
from .models import ContactSubmission

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['name', 'email', 'subject', 'message', 'honeypot']
        extra_kwargs = {
            'honeypot': {'write_only': True, 'required': False, 'allow_blank': True}
        }

    def validate_honeypot(self, value):
        if value:
            raise serializers.ValidationError("Invalid submission.")
        return value