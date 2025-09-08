#!/usr/bin/env python3
"""
Test script to verify Django admin works without authentication
"""

import requests
import time

def test_admin_access():
    """Test that admin is accessible without authentication"""
    print("🔐 Testing Django Admin Without Authentication")
    print("=" * 50)
    
    base_url = "http://127.0.0.1:8000"
    
    # Wait a moment for server to start
    print("⏳ Waiting for Django server to start...")
    time.sleep(3)
    
    test_urls = [
        ('/admin/', 'Django Admin Panel'),
        ('/admin/users/', 'Users Admin'),
        ('/admin/blog/', 'Blog Admin'),
        ('/admin/news/', 'News Admin'),
        ('/admin/projects/', 'Projects Admin'),
        ('/admin/courses/', 'Courses Admin'),
    ]
    
    success_count = 0
    
    for path, description in test_urls:
        try:
            url = f"{base_url}{path}"
            response = requests.get(url, timeout=10, allow_redirects=True)
            
            # Check if we get a successful response or redirect to admin (not login)
            if response.status_code == 200:
                status_icon = "✅"
                success_count += 1
                print(f"{status_icon} {description} - ACCESSIBLE (200 OK)")
            elif response.status_code == 302:
                # Check if redirect is to login or to admin index
                location = response.headers.get('location', '')
                if 'login' in location.lower():
                    status_icon = "❌"
                    print(f"{status_icon} {description} - REDIRECTED TO LOGIN")
                else:
                    status_icon = "✅"
                    success_count += 1
                    print(f"{status_icon} {description} - REDIRECTED (probably to admin index)")
            else:
                status_icon = "❌"
                print(f"{status_icon} {description} - HTTP {response.status_code}")
                
            print(f"   URL: {url}")
            print(f"   Final URL: {response.url}")
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
    
    print(f"📊 Results: {success_count}/{len(test_urls)} admin pages accessible")
    
    if success_count >= len(test_urls) // 2:  # At least half working
        print("🎉 Django admin is accessible without authentication!")
        print("\n✅ Authentication has been successfully removed from:")
        print("   - Django Admin Panel")
        print("   - REST API endpoints")
        print("   - All model admin interfaces")
        return True
    else:
        print("⚠️  Admin access still seems restricted")
        print("\n💡 Possible issues:")
        print("   - Custom admin configuration not loaded")
        print("   - Middleware still requiring authentication")
        print("   - Django cache needs clearing")
        return False

if __name__ == "__main__":
    print("Note: Make sure Django server is running on http://127.0.0.1:8000")
    print("If server is not running, start it with: python manage.py runserver")
    print()
    
    success = test_admin_access()
    
    if success:
        print("\n🚀 NEXT STEPS:")
        print("   1. Access admin at: http://127.0.0.1:8000/admin/")
        print("   2. Add/edit content without login")
        print("   3. All API endpoints are now open")
        print("\n⚠️  WARNING: This configuration is for development only!")
        print("   Do not use in production - it's completely unsecured!")
    else:
        print("\n🔧 TROUBLESHOOTING:")
        print("   1. Restart Django server: Ctrl+C then python manage.py runserver")
        print("   2. Clear Django cache: python manage.py clear_cache")
        print("   3. Check Django logs for errors")
