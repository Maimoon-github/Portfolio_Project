from __future__ import annotations

# Django Core
from django.core.exceptions import ValidationError

# Third-Party: Wagtail
from wagtail.admin.forms import WagtailAdminPageForm


class BlogDetailPageForm(WagtailAdminPageForm):
    """Custom blog page form used for strict SEO validation in Wagtail."""

    def clean(self):
        cleaned_data = super().clean()
        page = self.instance

        if page is None:
            return cleaned_data

        try:
            page.full_clean()
        except ValidationError as exc:
            raise ValidationError(exc.message_dict or exc.messages)

        return cleaned_data
