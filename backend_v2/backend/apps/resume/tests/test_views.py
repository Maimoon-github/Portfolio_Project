# apps/resume/tests/test_views.py
from django.test import TestCase, Client
from django.urls import reverse
from .models import SkillCategory, Skill, Experience, Education, Certification

class ResumeViewTest(TestCase):
    def setUp(self):
        self.client = Client()

        # Create test data
        self.category = SkillCategory.objects.create(name='Programming')
        Skill.objects.create(name='Python', proficiency='Advanced', category=self.category)
        
        Experience.objects.create(
            title='Software Engineer',
            company='Tech Corp',
            start_date='2022-01-01',
            end_date=None,
            description='Developed web applications.'
        )
        
        Education.objects.create(
            degree='Bachelor of Science',
            institution='University',
            start_date='2018-09-01',
            end_date='2022-05-01',
            is_current=False
        )
        
        Certification.objects.create(
            name='AWS Certified Developer',
            issuing_organization='Amazon',
            issue_date='2023-01-01'
        )

    def test_resume_view(self):
        url = reverse('resume:resume-detail')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'resume/resume.html')
        
        # Check data is present
        self.assertContains(response, 'Python')
        self.assertContains(response, 'Software Engineer')
        self.assertContains(response, 'University')
        self.assertContains(response, 'AWS Certified Developer')
        
        # Check structure
        data = response.context['data']
        self.assertIn('skills', data)
        self.assertIn('experiences', data)
        self.assertIn('education', data)
        self.assertIn('certifications', data)