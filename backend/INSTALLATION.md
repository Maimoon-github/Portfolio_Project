# Installation Guide for LMS Backend

This guide will help you set up the comprehensive LMS backend using the `mysite` conda environment.

## Setting Up the Environment

1. First, make sure you have Conda installed on your system. If not, download and install [Miniconda](https://docs.conda.io/en/latest/miniconda.html) or [Anaconda](https://www.anaconda.com/products/individual).

2. Create and activate the conda environment using the provided environment.yml file:

```powershell
# Navigate to the backend directory
cd backend

# Create the environment from the environment.yml file
conda env create -f environment.yml

# Activate the environment
conda activate mysite
```

3. Create a `.env` file based on the provided `.env.example`:

```powershell
# Copy the example file
copy .env.example .env
```

4. Open the `.env` file and update the settings as needed for your local environment.

## Initializing the Django Project

1. Run initial migrations to set up the database:

```powershell
python manage.py makemigrations
python manage.py migrate
```

2. Create a superuser to access the admin interface:

```powershell
python manage.py createsuperuser
```

3. Run the development server:

```powershell
python manage.py runserver
```

4. Access the admin interface at http://localhost:8000/admin/ and the API at http://localhost:8000/api/v1/.

5. Browse the API documentation at http://localhost:8000/api/schema/swagger-ui/

## Project Structure

The project is organized as follows:

- `lms_backend/` - Main Django project
  - `core/` - Core functionality and base models
  - `users/` - User authentication and profiles
  - `pages/` - Dynamic page management
  - `courses/` - Course and lesson management
  - `blog/` - Blog posts
  - `projects/` - Project portfolio
  - `news/` - News and announcements

## Adding More Features

This project includes the basic structure for a comprehensive LMS backend. You can expand it by:

1. Implementing the remaining views for each app
2. Adding more detailed serializers
3. Creating tests for each functionality
4. Implementing Celery tasks for background processing
5. Setting up S3 storage for media files

## Connecting with the Frontend

The API is designed to work with the existing React frontend. Make sure the frontend is running on the allowed origin (default: http://localhost:5173) to avoid CORS issues.
