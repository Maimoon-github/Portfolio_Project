# apps/projects/tests/test_models.py
import pytest
from django.db import models
from apps.projects.models import Project, ProjectCategory, TechTag, ProjectImage

pytestmark = pytest.mark.django_db

class TestProjectModel:
    def test_slug_auto_generation(self, project_factory):
        project = project_factory(title="Test Project", slug="")
        assert project.slug == "test-project"

    def test_str_method(self, project_factory):
        project = project_factory(title="Alpha Project")
        assert str(project) == "Alpha Project"

class TestProjectCategoryModel:
    def test_slug_auto_generation(self, category_factory):
        category = category_factory(name="Web Development", slug="")
        assert category.slug == "web-development"

    def test_str_method(self, category_factory):
        category = category_factory(name="Mobile")
        assert str(category) == "Mobile"

class TestTechTagModel:
    def test_slug_auto_generation(self, tag_factory):
        tag = tag_factory(name="Python", slug="")
        assert tag.slug == "python"

    def test_str_method(self, tag_factory):
        tag = tag_factory(name="Django")
        assert str(tag) == "Django"

class TestProjectImageModel:
    def test_cascade_delete_on_project_deletion(self, project_factory, project_image_factory):
        project = project_factory()
        image = project_image_factory(project=project)
        assert ProjectImage.objects.filter(id=image.id).exists()
        project.delete()
        assert not ProjectImage.objects.filter(id=image.id).exists()

# Factories (inline for simplicity)
import factory
from factory.django import DjangoModelFactory

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

class ProjectImageFactory(DjangoModelFactory):
    class Meta:
        model = ProjectImage
    project = factory.SubFactory(ProjectFactory)
    image = factory.django.ImageField()

# Register fixtures for pytest
@pytest.fixture
def category_factory():
    return ProjectCategoryFactory

@pytest.fixture
def tag_factory():
    return TechTagFactory

@pytest.fixture
def project_factory():
    return ProjectFactory

@pytest.fixture
def project_image_factory():
    return ProjectImageFactory