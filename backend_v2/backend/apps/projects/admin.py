# apps/projects/admin.py
from django.contrib import admin
from .models import ProjectCategory, TechTag, Project, ProjectImage

@admin.register(ProjectCategory)
class ProjectCategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
    list_display = ['name', 'slug']

@admin.register(TechTag)
class TechTagAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
    list_display = ['name', 'slug']

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}
    list_display = ['title', 'completion_date', 'is_featured']
    list_filter = ['is_featured', 'categories', 'completion_date']
    filter_horizontal = ['categories', 'tech_tags']
    search_fields = ['title', 'description', 'content']
    inlines = [ProjectImageInline]
    date_hierarchy = 'completion_date'