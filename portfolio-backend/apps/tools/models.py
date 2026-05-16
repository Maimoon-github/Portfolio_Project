# ToolCategory (name, slug, icon_name, order)
# Tool (slug, title, short_description, full_description, category FK, schema_org_json (JSONField), features M2M, is_active, order, created_at)
# Feature (name, description, tool FK)
# Guide (title, body, tool FK, order)
# Review (author FK→User, tool FK, rating, body, created_at, is_approved)



from django.db import models

# Create your models here.
