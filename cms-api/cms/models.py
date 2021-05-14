from django.db import models
from django.db.utils import cached_property
import uuid

from app.models import DModel
from utils import strip_tags
from core.models import Tag


class Category(DModel):
    """Category model"""
    id = models.UUIDField(auto_created=True, editable=False, default=uuid.uuid4, primary_key=True)
    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255)
    description = models.TextField(max_length=10000, null=True, blank=True)
    parent = models.ForeignKey("self", on_delete=models.SET_NULL, null=True, related_name='children')
    images = models.ManyToManyField("core.Image")

    class Meta:
        ordering = ("-updated_at",)


class Post(DModel):
    """Post model"""
    id = models.UUIDField(auto_created=True, editable=False, default=uuid.uuid4, primary_key=True)
    title = models.CharField(max_length=255, unique=True)
    slug = models.CharField(max_length=255, unique=True)
    summary = models.TextField(max_length=500, null=True)
    body = models.TextField(null=True)
    published_at = models.DateTimeField(null=True)
    images = models.ManyToManyField("core.Image")
    is_active = models.BooleanField(default=True)
    categories = models.ManyToManyField(Category, related_name="posts")
    tags = models.ManyToManyField(Tag)

    @property
    def thumbnail(self):
        images = self.images.all()
        if len(images):
            return images[0].small_url
        return None

    def short_description(self):
        if self.summary:
            return self.summary
        return strip_tags(self.body)

    class Meta:
        ordering = ("-updated_at",)


class Page(DModel):
    """Page model"""
    id = models.UUIDField(auto_created=True, editable=False, default=uuid.uuid4, primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    slug = models.CharField(max_length=255, unique=True)
    summary = models.CharField(max_length=255, null=True, blank=True)
    images = models.ManyToManyField("core.Image")
    body = models.TextField(null=True, blank=True)
    tags = models.ManyToManyField(Tag)
    published_at = models.DateTimeField(null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ("-updated_at",)
