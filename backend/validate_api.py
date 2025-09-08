#!/usr/bin/env python3
"""
Django Backend Validation Script
Tests all API endpoints to ensure they're working correctly
"""

import requests
import json
import sys
from datetime import datetime

API_BASE_URL = "http://localhost:8000/api"

def test_endpoint(endpoint, description):
    """Test a single API endpoint"""
    url = f"{API_BASE_URL}{endpoint}"
    try:
        response = requests.get(url, timeout=5)
        status_icon = "✅" if response.status_code == 200 else "❌"
        print(f"{status_icon} {description}")
        print(f"   URL: {url}")
        print(f"   Status: {response.status_code}")
        
        if response.status_code == 200:
            try:
                data = response.json()
                if isinstance(data, dict) and 'results' in data:
                    print(f"   Results: {len(data['results'])} items")
                elif isinstance(data, list):
                    print(f"   Results: {len(data)} items")
                else:
                    print(f"   Data type: {type(data)}")
            except json.JSONDecodeError:
                print("   Response: Non-JSON data")
        else:
            print(f"   Error: {response.text[:100]}...")
        
        print()
        return response.status_code == 200
    
    except requests.exceptions.ConnectionError:
        print(f"❌ {description}")
        print(f"   URL: {url}")
        print("   Error: Connection refused - Django server not running")
        print()
        return False
    
    except Exception as e:
        print(f"❌ {description}")
        print(f"   URL: {url}")
        print(f"   Error: {str(e)}")
        print()
        return False

def main():
    print("🔍 Django Backend API Validation")
    print("=" * 50)
    print(f"Testing at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # Define endpoints to test
    endpoints = [
        ("/health/", "Health Check"),
        ("/blog/", "Blog Posts"),
        ("/news/", "News Articles"),
        ("/projects/", "Projects"),
        ("/courses/", "Courses"),
        ("/pages/", "Pages"),
        ("/users/", "Users (if accessible)")
    ]
    
    results = []
    
    for endpoint, description in endpoints:
        success = test_endpoint(endpoint, description)
        results.append((description, success))
    
    # Summary
    print("=" * 50)
    print("📊 Summary")
    print("=" * 50)
    
    passed = sum(1 for _, success in results if success)
    total = len(results)
    
    for description, success in results:
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {description}")
    
    print()
    print(f"Total: {passed}/{total} endpoints working")
    
    if passed == total:
        print("🎉 All API endpoints are working correctly!")
        print("✅ Ready for React frontend integration")
    else:
        print("⚠️  Some endpoints failed - check Django server status")
        if passed == 0:
            print("💡 Tip: Start Django server with:")
            print('   cd backend && python manage.py runserver')
    
    return passed == total

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
