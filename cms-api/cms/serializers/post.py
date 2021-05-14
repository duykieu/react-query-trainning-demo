from rest_framework import serializers

from ..models import Post, Category, Tag
from .category import CategorySerializer
from core.serializers import TagSerializer

from core.libs.slugify import slugify
from core.serializers import ImageSerializer
from core.models import Image


def post_slug_generate(title):
    i = 0
    while i >= 0:
        slug = slugify((title + (str(i) if i else "")).lower())
        if not Post.objects.filter(slug=slug).count():
            return slug


class PostBaseSerializer(serializers.ModelSerializer):
    thumbnail = serializers.CharField(read_only=True)
    short_description = serializers.CharField(read_only=True)

    class Meta:
        fields = ("id", "title", "slug", "thumbnail", "short_description")
        model = Post


class PostSerializer(PostBaseSerializer):
    images = ImageSerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    thumbnail = serializers.CharField(read_only=True)

    def create(self, validated_data):
        super().create(validated_data)

    class Meta:
        fields = "__all__"
        model = Post


class PostFormSerializer(serializers.ModelSerializer):
    images = serializers.PrimaryKeyRelatedField(queryset=Image.objects.all(), many=True, required=False)
    categories = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), many=True, required=False)
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True, required=False)
    slug = serializers.CharField(read_only=True)

    def create(self, validated_data):
        images = validated_data.pop('images', [])
        categories = validated_data.pop('categories', [])
        tags = validated_data.pop('tags', [])
        instance = super().create(validated_data)
        instance.slug = post_slug_generate(validated_data['title'])
        instance.images.set(images)
        instance.categories.set(categories)
        instance.tags.set(tags)
        instance.save()

        return instance

    def update(self, instance, validated_data):
        validated_data.pop('slug', None)
        images = validated_data.pop('images', [])
        categories = validated_data.pop('categories', [])
        tags = validated_data.pop('tags', [])
        instance.images.set(images)
        instance.categories.set(categories)
        instance.tags.set(tags)
        instance.save()
        return super().update(instance, validated_data)

    class Meta:
        fields = "__all__"
        model = Post
