#!/bin/bash
# File: Portfolio_Project/deploy.sh

set -e

echo "=== Building Frontend ==="
cd frontend
npm install
npm run build
cd ..

echo "=== Building Docker Images ==="
docker-compose build --no-cache

echo "=== Starting Services ==="
docker-compose up -d

echo "=== Running Migrations ==="
docker-compose exec backend python manage.py migrate

echo "=== Creating Superuser (if needed) ==="
docker-compose exec backend python manage.py createsuperuser --noinput || true

echo "=== Deployment Complete ==="
echo "Access your site at: https://maimoonamin.com"
echo "Check status: docker-compose ps"
echo "View logs: docker-compose logs -f"