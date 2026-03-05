from rest_framework import serializers
from .models import Item

class ItemSerializer(serializers.ModelSerializer):
    # Expose related owner username as a read-only field
    owner_username = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Item
        fields = ['id', 'name', 'description', 'created_at', 'owner', 'owner_username']
        read_only_fields = ['owner'] # Prevent spoofing owner
