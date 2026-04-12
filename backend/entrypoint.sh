#!/bin/sh
set -e

echo "Waiting for PostgreSQL..."
while ! python -c "import psycopg2; psycopg2.connect('$DATABASE_URL')" 2>/dev/null; do
  sleep 1
done
echo "PostgreSQL ready."

python manage.py migrate --noinput
exec "$@"