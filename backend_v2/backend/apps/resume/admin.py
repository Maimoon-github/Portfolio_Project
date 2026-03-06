# apps/resume/admin.py
from django.contrib import admin
from .models import SkillCategory, Skill, Experience, Education, Certification

@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    inlines = ['skills']

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'proficiency', 'category')
    list_filter = ('category', 'proficiency')
    search_fields = ('name',)

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'start_date', 'end_date', 'is_current')
    list_filter = ('is_current', 'start_date')
    search_fields = ('title', 'company', 'description')

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'institution', 'start_date', 'end_date', 'is_current')
    list_filter = ('is_current', 'start_date')
    search_fields = ('degree', 'institution', 'field_of_study')

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('name', 'issuing_organization', 'issue_date', 'expiry_date')
    list_filter = ('issue_date', 'expiry_date')
    search_fields = ('name', 'issuing_organization')