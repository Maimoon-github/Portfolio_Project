# apps/contact/models.py
from django.db import models
from core.mixins import TimestampMixin

class ContactSubmission(TimestampMixin):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    honeypot = models.CharField(max_length=100, blank=True, help_text="Hidden field for bot detection")
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    is_read = models.BooleanField(default=False, help_text="Admin has reviewed this submission")

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Contact Submission"
        verbose_name_plural = "Contact Submissions"

    def __str__(self):
        return f"{self.name} - {self.subject}"