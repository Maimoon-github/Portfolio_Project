from django.contrib import admin
from .models import Project, TechTag, ProjectCategory, ProjectImage

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'get_categories')
    list_filter = ('categories', 'tags')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('tags',)
    actions = ['make_featured']

    def get_categories(self, obj):
        return ", ".join([c.name for c in obj.categories.all()])
    get_categories.short_description = 'Categories'

    def make_featured(self, request, queryset):
        queryset.update(featured=True)
        self.message_user(request, f"{queryset.count()} projects marked as featured.")
    make_featured.short_description = "Mark selected projects as featured"

class ProjectImageAdmin(admin.ModelAdmin):
    raw_id_fields = ('project',)

admin.site.register(Project, ProjectAdmin)
admin.site.register(ProjectImage, ProjectImageAdmin)
admin.site.register(TechTag)
admin.site.register(ProjectCategory)