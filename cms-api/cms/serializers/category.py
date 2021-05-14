from rest_framework import serializers

from ..models import Category
from core.models import Image
from core.serializers import ImageSerializer
from core.libs.slugify import slugify


def make_slug(value):
    """Generate Category slug"""
    i = 0
    while i >= 0:
        slug = slugify((value + (str(i) if i else "")).lower())
        count = Category.objects.filter(slug=slug).count()
        if not count:
            return slug


class CategoryFormSerializer(serializers.ModelSerializer):
    """Category create and update serializer"""
    images = serializers.PrimaryKeyRelatedField(queryset=Image.objects.all(), many=True, required=False)
    slug = serializers.CharField(allow_blank=True, allow_null=True, read_only=True)

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

    class Meta:
        fields = "__all__"
        model = Category


class CategorySerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        fields = "__all__"
        model = Category

    def get_fields(self):
        fields = super(CategorySerializer, self).get_fields()
        fields['children'] = CategorySerializer(many=True)
        return fields


class CategoryWithPostsSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    from .post import PostBaseSerializer
    posts = PostBaseSerializer(many=True, read_only=True)

    class Meta:
        fields = "__all__"
        model = Category
