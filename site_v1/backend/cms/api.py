# cms/api.py  ← UPDATED

from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.documents.api.v2.views import DocumentsAPIViewSet
from wagtail.images.api.v2.views import ImagesAPIViewSet
from wagtail.api.v2.views import PagesAPIViewSet
from .views import BlogPageAPIViewSet


class CustomPagesAPIViewSet(PagesAPIViewSet):
    max_limit = 100  # Allow up to 100 items per page


api_router = WagtailAPIRouter('wagtailapi')

api_router.register_endpoint('pages', BlogPageAPIViewSet)  # custom
api_router.register_endpoint('images', ImagesAPIViewSet)
api_router.register_endpoint('documents', DocumentsAPIViewSet)