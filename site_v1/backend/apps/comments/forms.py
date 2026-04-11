from django import forms

from .models import Comment


class CommentForm(forms.ModelForm):
    """Form for adding comments to posts."""

    class Meta:
        model = Comment
        fields = ("content", "parent")
        widgets = {
            "content": forms.Textarea(
                attrs={
                    "class": "form-control",
                    "rows": 4,
                    "placeholder": "Write your comment...",
                }
            ),
            "parent": forms.HiddenInput(),
        }
