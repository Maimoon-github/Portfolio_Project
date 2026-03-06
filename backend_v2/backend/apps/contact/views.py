# apps/contact/views.py
import logging
from rest_framework import generics, permissions
from .serializers import ContactSerializer
from core.utils import send_contact_email

logger = logging.getLogger(__name__)

class ContactCreateView(generics.CreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        # Save with IP address from request
        ip = self.request.META.get('REMOTE_ADDR')
        submission = serializer.save(ip_address=ip)

        # Attempt to send email, log failure but don't break request
        try:
            send_contact_email(
                name=submission.name,
                email=submission.email,
                message=submission.message
            )
        except Exception as e:
            logger.error(f"Failed to send contact email for submission {submission.id}: {e}")