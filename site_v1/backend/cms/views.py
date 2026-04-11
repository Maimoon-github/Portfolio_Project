# cms/views.py

from wagtail.api.v2.views import PagesAPIViewSet
from .models import BlogPage


class BlogPageAPIViewSet(PagesAPIViewSet):
    """
    Custom viewset for BlogPage.
    Fields are exposed via the api_fields attribute in the model.
    """
    # No need for base_serializer_class; Wagtail uses the default

    known_query_parameters = PagesAPIViewSet.known_query_parameters.union([
        'category',
        'tags',
    ])

    def get_queryset(self):
        qs = BlogPage.objects.live().public().order_by('-date_published')

        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category__iexact=category)

        tag = self.request.query_params.get('tags')
        if tag:
            qs = qs.filter(tags__name__iexact=tag)

        return qs