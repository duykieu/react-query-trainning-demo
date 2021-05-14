from rest_framework import serializers

from ..models import Image


class ImageSerializer(serializers.ModelSerializer):
    original_url = serializers.CharField(read_only=True)
    large_url = serializers.CharField(read_only=True)
    medium_url = serializers.CharField(read_only=True)
    small_url = serializers.CharField(read_only=True)

    class Meta:
        fields = "__all__"
        model = Image
