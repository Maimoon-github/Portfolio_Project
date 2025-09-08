
# Multi-stage build: Frontend first
FROM node:18-slim as frontend-builder

WORKDIR /app

# Copy package files and install frontend deps
COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig*.json ./
RUN npm ci --no-audit --prefer-offline

# Copy source and build frontend
COPY src/ ./src/
COPY index.html ./
RUN npm run build

# Main application stage
FROM python:3.12-slim

# Avoid interactive prompts during apt operations
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    nginx \
    supervisor \
    curl \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Copy and install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./

# Copy built frontend from previous stage
COPY --from=frontend-builder /app/build ./frontend-build

# Configure nginx
COPY nginx.conf /etc/nginx/sites-available/default
RUN rm -f /etc/nginx/sites-enabled/default && \
    ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

# Copy supervisor config
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Create necessary directories
RUN mkdir -p /var/log/supervisor /var/run /app/staticfiles /app/media

# Set environment variables for Django
ENV DJANGO_SETTINGS_MODULE=lms_backend.settings
ENV PYTHONPATH=/app
ENV DEBUG=False

# Initialize database and collect static files
RUN python manage.py migrate --noinput || true
RUN python manage.py collectstatic --noinput --clear

# Expose ports
EXPOSE 80 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

