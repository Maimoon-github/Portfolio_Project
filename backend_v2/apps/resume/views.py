from rest_framework.views import APIView
from rest_framework.response import Response
from core.permissions import IsAdminOrReadOnly
from .models import SkillCategory, Experience, Education, Certification
from .serializers import ResumeSerializer
from drf_spectacular.utils import extend_schema

@extend_schema(responses=ResumeSerializer)
class ResumeView(APIView):
    """
    Read-only endpoint that aggregates all resume sections into a single payload.
    """
    permission_classes = [IsAdminOrReadOnly]

    def get(self, request):
        # Fetch all categories with their nested skills, ordered appropriately
        categories = SkillCategory.objects.prefetch_related('skills').order_by('order', 'name')
        experiences = Experience.objects.all().order_by('-start_date', 'order')
        educations = Education.objects.all().order_by('-start_date', 'order')
        certifications = Certification.objects.all().order_by('-issue_date', 'order')

        data = {
            'skills': categories,
            'experience': experiences, 
            'education': educations,
            'certifications': certifications,
        }

        serializer = ResumeSerializer(data)
        return Response(serializer.data)