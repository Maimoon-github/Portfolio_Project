# cms/wagtail_hooks.py

from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet
from wagtail.admin.panels import FieldPanel

from .models import BlogAuthor


class BlogAuthorSnippetViewSet(SnippetViewSet):
    model = BlogAuthor
    icon = 'user'
    menu_label = 'Authors'
    menu_order = 200
    add_to_admin_menu = True
    list_display = ['name', 'twitter', 'linkedin']
    search_fields = ['name']
    panels = [
        FieldPanel('name'),
        FieldPanel('bio'),
        FieldPanel('photo'),
        FieldPanel('twitter'),
        FieldPanel('linkedin'),
        FieldPanel('github'),
    ]


# Register the snippet with the custom ViewSet
register_snippet(BlogAuthorSnippetViewSet)