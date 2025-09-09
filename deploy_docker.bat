@echo off
echo ======================================
echo Portfolio Project Docker Deployment
echo ======================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Docker is not running or not installed!
    echo Please start Docker Desktop or install Docker first.
    echo Visit: https://www.docker.com/products/docker-desktop/
    pause
    exit /b 1
)

echo Building and starting Docker containers...
docker-compose up --build -d

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Error: Failed to build or start containers!
    pause
    exit /b 1
)

echo.
echo ======================================
echo Deployment successful!
echo ======================================
echo.
echo Your Portfolio Project is now running:
echo.
echo - Frontend: http://localhost:3000 or http://localhost
echo - Backend API: http://localhost:8000/api/
echo - Django Admin: http://localhost:8000/admin/
echo.
echo For first-time setup, you may need to run migrations and create a superuser:
echo.
echo docker-compose exec portfolio python manage.py migrate
echo docker-compose exec portfolio python manage.py createsuperuser
echo.
echo See DOCKER_DEPLOYMENT_GUIDE.md for more information.
echo.
pause
