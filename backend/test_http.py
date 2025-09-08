#!/usr/bin/env python3
"""
Django HTTP Response Test Script
Tests actual HTTP responses for the main URLs
"""

import requests
import time

def test_http_responses():
    """Test HTTP responses for main URLs"""
    base_url = "http://127.0.0.1:8000"

    print("🌐 Testing HTTP Responses")
    print("=" * 40)

    test_urls = [
        ('/', 'Root path (should redirect to admin)'),
        ('/robots.txt', 'Robots.txt file'),
        ('/sw.js', 'Service worker file'),
        ('/admin/', 'Django admin (should redirect to login)'),
        ('/api/schema/', 'API schema'),
        ('/api/health/', 'Health check'),
    ]

    success_count = 0

    for path, description in test_urls:
        try:
            url = f"{base_url}{path}"
            response = requests.get(url, timeout=5)

            if response.status_code in [200, 302]:  # 200 OK or 302 Redirect
                status_icon = "✅"
                success_count += 1
            else:
                status_icon = "❌"

            print(f"{status_icon} {description}")
            print(f"   URL: {url}")
            print(f"   Status: {response.status_code}")
            print(f"   Content-Type: {response.headers.get('content-type', 'N/A')}")

            if response.status_code == 302:
                print(f"   Redirects to: {response.headers.get('location', 'N/A')}")

            print()

        except requests.exceptions.ConnectionError:
            print(f"❌ {description}")
            print(f"   URL: {base_url}{path}")
            print("   Error: Connection refused - Django server not running")
            print()
            return False

        except Exception as e:
            print(f"❌ {description}")
            print(f"   URL: {base_url}{path}")
            print(f"   Error: {e}")
            print()

    print(f"📊 Results: {success_count}/{len(test_urls)} URLs responding correctly")

    if success_count == len(test_urls):
        print("🎉 All URLs are working correctly!")
        return True
    else:
        print("⚠️  Some URLs are not responding as expected")
        return False

if __name__ == "__main__":
    print("Note: Make sure Django server is running on http://127.0.0.1:8000")
    print("If server is not running, start it with: python manage.py runserver")
    print()

    success = test_http_responses()
    if not success:
        print("\n💡 If Django server is not running:")
        print("   1. Open a new terminal")
        print("   2. Navigate to backend directory")
        print("   3. Run: python manage.py runserver")
        print("   4. Then re-run this test")
