# cms/serializers.py
# Extends Wagtail's V2 API serialization to include custom fields.

from wagtail.api.v2.serializers import PageSerializer
from wagtail.images.api.v2.serializers import ImageSerializer
from rest_framework import serializers

from .models import BlogPage, BlogIndexPage, BlogAuthor


class BlogAuthorSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    def get_photo_url(self, obj):
        if obj.photo:
            return obj.photo.get_rendition('fill-80x80').url
        return None

    class Meta:
        model = BlogAuthor
        fields = ['id', 'name', 'bio', 'photo_url', 'twitter', 'linkedin', 'github']


# class BlogPageSerializer(PageSerializer):
#     author = BlogAuthorSerializer(read_only=True)
#     reading_time_minutes = serializers.ReadOnlyField()
#     featured_image_url = serializers.SerializerMethodField()
#     tags_list = serializers.SerializerMethodField()

#     def get_featured_image_url(self, obj):
#         if obj.featured_image:
#             return {
#                 'full': obj.featured_image.get_rendition('width-1200').url,
#                 'thumbnail': obj.featured_image.get_rendition('fill-600x400').url,
#                 'og': obj.featured_image.get_rendition('fill-1200x630').url,
#             }
#         return None

#     def get_tags_list(self, obj):
#         return list(obj.tags.values_list('name', flat=True))

#     class Meta(PageSerializer.Meta):
#         fields = PageSerializer.Meta.fields + [
#             'date_published', 'author', 'category', 'tags_list',
#             'featured_image_url', 'excerpt', 'body',
#             'reading_time_minutes',
#         ]