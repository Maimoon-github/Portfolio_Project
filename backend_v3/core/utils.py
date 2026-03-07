import logging
from typing import Optional, Type, TypeVar

from bleach import clean
from django.core.mail import send_mail
from django.db.models import Model
from django.utils.text import slugify
from decouple import config

logger = logging.getLogger(__name__)

# Type variable for any Django model
T = TypeVar('T', bound=Model)

def generate_slug(text: str, model: Type[T], instance: Optional[T] = None) -> str:
    """
    Generate a unique slug for a model instance.

    Args:
        text: The source string to slugify.
        model: The Django model class to check for uniqueness.
        instance: Optional existing instance to exclude from uniqueness check.

    Returns:
        A unique slug string.
    """
    base_slug = slugify(text)
    slug = base_slug
    suffix = 1

    while True:
        queryset = model.objects.filter(slug=slug)
        if instance:
            queryset = queryset.exclude(pk=instance.pk)

        if not queryset.exists():
            break

        suffix += 1
        slug = f"{base_slug}-{suffix}"

    return slug


def send_contact_email(name: str, email: str, message: str) -> bool:
    """
    Send a contact form email. Failures are logged but not raised.

    Args:
        name: Sender's name.
        email: Sender's email address.
        message: The message content.

    Returns:
        True if email was sent successfully, False otherwise.
    """
    try:
        recipient_list = config('CONTACT_RECIPIENT_LIST', cast=lambda v: [s.strip() for s in v.split(',')])
        from_email = config('DEFAULT_FROM_EMAIL')

        subject = f"Contact form submission from {name}"
        body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"

        send_mail(
            subject,
            body,
            from_email,
            recipient_list,
            fail_silently=False,  # We handle exception ourselves
        )
        return True
    except Exception as e:
        logger.error(f"Failed to send contact email: {e}")
        return False


def sanitize_html(content: str) -> str:
    """
    Sanitize HTML content, allowing only safe formatting tags.

    Args:
        content: Raw HTML string.

    Returns:
        Cleaned HTML string with unsafe tags/attributes removed.
    """
    allowed_tags = ['p', 'br', 'strong', 'em', 'a']
    allowed_attributes = {
        'a': ['href', 'title', 'target'],  # allow basic link attributes
    }

    return clean(
        content,
        tags=allowed_tags,
        attributes=allowed_attributes,
        strip=True,  # remove disallowed tags completely
    )