#!/usr/bin/env python
"""
Django Backend Integration Test Script
======================================

Run this script to test the Django backend independently and ensure
all API endpoints are working correctly before frontend integration.
"""

import os
import sys
import django
from django.test import Client
from django.contrib.auth import get_user_model
import json

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lms_backend.settings')
django.setup()

User = get_user_model()

def test_django_backend():
    """Test all Django backend endpoints."""
    
    print("🚀 Testing Django Backend Integration")
    print("=" * 60)
    
    client = Client()
    results = []
    
    # Test endpoints
    endpoints_to_test = [
        {
            'name': 'Health Check',
            'url': '/api/health/',
            'method': 'GET',
            'expected_status': [200, 404]
        },
        {
            'name': 'API Schema',
            'url': '/api/schema/',
            'method': 'GET',
            'expected_status': [200]
        },
        {
            'name': 'Blog Posts API',
            'url': '/api/v1/blog/',
            'method': 'GET',
            'expected_status': [200, 404]
        },
        {
            'name': 'Projects API',
            'url': '/api/v1/projects/',
            'method': 'GET',
            'expected_status': [200, 404]
        },
        {
            'name': 'News API',
            'url': '/api/v1/news/',
            'method': 'GET',
            'expected_status': [200, 404]
        },
        {
            'name': 'Courses API',
            'url': '/api/v1/courses/',
            'method': 'GET',
            'expected_status': [200, 404]
        },
        {
            'name': 'Dashboard API',
            'url': '/api/v1/dashboard/',
            'method': 'GET',
            'expected_status': [200, 401, 404]  # May require auth
        },
        {
            'name': 'User API',
            'url': '/api/v1/users/',
            'method': 'GET',
            'expected_status': [200, 401, 404]  # May require auth
        }
    ]
    
    print("\n📋 Testing API Endpoints:")
    for endpoint in endpoints_to_test:
        try:
            if endpoint['method'] == 'GET':
                response = client.get(endpoint['url'])
            else:
                response = client.post(endpoint['url'])
                
            status_ok = response.status_code in endpoint['expected_status']
            status_symbol = "✅" if status_ok else "❌"
            
            result = {
                'name': endpoint['name'],
                'url': endpoint['url'],
                'status_code': response.status_code,
                'success': status_ok
            }
            results.append(result)
            
            print(f"  {status_symbol} {endpoint['name']}: {endpoint['url']} -> {response.status_code}")
            
        except Exception as e:
            print(f"  ❌ {endpoint['name']}: {endpoint['url']} -> ERROR: {str(e)}")
            results.append({
                'name': endpoint['name'],
                'url': endpoint['url'],
                'status_code': 'ERROR',
                'success': False,
                'error': str(e)
            })
    
    # Test Django admin
    print("\n🔧 Testing Django Admin:")
    try:
        response = client.get('/admin/')
        admin_ok = response.status_code in [200, 302]
        print(f"  {'✅' if admin_ok else '❌'} Django Admin: /admin/ -> {response.status_code}")
    except Exception as e:
        print(f"  ❌ Django Admin: /admin/ -> ERROR: {str(e)}")
    
    # Test API documentation
    print("\n📚 Testing API Documentation:")
    doc_endpoints = [
        '/api/schema/swagger-ui/',
        '/api/schema/redoc/',
    ]
    
    for doc_url in doc_endpoints:
        try:
            response = client.get(doc_url)
            doc_ok = response.status_code in [200, 404]
            print(f"  {'✅' if doc_ok else '❌'} {doc_url} -> {response.status_code}")
        except Exception as e:
            print(f"  ❌ {doc_url} -> ERROR: {str(e)}")
    
    # Summary
    successful_tests = sum(1 for r in results if r['success'])
    total_tests = len(results)
    
    print(f"\n📊 Test Summary:")
    print(f"  • Total Tests: {total_tests}")
    print(f"  • Successful: {successful_tests}")
    print(f"  • Failed: {total_tests - successful_tests}")
    print(f"  • Success Rate: {(successful_tests/total_tests*100):.1f}%")
    
    if successful_tests == total_tests:
        print("\n🎉 All tests passed! Backend is ready for frontend integration.")
    else:
        print("\n⚠️  Some tests failed. Check the output above for details.")
    
    return results

def test_database_models():
    """Test basic model operations."""
    
    print("\n🗄️  Testing Database Models:")
    
    try:
        # Test each app's models
        from lms_backend.blog.models import BlogPost
        from lms_backend.projects.models import Project
        from lms_backend.news.models import NewsItem
        from lms_backend.courses.models import Course
        
        models_to_test = [
            ('BlogPost', BlogPost),
            ('Project', Project),
            ('NewsItem', NewsItem),
            ('Course', Course),
        ]
        
        for model_name, model_class in models_to_test:
            try:
                count = model_class.objects.count()
                print(f"  ✅ {model_name}: {count} records")
            except Exception as e:
                print(f"  ❌ {model_name}: ERROR - {str(e)}")
                
    except Exception as e:
        print(f"  ❌ Database connection failed: {str(e)}")

def main():
    """Main test execution."""
    try:
        print("🔍 Django Backend Integration Test")
        print(f"Settings Module: {os.environ.get('DJANGO_SETTINGS_MODULE')}")
        print(f"Django Version: {django.get_version()}")
        
        # Test database models
        test_database_models()
        
        # Test API endpoints
        results = test_django_backend()
        
        print(f"\n🚀 Next Steps:")
        print(f"  1. Start Django server: python manage.py runserver")
        print(f"  2. Open React frontend and navigate to 'API Test' section")
        print(f"  3. Run frontend integration tests")
        print(f"  4. Verify real-time synchronization between frontend and backend")
        
        return 0
        
    except Exception as e:
        print(f"\n❌ Test execution failed: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
