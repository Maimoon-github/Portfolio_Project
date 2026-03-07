# apps/projects/tests/test_views.py
import pytest
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from apps.projects.models import Project, ProjectCategory, TechTag

pytestmark = pytest.mark.django_db

class TestProjectListView:
    def test_list_unauthenticated(self, api_client, project_factory):
        project_factory.create_batch(3)
        response = api_client.get('/api/v1/projects/')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) == 3

    def test_list_authenticated(self, api_client, project_factory, user):
        api_client.force_authenticate(user=user)
        project_factory.create_batch(3)
        response = api_client.get('/api/v1/projects/')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) == 3

    def test_create_project_unauthenticated(self, api_client):
        data = {'title': 'New Project', 'description': 'desc'}
        response = api_client.post('/api/v1/projects/', data)
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_create_project_authenticated_non_staff(self, api_client, user):
        api_client.force_authenticate(user=user)
        data = {'title': 'New Project', 'description': 'desc'}
        response = api_client.post('/api/v1/projects/', data)
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_create_project_authenticated_staff(self, api_client, staff_user):
        api_client.force_authenticate(user=staff_user)
        data = {
            'title': 'New Project',
            'description': 'A test project',
            'featured_image': '',
            'completion_date': '2025-01-01'
        }
        response = api_client.post('/api/v1/projects/', data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Project.objects.filter(title='New Project').exists()

    def test_filter_by_category(self, api_client, project_factory, category_factory):
        cat1 = category_factory(name='Web')
        cat2 = category_factory(name='Mobile')
        p1 = project_factory(title='Web Project')
        p1.categories.add(cat1)
        p2 = project_factory(title='Mobile Project')
        p2.categories.add(cat2)
        response = api_client.get('/api/v1/projects/', {'category': cat1.slug})
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) == 1
        assert response.data['results'][0]['title'] == 'Web Project'

    def test_filter_by_tech(self, api_client, project_factory, tag_factory):
        tag1 = tag_factory(name='Django')
        tag2 = tag_factory(name='React')
        p1 = project_factory(title='Backend Project')
        p1.tech_tags.add(tag1)
        p2 = project_factory(title='Frontend Project')
        p2.tech_tags.add(tag2)
        response = api_client.get('/api/v1/projects/', {'tech': tag1.slug})
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) == 1
        assert response.data['results'][0]['title'] == 'Backend Project'

    def test_filter_by_year(self, api_client, project_factory):
        p1 = project_factory(title='2024 Project', completion_date='2024-06-01')
        p2 = project_factory(title='2025 Project', completion_date='2025-01-01')
        response = api_client.get('/api/v1/projects/', {'year': 2024})
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) == 1
        assert response.data['results'][0]['title'] == '2024 Project'

class TestProjectDetailView:
    def test_detail_unauthenticated(self, api_client, project_factory):
        project = project_factory()
        response = api_client.get(f'/api/v1/projects/{project.slug}/')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['slug'] == project.slug

    def test_detail_authenticated(self, api_client, project_factory, user):
        api_client.force_authenticate(user=user)
        project = project_factory()
        response = api_client.get(f'/api/v1/projects/{project.slug}/')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['slug'] == project.slug

    def test_update_project_unauthenticated(self, api_client, project_factory):
        project = project_factory(title='Old')
        response = api_client.patch(f'/api/v1/projects/{project.slug}/', {'title': 'New'})
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_update_project_authenticated_non_staff(self, api_client, project_factory, user):
        api_client.force_authenticate(user=user)
        project = project_factory(title='Old')
        response = api_client.patch(f'/api/v1/projects/{project.slug}/', {'title': 'New'})
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_update_project_authenticated_staff(self, api_client, project_factory, staff_user):
        api_client.force_authenticate(user=staff_user)
        project = project_factory(title='Old')
        response = api_client.patch(f'/api/v1/projects/{project.slug}/', {'title': 'New'})
        assert response.status_code == status.HTTP_200_OK
        project.refresh_from_db()
        assert project.title == 'New'

    def test_delete_project_unauthenticated(self, api_client, project_factory):
        project = project_factory()
        response = api_client.delete(f'/api/v1/projects/{project.slug}/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_delete_project_authenticated_staff(self, api_client, project_factory, staff_user):
        api_client.force_authenticate(user=staff_user)
        project = project_factory()
        response = api_client.delete(f'/api/v1/projects/{project.slug}/')
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert not Project.objects.filter(id=project.id).exists()

# Factories (inline for simplicity)
import factory
from factory.django import DjangoModelFactory
from apps.projects.models import Project, ProjectCategory, TechTag

class ProjectCategoryFactory(DjangoModelFactory):
    class Meta:
        model = ProjectCategory
    name = factory.Sequence(lambda n: f"Category {n}")

class TechTagFactory(DjangoModelFactory):
    class Meta:
        model = TechTag
    name = factory.Sequence(lambda n: f"Tag {n}")

class ProjectFactory(DjangoModelFactory):
    class Meta:
        model = Project
    title = factory.Sequence(lambda n: f"Project {n}")
    description = factory.Faker('text')
    featured_image = factory.django.ImageField()
    completion_date = factory.Faker('date_this_decade')

# Fixtures
@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def user(db):
    return User.objects.create_user(username='testuser', password='password')

@pytest.fixture
def staff_user(db):
    return User.objects.create_user(username='staff', password='password', is_staff=True)

@pytest.fixture
def category_factory():
    return ProjectCategoryFactory

@pytest.fixture
def tag_factory():
    return TechTagFactory

@pytest.fixture
def project_factory():
    return ProjectFactory