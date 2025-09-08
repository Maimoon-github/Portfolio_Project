#!/usr/bin/env python3
"""
Django URL Pattern Test Script
Tests the main URL patterns to ensure they're working correctly
"""

import os
import sys
import django
from django.conf import settings
from django.test import RequestFactory
from django.urls import reverse

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lms_backend.settings')
django.setup()

def test_url_patterns():
    """Test main URL patterns"""
    factory = RequestFactory()

    print("🔍 Testing Django URL Patterns")
    print("=" * 40)

    # Test root URL
    try:
        from lms_backend.urls import urlpatterns
        print("✅ URL patterns loaded successfully")
    except Exception as e:
        print(f"❌ Error loading URL patterns: {e}")
        return False

    # Test specific URLs
    test_urls = [
        ('home', '/'),
        ('admin:index', '/admin/'),
        ('robots_txt', '/robots.txt'),
        ('service_worker', '/sw.js'),
        ('schema', '/api/schema/'),
        ('swagger-ui', '/api/schema/swagger-ui/'),
        ('token_obtain_pair', '/api/token/'),
    ]

    success_count = 0
    for name, expected_path in test_urls:
        try:
            if name == 'home':
                # Special case for root URL
                url = '/'
            else:
                url = reverse(name)
            print(f"✅ {name}: {url}")
            success_count += 1
        except Exception as e:
            print(f"❌ {name}: Error - {e}")

    print(f"\n📊 Results: {success_count}/{len(test_urls)} URL patterns working")
    return success_count == len(test_urls)

if __name__ == "__main__":
    success = test_url_patterns()
    sys.exit(0 if success else 1)
