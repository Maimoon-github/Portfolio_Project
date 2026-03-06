# apps/resume/serializers.py
from rest_framework import serializers
from .models import SkillCategory, Skill, Experience, Education, Certification

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'proficiency']

class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = ['id', 'name', 'skills']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = '__all__'

class ResumeSerializer(serializers.Serializer):
    skills = SkillCategorySerializer(many=True)
    experiences = ExperienceSerializer(many=True)
    education = EducationSerializer(many=True)
    certifications = CertificationSerializer(many=True)