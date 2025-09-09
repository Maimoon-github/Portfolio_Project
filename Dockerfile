
FROM node:18-slim as frontend-builder

WORKDIR /app

# Copy package files and install frontend deps deterministically
COPY package*.json ./
# Use npm ci for reproducible installs and faster cache usage
RUN npm ci --no-audit --prefer-offline

# Copy source and build
COPY . .
RUN npm run build

FROM python:3.12-slim

# Avoid interactive prompts during apt operations
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies (include gnupg/ca-certificates/curl to avoid nodesource failures)
RUN apt-get update && apt-get install -y \
    gcc \
    nginx \
    supervisor \
    gnupg \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Copy and install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Copy built frontend from previous stage
COPY --from=frontend-builder /app/build ./build

# Configure nginx
COPY nginx.conf /etc/nginx/sites-available/default
# Ensure our site is enabled (do not remove the symlink)
RUN ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

# Copy supervisor config
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Create necessary directories
RUN mkdir -p /var/log/supervisor /var/run /app/staticfiles

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose ports (frontend via nginx on 80, backend optionally on 8000)
EXPOSE 80 8000

# Start supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

