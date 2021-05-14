from rest_framework import serializers

from ..models import Tag
from core.libs.slugify import slugify
from core.serializers import ImageSerializer
 

def slug_generate(title):
    i = 0
    while i >= 0:
        slug = slugify(title)
        if not Tag.objects.filter(slug=slug).count():
            return slug


class TagSerializer(serializers.ModelSerializer):
    slug = serializers.CharField(read_only=True)
    images = ImageSerializer(many=True, read_only=True)

    def create(self, validated_data):
        validated_data['slug'] = slug_generate(validated_data['name'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop("slug", None)
        return super().update(instance, validated_data)

    class Meta:
        fields = "__all__"
        model = Tag
