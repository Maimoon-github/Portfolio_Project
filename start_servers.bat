@echo off
REM Django-React Integration Startup Script
REM This script starts both Django backend and React frontend servers

echo ========================================
echo    Django-React Integration Startup
echo ========================================
echo.

echo 🚀 Starting Django Backend Server...
echo.

REM Change to backend directory
cd /d "C:\Users\amin\OneDrive\Documents\Maimoon VS Code\Portfolio_Project\backend"

REM Start Django server in background
echo Starting Django on http://localhost:8000...
start "Django Backend" cmd /k "python manage.py runserver 8000"

REM Wait a moment for Django to start
timeout /t 3 /nobreak >nul

echo.
echo 🚀 Starting React Frontend Server...
echo.

REM Change to frontend directory
cd /d "C:\Users\amin\OneDrive\Documents\Maimoon VS Code\Portfolio_Project"

echo Starting React on http://localhost:3000...
start "React Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo    Servers Starting Up
echo ========================================
echo.
echo 🌐 Django Backend:  http://localhost:8000
echo 🌐 Django Admin:    http://localhost:8000/admin/
echo 🌐 React Frontend:  http://localhost:3000
echo 🔬 API Test Page:   http://localhost:3000 (click "API Test")
echo.
echo 📋 To test integration:
echo    1. Wait for both servers to fully start
echo    2. Open React frontend: http://localhost:3000
echo    3. Click "API Test" in navigation
echo    4. Run connectivity tests
echo    5. Navigate to Blog, News, Projects sections
echo    6. Verify content from Django backend appears
echo.
echo ⚠️  Keep these terminal windows open to keep servers running
echo 🛑 Press Ctrl+C in each terminal to stop the servers
echo.
pause
