from django.contrib import admin
from .models import SkillCategory, Skill, Experience, Education, Certification

class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1
    fields = ['name', 'proficiency', 'icon', 'order']

@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'skill_count']
    list_editable = ['order']
    search_fields = ['name']
    inlines = [SkillInline]

    def skill_count(self, obj):
        return obj.skills.count()
    skill_count.short_description = 'Skills'

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'proficiency', 'order']
    list_filter = ['category', 'proficiency']
    search_fields = ['name']
    list_editable = ['order']
    autocomplete_fields = ['category']

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['title', 'company', 'start_date', 'end_date', 'current']
    list_filter = ['current']
    search_fields = ['title', 'company', 'description']
    date_hierarchy = 'start_date'

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['degree', 'institution', 'start_date', 'end_date']
    search_fields = ['degree', 'institution']
    date_hierarchy = 'start_date'

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['name', 'issuing_organization', 'issue_date', 'expiration_date']
    search_fields = ['name', 'issuing_organization']
    date_hierarchy = 'issue_date'