from rest_framework import serializers

from ..models import Page
from core import models as core_models
from core.serializers import ImageSerializer
from core.libs.slugify import slugify
from core.serializers import tag


def make_slug(value):
    """Generate slug"""
    i = 0
    while i >= 0:
        slug = slugify((value + (str(i) if i else "")).lower())
        count = Page.objects.filter(slug=slug).count()
        if not count:
            return slug


class PageSerializer(serializers.ModelSerializer):
    """Base page serializer"""
    slug = serializers.CharField(read_only=True)

    class Meta:
        fields = "__all__"
        model = Page


class PageRetrieveSerializer(PageSerializer):
    """Serializer from retrieve page data"""
    images = ImageSerializer(many=True)
    tags = tag.TagSerializer(many=True)


class PageFormSerializer(PageSerializer):
    """Serializer for create and update page"""
    tags = serializers.PrimaryKeyRelatedField(queryset=tag.Tag.objects.all(), many=True)
    images = serializers.PrimaryKeyRelatedField(queryset=core_models.Image.objects.all(), many=True)

    def create(self, validated_data):
        validated_data['slug'] = make_slug(validated_data['name'])
        images = validated_data.pop('images', [])
        instance = super().create(validated_data)
        instance.images.set(images)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        validated_data.pop('slug', None)
        images = validated_data.pop('images', [])
        instance.images.set(images)
        return super().update(instance, validated_data)
