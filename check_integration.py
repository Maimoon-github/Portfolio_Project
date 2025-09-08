#!/usr/bin/env python3
"""
Integration Readiness Checker
Verifies that all components are ready for Django-React integration testing
"""

import os
import sys
import json
from pathlib import Path

def check_file_exists(file_path, description):
    """Check if a file exists"""
    exists = os.path.exists(file_path)
    status = "✅" if exists else "❌"
    print(f"{status} {description}")
    if not exists:
        print(f"   Missing: {file_path}")
    return exists

def check_django_setup():
    """Check Django backend setup"""
    print("🔧 Django Backend Setup")
    print("-" * 30)
    
    backend_dir = Path("backend")
    checks = [
        (backend_dir / "manage.py", "Django manage.py"),
        (backend_dir / "lms_backend" / "settings.py", "Django settings"),
        (backend_dir / "db.sqlite3", "SQLite database"),
        (backend_dir / "lms_backend" / "blog" / "models.py", "Blog models"),
        (backend_dir / "lms_backend" / "news" / "models.py", "News models"),
        (backend_dir / "lms_backend" / "projects" / "models.py", "Projects models"),
        (backend_dir / "lms_backend" / "courses" / "models.py", "Courses models"),
        (backend_dir / "lms_backend" / "pages" / "models.py", "Pages models"),
    ]
    
    results = []
    for file_path, description in checks:
        result = check_file_exists(file_path, description)
        results.append(result)
    
    print()
    return all(results)

def check_react_setup():
    """Check React frontend setup"""
    print("⚛️  React Frontend Setup")
    print("-" * 30)
    
    src_dir = Path("src")
    checks = [
        ("package.json", "Package configuration"),
        ("vite.config.ts", "Vite configuration"),
        (src_dir / "App.tsx", "Main App component"),
        (src_dir / "services" / "api.tsx", "API service"),
        (src_dir / "services" / "hooks.tsx", "React hooks"),
        (src_dir / "components" / "BlogSection.tsx", "Blog component"),
        (src_dir / "components" / "NewsSection.tsx", "News component"),
        (src_dir / "components" / "ProjectsSection.tsx", "Projects component"),
        (src_dir / "components" / "IntegrationTestDashboard.tsx", "Integration test dashboard"),
    ]
    
    results = []
    for file_path, description in checks:
        result = check_file_exists(file_path, description)
        results.append(result)
    
    print()
    return all(results)

def check_environment():
    """Check environment setup"""
    print("🔧 Environment Setup")
    print("-" * 20)
    
    venv_python = Path(".venv/Scripts/python.exe")
    node_modules = Path("node_modules")
    
    checks = [
        (venv_python, "Python virtual environment"),
        (node_modules, "Node.js dependencies"),
        ("package-lock.json", "NPM lock file"),
    ]
    
    results = []
    for file_path, description in checks:
        result = check_file_exists(file_path, description)
        results.append(result)
    
    print()
    return all(results)

def check_api_integration():
    """Check API integration components"""
    print("🔗 API Integration Components")
    print("-" * 30)
    
    # Check if API service has all necessary methods
    api_file = Path("src/services/api.tsx")
    if api_file.exists():
        try:
            with open(api_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            methods = [
                "getBlogPosts",
                "getNews", 
                "getProjects",
                "getCourses",
                "getPages",
                "healthCheck"
            ]
            
            method_results = []
            for method in methods:
                exists = method in content
                status = "✅" if exists else "❌"
                print(f"{status} API method: {method}")
                method_results.append(exists)
            
            print()
            return all(method_results)
        except Exception as e:
            print(f"❌ Error reading API file: {e}")
            return False
    else:
        print("❌ API service file not found")
        return False

def main():
    print("🔍 Django-React Integration Readiness Check")
    print("=" * 50)
    print()
    
    # Change to project directory
    project_dir = Path(__file__).parent
    os.chdir(project_dir)
    
    # Run all checks
    checks = [
        check_environment(),
        check_django_setup(),
        check_react_setup(),
        check_api_integration()
    ]
    
    print("=" * 50)
    print("📊 Summary")
    print("=" * 50)
    
    if all(checks):
        print("🎉 All components are ready!")
        print("✅ Integration setup complete")
        print()
        print("🚀 Next steps:")
        print("   1. Run: start_servers.bat")
        print("   2. Open: http://localhost:5173")
        print("   3. Click: 'API Test' navigation")
        print("   4. Test: Blog, News, Projects sections")
        print()
        print("🔥 The React frontend will display content from Django backend!")
    else:
        print("⚠️  Some components are missing")
        print("💡 Please ensure all required files are present")
        
        failed_checks = []
        check_names = ["Environment", "Django Backend", "React Frontend", "API Integration"]
        for i, result in enumerate(checks):
            if not result:
                failed_checks.append(check_names[i])
        
        if failed_checks:
            print(f"❌ Failed: {', '.join(failed_checks)}")
    
    return all(checks)

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
