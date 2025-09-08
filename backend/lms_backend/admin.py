"""
Custom admin configuration to bypass authentication
"""

from django.contrib import admin
from django.contrib.admin.sites import AdminSite
from django.http import HttpResponseRedirect
from django.urls import reverse


class NoAuthAdminSite(AdminSite):
    """
    Custom Admin Site that bypasses authentication
    """
    
    def has_permission(self, request):
        """
        Allow access without authentication
        """
        return True
    
    def login(self, request, extra_context=None):
        """
        Bypass login - redirect directly to admin index
        """
        return HttpResponseRedirect(reverse('admin:index'))


# Create the custom admin site instance
admin_site = NoAuthAdminSite(name='no_auth_admin')

# Override the default admin site
admin.site = admin_site
admin.sites.site = admin_site
