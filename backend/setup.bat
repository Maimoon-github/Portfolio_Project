@echo off

echo Creating Conda environment 'mysite'...
call conda env create -f environment.yml

echo Activating 'mysite' environment...
call conda activate mysite

echo Creating Django project 'lms_backend'...
django-admin startproject lms_backend .

echo Creating core Django apps...
cd lms_backend
django-admin startapp users
django-admin startapp core
django-admin startapp courses
django-admin startapp blog
django-admin startapp projects
django-admin startapp news
django-admin startapp pages
cd ..

echo Setting up initial directory structure...
mkdir media
mkdir media\course_thumbnails
mkdir media\blog_covers
mkdir media\project_thumbnails
mkdir media\avatars

echo Setup complete! You can now activate the environment with:
echo conda activate mysite
echo And run the development server with:
echo python manage.py runserver
