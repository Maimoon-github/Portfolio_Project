# core/utils.py
import bleach
from django.utils.text import slugify
from django.core.mail import send_mail
from decouple import config

def generate_slug(source, model, slug_field='slug', max_length=255):
    """
    Generate a unique slug for a given model instance.
    """
    base_slug = slugify(source)[:max_length]
    slug = base_slug
    suffix = 1
    while model.objects.filter(**{slug_field: slug}).exists():
        suffix += 1
        slug = f"{base_slug}-{suffix}"
        if len(slug) > max_length:
            # truncate base if needed
            base_slug = base_slug[:max_length - len(f"-{suffix}")]
            slug = f"{base_slug}-{suffix}"
    return slug

def send_contact_email(subject, message, from_email, recipient_list):
    """
    Send an email using Django's send_mail with configured settings.
    """
    send_mail(
        subject,
        message,
        from_email or config('DEFAULT_FROM_EMAIL'),
        recipient_list,
        fail_silently=False,
    )

def sanitize_html(content, tags=None, attributes=None):
    """
    Sanitize HTML content using bleach.
    Default allows safe tags and attributes.
    """
    if tags is None:
        tags = bleach.sanitizer.ALLOWED_TAGS + ['p', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    if attributes is None:
        attributes = bleach.sanitizer.ALLOWED_ATTRIBUTES
    return bleach.clean(content, tags=tags, attributes=attributes, strip=True)

