#!/usr/bin/env bash
set -o errexit

# Install Python dependencies (use production requirements)
pip install -r requirements/production.txt

# Build React with Vite (this runs your npm build + postbuild script)
npm ci --prefix frontend
npm run build --prefix frontend

# Collect static files for WhiteNoise
python manage.py collectstatic --no-input --clear

# Run migrations
python manage.py migrate --no-input