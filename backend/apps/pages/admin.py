# backend/apps/pages/admin.py
"""
Admin configuration for the pages app.

Registers static marketing pages in Wagtail admin with custom icons and labels.
"""
from django.contrib import admin
from wagtail.contrib.modeladmin.options import ModelAdmin, modeladmin_register
from .models import HomePage, AboutPage, ContactPage


class HomePageAdmin(ModelAdmin):
    model = HomePage
    menu_label = "Home Page"
    menu_icon = "home"
    list_display = ("title", "live")


class AboutPageAdmin(ModelAdmin):
    model = AboutPage
    menu_label = "About Page"
    menu_icon = "info"
    list_display = ("title", "live")


class ContactPageAdmin(ModelAdmin):
    model = ContactPage
    menu_label = "Contact Page"
    menu_icon = "mail"
    list_display = ("title", "live")


modeladmin_register(HomePageAdmin)
modeladmin_register(AboutPageAdmin)
modeladmin_register(ContactPageAdmin)