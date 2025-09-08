#!/usr/bin/env python3
"""
Test script to verify the critical fixes are working.
"""

import requests
import json

# Configuration
BASE_URL = "http://localhost:8000"
API_BASE = f"{BASE_URL}/api/v1"

def test_auth_endpoints():
    """Test the new auth endpoints."""
    print("Testing Auth Endpoints...")
    
    # Test auth endpoints are accessible
    endpoints = [
        "/auth/login/",
        "/auth/register/", 
        "/auth/refresh/"
    ]
    
    for endpoint in endpoints:
        try:
            response = requests.options(f"{API_BASE}{endpoint}")
            if response.status_code in [200, 405]:  # 405 is OK for OPTIONS
                print(f"✓ {endpoint} - accessible")
            else:
                print(f"✗ {endpoint} - not accessible ({response.status_code})")
        except requests.exceptions.RequestException as e:
            print(f"✗ {endpoint} - connection error: {e}")

def test_profile_endpoint():
    """Test the profile endpoint."""
    print("\nTesting Profile Endpoint...")
    
    try:
        response = requests.get(f"{API_BASE}/users/profile/")
        if response.status_code == 401:  # Unauthorized is expected without login
            print("✓ /users/profile/ - accessible (returns 401 as expected for unauthenticated)")
        elif response.status_code == 200:
            print("✓ /users/profile/ - accessible")
        else:
            print(f"✗ /users/profile/ - unexpected status ({response.status_code})")
    except requests.exceptions.RequestException as e:
        print(f"✗ /users/profile/ - connection error: {e}")

def test_events_endpoint():
    """Test the events logging endpoint."""
    print("\nTesting Events Endpoint...")
    
    try:
        # Test event logging with sample data
        event_data = {
            "event_type": "page_view",
            "event_name": "test_event",
            "data": {"test": True},
            "session_id": "test_session"
        }
        
        response = requests.post(f"{API_BASE}/events/log/", json=event_data)
        if response.status_code == 201:
            print("✓ /events/log/ - accessible and working")
        else:
            print(f"✗ /events/log/ - failed ({response.status_code}): {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"✗ /events/log/ - connection error: {e}")

def test_content_endpoints():
    """Test content endpoints with slug lookups."""
    print("\nTesting Content Endpoints...")
    
    endpoints = [
        "/blog/",
        "/projects/", 
        "/news/",
        "/pages/",
        "/courses/"
    ]
    
    for endpoint in endpoints:
        try:
            response = requests.get(f"{API_BASE}{endpoint}")
            if response.status_code == 200:
                print(f"✓ {endpoint} - accessible")
            else:
                print(f"✗ {endpoint} - not accessible ({response.status_code})")
        except requests.exceptions.RequestException as e:
            print(f"✗ {endpoint} - connection error: {e}")

def test_seo_endpoints():
    """Test SEO endpoints."""
    print("\nTesting SEO Endpoints...")
    
    try:
        response = requests.get(f"{BASE_URL}/robots.txt")
        if response.status_code == 200:
            print("✓ /robots.txt - accessible")
        else:
            print(f"✗ /robots.txt - not accessible ({response.status_code})")
    except requests.exceptions.RequestException as e:
        print(f"✗ /robots.txt - connection error: {e}")

if __name__ == "__main__":
    print("Django-React Integration Test")
    print("=" * 40)
    print(f"Testing endpoints at: {BASE_URL}")
    print()
    
    test_auth_endpoints()
    test_profile_endpoint() 
    test_events_endpoint()
    test_content_endpoints()
    test_seo_endpoints()
    
    print("\n" + "=" * 40)
    print("Test completed!")
    print("\nNote: Some failures are expected if the Django server is not running.")
    print("Start the server with: python manage.py runserver")
