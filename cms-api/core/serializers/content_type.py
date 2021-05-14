from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType
from .permission import PermissionBaseSerializer


class ContentTypeSerializer(serializers.ModelSerializer):
    """Base content type serializer"""
    permissions = PermissionBaseSerializer(source="permission_set", many=True)
    app = serializers.CharField(source="app_label")

    class Meta:
        model = ContentType
        fields = ("id", "app", "permissions", "model")
