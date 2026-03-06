# apps/contact/views.py
import logging
from decouple import config
from rest_framework import generics, permissions
from .models import ContactSubmission
from .serializers import ContactSerializer
from core.utils import send_contact_email

logger = logging.getLogger(__name__)

class ContactCreateView(generics.CreateAPIView):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        # Inject IP address 
        ip_address = self.request.META.get('REMOTE_ADDR')
        submission = serializer.save(ip_address=ip_address)

        # Send email notification
        try:
            send_contact_email(
                subject=f"New contact: {submission.subject}",
                message=f"From: {submission.name} <{submission.email}>\n\n{submission.message}",
                from_email=submission.email,
                recipient_list=[config('CONTACT_RECIPIENT_EMAIL', default='admin@example.com')]
            ) 
        except Exception as e:
            logger.error(f"Failed to send contact email for submission {submission.id}: {e}")