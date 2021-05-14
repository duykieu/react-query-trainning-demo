from rest_framework import serializers

from ..models import User
from . import group, permission

from django.contrib.auth.models import Permission


class UserBaseSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255, required=False, allow_null=True, allow_blank=True, write_only=True)

    class Meta:
        fields = "__all__"
        model = User


class UserSerializer(UserBaseSerializer):
    groups = group.GroupSerializer(many=True, read_only=True)
    user_permissions = permission.PermissionBaseSerializer(many=True, read_only=True)
    contact = serializers.CharField(read_only=True)


class UserCreateSerializer(UserBaseSerializer):
    groups = serializers.PrimaryKeyRelatedField(queryset=group.Group.objects.all(), many=True)
    user_permissions = serializers.PrimaryKeyRelatedField(queryset=Permission.objects.all(), many=True)
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        """Overwrite create method"""
        phone_number = validated_data.get("phone_number")
        if phone_number[:4] == "+840":
            phone_number = "+84" + phone_number[4:]
        if phone_number[:3] != "+84":
            if phone_number[:1] == "0":
                phone_number = "+84" + phone_number[1:]
            else:
                phone_number = "+84" + phone_number
        validated_data['phone_number'] = phone_number
        instance = super().create(validated_data)
        password = validated_data.get('password')
        instance.set_password(password)
        instance.save()
        return instance


class UserUpdateSerializer(UserCreateSerializer):
    user_permissions = serializers.PrimaryKeyRelatedField(queryset=Permission.objects.all(), many=True)

    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)
            instance.save()
        return instance
