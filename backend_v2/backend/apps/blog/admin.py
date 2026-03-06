# apps/blog/admin.py
from django.contrib import admin
from .models import Category, Tag, Post, PostImage

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name',)

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name',)

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'published_date', 'featured', 'read_time')
    list_filter = ('category', 'tags', 'featured', 'published_date')
    search_fields = ('title', 'body', 'excerpt')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('read_time',)
    # SEO fields from SEOMixin
    fieldsets = (
        ('Content', {
            'fields': ('title', 'body', 'excerpt', 'featured', 'published_date', 'author', 'category', 'tags')
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description', 'meta_keywords', 'meta_robots')
        }),
        ('Advanced', {
            'fields': ('slug',)
        })
    )

@admin.register(PostImage)
class PostImageAdmin(admin.ModelAdmin):
    list_display = ('post', 'order', 'caption')
    list_filter = ('post',) 