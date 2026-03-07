from rest_framework import serializers
from .models import Skill, SkillCategory, Experience, Education, Certification

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'proficiency', 'icon', 'order']
        read_only_fields = fields

class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = ['id', 'name', 'description', 'order', 'skills']
        read_only_fields = fields

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            'id', 'title', 'company', 'location',
            'start_date', 'end_date', 'current',
            'description', 'achievements', 'order'
        ]
        read_only_fields = fields

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = [
            'id', 'degree', 'institution', 'location',
            'start_date', 'end_date', 'description', 'order'
        ]
        read_only_fields = fields

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = [
            'id', 'name', 'issuing_organization',
            'issue_date', 'expiration_date',
            'credential_id', 'credential_url', 'order'
        ]
        read_only_fields = fields

class ResumeSerializer(serializers.Serializer):
    skills = SkillCategorySerializer(many=True, read_only=True)
    experience = ExperienceSerializer(many=True, read_only=True)
    education = EducationSerializer(many=True, read_only=True)
    certifications = CertificationSerializer(many=True, read_only=True)