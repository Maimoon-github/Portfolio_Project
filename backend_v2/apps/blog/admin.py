from django.contrib import admin
from django.utils import timezone
from .models import Post, Category, Tag, PostImage

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'published_date', 'category', 'featured', 'read_time')
    date_hierarchy = 'published_date'
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('tags',)
    actions = ['bulk_publish']

    def bulk_publish(self, request, queryset):
        queryset.update(published_date=timezone.now())
        self.message_user(request, f"{queryset.count()} posts published.")
    bulk_publish.short_description = "Publish selected posts"

admin.site.register(Post, PostAdmin)
admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(PostImage)