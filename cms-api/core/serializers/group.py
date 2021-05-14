from rest_framework import serializers

from ..models import Group


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Group
