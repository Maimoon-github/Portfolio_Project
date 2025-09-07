# Comprehensive LMS Backend

A production-ready Django REST API for Learning Management System with courses, lessons, enrollments, payments, blogs, news, project portfolio, user dashboards, dynamic page management, and advanced SEO integration.

## Features

- Comprehensive Learning Management System functionality
- Advanced SEO optimization with rich text editor integration
- Dynamic page management and content hierarchy
- Course management with lessons, enrollments, and certificates
- Blog and news sections with SEO optimization
- Project portfolio showcase
- User management with role-based access control
- JWT authentication with token rotation and blacklist
- PostgreSQL database with full-text search
- S3-compatible media storage
- Redis for caching and Celery for background tasks

## Setup

1. Create and activate the conda environment:
   ```
   conda env create -f environment.yml
   conda activate mysite
   ```

2. Run migrations:
   ```
   python manage.py migrate
   ```

3. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

4. Run the development server:
   ```
   python manage.py runserver
   ```

## Environment Variables

Create a `.env` file in the project root with the following variables:

```
DEBUG=True
SECRET_KEY=your_secret_key
DATABASE_URL=postgresql://user:password@localhost/dbname
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

## API Documentation

API documentation is available at `/api/schema/swagger-ui/` when the server is running.
