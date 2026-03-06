# apps/contact/models.py
import uuid
from django.db import models
from core.mixins import TimestampMixin

class ContactSubmission(TimestampMixin, models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    honeypot = models.CharField(max_length=100, blank=True, help_text="Leave empty")
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.subject}"