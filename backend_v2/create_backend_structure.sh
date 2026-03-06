#!/bin/bash
# create_backend_structure.sh
# This script builds the Django backend folder tree for your portfolio project.
# Run it from the directory where you want the 'backend' folder to appear.

set -e  # Stop on any error

echo "🚧 Creating backend directory structure..."

# -------------------- Create all directories --------------------
mkdir -p backend/apps/projects/migrations
mkdir -p backend/apps/projects/tests
mkdir -p backend/apps/blog/migrations
mkdir -p backend/apps/blog/tests
mkdir -p backend/apps/resume/migrations
mkdir -p backend/apps/resume/tests
mkdir -p backend/apps/contact/migrations
mkdir -p backend/apps/contact/tests
mkdir -p backend/apps/knowledge/migrations
mkdir -p backend/apps/knowledge/tests
mkdir -p backend/backend/settings
mkdir -p backend/core
mkdir -p backend/media/projects
mkdir -p backend/media/blog
mkdir -p backend/media/resume
mkdir -p backend/requirements
mkdir -p backend/static
mkdir -p backend/staticfiles/assets
mkdir -p backend/templates

# -------------------- Create all files (empty) --------------------

# projects app
touch backend/apps/projects/migrations/__init__.py
touch backend/apps/projects/tests/__init__.py
touch backend/apps/projects/tests/test_models.py
touch backend/apps/projects/tests/test_views.py
touch backend/apps/projects/__init__.py
touch backend/apps/projects/admin.py
touch backend/apps/projects/apps.py
touch backend/apps/projects/filters.py
touch backend/apps/projects/models.py
touch backend/apps/projects/serializers.py
touch backend/apps/projects/urls.py
touch backend/apps/projects/views.py

# blog app
touch backend/apps/blog/migrations/__init__.py
touch backend/apps/blog/tests/__init__.py
touch backend/apps/blog/tests/test_models.py
touch backend/apps/blog/tests/test_views.py
touch backend/apps/blog/__init__.py
touch backend/apps/blog/admin.py
touch backend/apps/blog/apps.py
touch backend/apps/blog/filters.py
touch backend/apps/blog/models.py
touch backend/apps/blog/serializers.py
touch backend/apps/blog/urls.py
touch backend/apps/blog/views.py

# resume app
touch backend/apps/resume/migrations/__init__.py
touch backend/apps/resume/tests/__init__.py
touch backend/apps/resume/tests/test_views.py
touch backend/apps/resume/__init__.py
touch backend/apps/resume/admin.py
touch backend/apps/resume/apps.py
touch backend/apps/resume/models.py
touch backend/apps/resume/serializers.py
touch backend/apps/resume/urls.py
touch backend/apps/resume/views.py

# contact app
touch backend/apps/contact/migrations/__init__.py
touch backend/apps/contact/tests/__init__.py
touch backend/apps/contact/tests/test_views.py
touch backend/apps/contact/__init__.py
touch backend/apps/contact/admin.py
touch backend/apps/contact/apps.py
touch backend/apps/contact/models.py
touch backend/apps/contact/serializers.py
touch backend/apps/contact/urls.py
touch backend/apps/contact/views.py

# knowledge app
touch backend/apps/knowledge/migrations/__init__.py
touch backend/apps/knowledge/tests/__init__.py
touch backend/apps/knowledge/tests/test_views.py
touch backend/apps/knowledge/__init__.py
touch backend/apps/knowledge/admin.py
touch backend/apps/knowledge/apps.py
touch backend/apps/knowledge/models.py
touch backend/apps/knowledge/serializers.py
touch backend/apps/knowledge/urls.py
touch backend/apps/knowledge/views.py

# backend project settings
touch backend/backend/settings/__init__.py
touch backend/backend/settings/base.py
touch backend/backend/settings/development.py
touch backend/backend/settings/production.py
touch backend/backend/__init__.py
touch backend/backend/asgi.py
touch backend/backend/urls.py
touch backend/backend/wsgi.py

# core utilities
touch backend/core/__init__.py
touch backend/core/mixins.py
touch backend/core/pagination.py
touch backend/core/permissions.py
touch backend/core/utils.py

# requirements
touch backend/requirements/base.txt
touch backend/requirements/development.txt
touch backend/requirements/production.txt

# template
touch backend/templates/index.html

# root files
touch backend/.env.example
touch backend/db.sqlite3
touch backend/manage.py
touch backend/pytest.ini

echo "✅ Done. Your backend folder is ready!"