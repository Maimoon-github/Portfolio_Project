# apps/resume/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SkillCategory, Experience, Education, Certification
from .serializers import ResumeSerializer

class ResumeView(APIView):
    """
    Read-only endpoint returning aggregated resume data.
    """
    def get(self, request):
        skills = SkillCategory.objects.prefetch_related('skills').all()
        experiences = Experience.objects.all()
        education = Education.objects.all()
        certifications = Certification.objects.all()

        data = {
            'skills': skills,
            'experiences': experiences,
            'education': education,
            'certifications': certifications,
        }

        serializer = ResumeSerializer(data)
        return Response(serializer.data)