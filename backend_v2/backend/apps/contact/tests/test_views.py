# apps/contact/tests/test_views.py
from django.test import TestCase, Client
from django.urls import reverse
from .models import ContactSubmission

class ContactViewTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_contact_submission(self):
        url = reverse('contact:contact-create')
        data = {
            'name': 'Test User',
            'email': [EMAIL_ADDRESS],
            'subject': 'Test Subject',
            'message': 'Test Message',
            'honeypot': ''
        }
        
        response = self.client.post(url, data)
        
        # Should be 201 Created
        self.assertEqual(response.status_code, 201)
        
        # Should have created a submission
        self.assertEqual(ContactSubmission.objects.count(), 1)
        submission = ContactSubmission.objects.first()
        self.assertEqual(submission.name, 'Test User')
        self.assertEqual(submission.email, [EMAIL_ADDRESS])
        self.assertEqual(submission.subject, 'Test Subject')
        self.assertEqual(submission.message, 'Test Message')

    def test_contact_honeypot(self):
        url = reverse('contact:contact-create')
        data = {
            'name': 'Test User',
            'email': [EMAIL_ADDRESS],
            'subject': 'Test Subject',
            'message': 'Test Message',
            'honeypot': 'spam'
        }
        
        response = self.client.post(url, data)
        
        # Should be 400 Bad Request
        self.assertEqual(response.status_code, 400)
        self.assertEqual(ContactSubmission.objects.count(), 0)