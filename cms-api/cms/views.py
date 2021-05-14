from rest_framework import viewsets, response, permissions, exceptions
from rest_framework.decorators import action

from .serializers import CategorySerializer, CategoryFormSerializer, \
    PostSerializer, PostFormSerializer, PageSerializer, PageRetrieveSerializer, \
    PageFormSerializer, PostBaseSerializer, CategoryWithPostsSerializer
from .models import Category, Post, Tag, Page

from core.libs.slugify import slugify
from core.serializers import TagSerializer
from core.libs.uuid import is_valid_uuid


class CategoriesViewSets(viewsets.ModelViewSet):
    """Category view sets"""
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = CategorySerializer
    queryset = Category.objects.prefetch_related("posts").all()
    pagination_class = None

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return CategoryFormSerializer
        if self.action == "retrieve" and self.request.query_params.get("list_posts", "F") == "T":
            return CategoryWithPostsSerializer
        return CategorySerializer

    def retrieve(self, request, *args, **kwargs):
        """Retrieve category data"""
        pk = kwargs['pk']
        if not is_valid_uuid(pk):
            instance = self.get_queryset().filter(slug=pk).first()
            if not instance:
                raise exceptions.NotFound()
            serializer = self.get_serializer(instance)
            return response.Response(serializer.data)
        return super().retrieve(request, *args, **kwargs)


class PostsViewSets(viewsets.ModelViewSet):
    """Post view set"""
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def retrieve(self, request, *args, **kwargs):
        """Retrieve product data"""
        pk = kwargs['pk']
        if not is_valid_uuid(pk):
            instance = self.get_queryset().filter(slug=pk).first()
            if not instance:
                raise exceptions.NotFound()
            serializer = self.get_serializer(instance)
            return response.Response(serializer.data)
        return super().retrieve(request, *args, **kwargs)

    def get_queryset(self):
        """Query set selection"""
        if self.action == "list":
            return Post.objects.prefetch_related("images").all()
        return Post.objects.all()

    def get_serializer_class(self):
        """Serializer class selection"""
        if self.action in ['create', 'update', 'partial_update', 'form_data']:
            return PostFormSerializer
        if self.action == "list":
            return PostBaseSerializer
        return PostSerializer

    @action(methods=['get'], detail=True)
    def form_data(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)


class TagsViewSets(viewsets.ModelViewSet):
    """Tag view set"""
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = TagSerializer
    queryset = Tag.objects.all()

    def get_queryset(self):
        """Query set selection"""
        queryset = self.queryset
        keywords = self.request.query_params.get("keywords", None)
        if keywords:
            queryset = queryset.filter(slug__icontains=slugify(keywords))
        return queryset

    def create(self, request, *args, **kwargs):
        """Overwrite create method"""
        name = request.data.get("name", None)
        if name:
            queryset = self.get_queryset()
            tag = queryset.filter(name=name).first()
            if tag:
                return response.Response(TagSerializer(tag).data)
        return super().create(request, *args, **kwargs)


class PageViewSets(viewsets.ModelViewSet):
    """Page view sets"""
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = PageSerializer
    queryset = Page.objects.all()

    def get_serializer_class(self):
        """Serializer class selection"""
        if self.action in ['list', 'retrieve']:
            return PageRetrieveSerializer
        if self.action in ['create', 'update', 'partial_update']:
            return PageFormSerializer
        return PageSerializer

    def get_queryset(self):
        """Query set selection"""
        name = self.request.query_params.get("name", None)
        tags = self.request.query_params.get("tags", None)
        queryset = self.queryset
        if name:
            queryset = queryset.filter(name__icontains=name)
        if tags:
            tags_list = tags.split("|")
            queryset = queryset.filter(tags__id__in=tags_list)
        return queryset

    @action(methods=['get'], detail=True)
    def form_data(self, request, *args, **kwargs):
        """Getting page form data"""
        return super().retrieve(request, *args, **kwargs)
