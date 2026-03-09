from rest_framework import serializers
from .models import Project, ProjectCategory, TechTag, ProjectImage

class TechTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechTag
        fields = ['name', 'slug']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields = ['name', 'slug']

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage  # was ProjectImageProjectListSerializer
        fields = ['image']

class ProjectListSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
    categories = CategorySerializer(many=True, read_only=True)
    category = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    tagline = serializers.CharField(source='summary', read_only=True)
    github = serializers.URLField(source='github_url', read_only=True)
    demo = serializers.URLField(source='live_url', read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'meta_desc', 'tagline',
            'tags', 'categories', 'category', 'year', 'thumbnail', 'image',
            'featured', 'completion_date', 'featured_image', 'github', 'demo'
        ]

    def get_category(self, obj):
        first_cat = obj.categories.first()
        return first_cat.name if first_cat else None

    def get_image(self, obj):
        if obj.featured_image:
            return obj.featured_image.url
        first_img = obj.images.first()
        return first_img.image.url if first_img else None


    def get_thumbnail(self, obj):
        first_image = obj.images.first()
        return first_image.image.url if first_image else None

class ProjectDetailSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
    categories = CategorySerializer(many=True, read_only=True)
    images = ProjectImageSerializer(many=True, read_only=True)
    thumbnail = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    tagline = serializers.CharField(source='summary', read_only=True)
    github = serializers.URLField(source='github_url', read_only=True)
    demo = serializers.URLField(source='live_url', read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'meta_desc', 'tagline',
            'tags', 'categories', 'category', 'year', 'thumbnail', 'image',
            'overview', 'challenge', 'solution', 'role',
            'timeline', 'live_url', 'github_url', 'github', 'demo',
            'featured', 'completion_date', 'featured_image',
            'images'
        ]

    def get_category(self, obj):
        first_cat = obj.categories.first()
        return first_cat.name if first_cat else None

    def get_image(self, obj):
        if obj.featured_image:
            return obj.featured_image.url
        first_img = obj.images.first()
        return first_img.image.url if first_img else None

    def get_thumbnail(self, obj):
        return self.get_image(obj)