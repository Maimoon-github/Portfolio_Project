# Docker Deployment Guide for Portfolio Project

This guide outlines how to build and deploy the Portfolio Project using Docker. The project consists of a Django backend and a React frontend, all containerized for easy deployment.

## Prerequisites

- Docker installed on your system ([Install Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed ([Install Docker Compose](https://docs.docker.com/compose/install/))
- Git to clone the repository (if deploying from a fresh clone)

## Deployment Steps

### 1. Build and Start the Container

Navigate to the root directory of the project and run:

```powershell
# Build and start containers in detached mode
docker-compose up --build -d
```

This command will:
- Build the Docker image based on the Dockerfile
- Start the container with configurations from docker-compose.yml
- Run the Django backend on port 8000
- Serve the React frontend on ports 80 and 3000

### 2. Verify the Deployment

Once the containers are running, you can verify the deployment by visiting:

- Frontend: http://localhost:3000 or http://localhost
- Backend API: http://localhost:8000/api/

### 3. Database Setup (First Run Only)

If you're starting with a fresh database, run migrations and create a superuser:

```powershell
# Run migrations
docker-compose exec portfolio python manage.py migrate

# Create a superuser for the Django admin
docker-compose exec portfolio python manage.py createsuperuser
```

### 4. Load Sample Data (Optional)

To load sample data for testing or development:

```powershell
docker-compose exec portfolio python create_sample_data.py
```

## Configuration Options

### Changing Environment Variables

You can modify the environment variables in the `docker-compose.yml` file or create a `.env` file that Docker Compose will automatically use.

### Exposing to the Internet

To make the application publicly accessible over the internet:

1. **Using a domain with proper DNS setup**:
   - Configure your domain's DNS settings to point to your server's IP address
   - Update the `ALLOWED_HOSTS` in docker-compose.yml to include your domain name

2. **Using a cloud provider**:
   - Deploy to AWS, Google Cloud, Azure, or DigitalOcean
   - Configure the cloud provider's load balancer to forward requests to your container

3. **Using a reverse proxy like Nginx or Traefik**:
   - Set up a reverse proxy on your server
   - Configure it to forward requests to your Docker container

4. **For development/testing, use ngrok**:
   ```powershell
   ngrok http 80
   ```

## Troubleshooting

### Viewing Logs

To view the logs of your running container:

```powershell
docker-compose logs -f
```

### Restarting Services

If you need to restart the services:

```powershell
docker-compose restart
```

### Rebuilding After Changes

If you make changes to your code:

```powershell
docker-compose down
docker-compose up --build -d
```

## Production Considerations

For a production environment, consider:

1. Using PostgreSQL instead of SQLite
2. Setting up proper SSL/TLS certificates
3. Implementing proper backup strategies
4. Setting up monitoring and alerting
5. Using a more robust static file serving solution (like AWS S3)

## Resource Management

The default configuration should work for most development needs. For production or if you need to allocate specific resources:

```yaml
services:
  portfolio:
    # Add these lines to your docker-compose.yml
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
```
