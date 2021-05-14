from rest_framework import viewsets, status, mixins, permissions
from rest_framework.exceptions import ParseError, AuthenticationFailed, server_error, NotFound
from rest_framework.decorators import action, permission_classes, authentication_classes, api_view
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.settings import api_settings
from django.conf import settings
from django.contrib.auth.models import Permission
from django.db.models import Q
from django.contrib.contenttypes.models import ContentType

import requests

from .models import User, Image, Group, Tag
from .serializers import GroupSerializer, UserSerializer, UserUpdateSerializer, \
    ImageSerializer, UserCreateSerializer, TagSerializer, PermissionBaseSerializer, \
    ContentTypeSerializer

import os


class LoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    password = serializers.CharField()


class DBasePermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, obj):
        return True


@api_view(http_method_names=['post'])
@permission_classes([])
@authentication_classes([])
def user_login(request):
    username = request.data.get('username', None)
    password = request.data.get('password', None)

    if not username or not password:
        raise ParseError("Hãy nhập đủ email và mật khẩu")

    user = User.objects.filter(phone_number=username).first()
    if not user:
        raise AuthenticationFailed('Không thấy tài khoản')

    # return Response(UserSerializer(user).data)

    if not user.check_password(password):
        raise AuthenticationFailed("Mật khẩu không đúng")

    refresh = RefreshToken.for_user(user)

    return Response({
        'token': str(refresh.access_token),
        'user': UserSerializer(user).data
    })


class UserViewSets(viewsets.ModelViewSet):
    """View sets for managing user data"""
    serializer_class = UserSerializer
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
    queryset = User.objects.prefetch_related('groups', "user_permissions").all()

    def get_serializer_class(self):
        """Serializer classes selection"""
        if self.action == 'login':
            return LoginSerializer
        if self.action == 'partial_update':
            return UserUpdateSerializer
        if self.action == 'create' or self.action == "form_data":
            return UserCreateSerializer
        return UserSerializer

    @action(methods=["get"], detail=True)
    def form_data(self, request, *args, **kwargs):
        """Fetching user form data"""
        return super().retrieve(request, *args, **kwargs)

    def get_queryset(self):
        """Queryset selection"""
        queryset = User.objects.filter()
        if self.action == 'list':
            keywords = self.request.query_params.get('keywords', None)
            groups = self.request.query_params.get('groups', None)
            groups_name = self.request.query_params.get('groups_name', None)
            if keywords:
                phone_number = "+84" + keywords
                phone_number = phone_number.replace('+840', "")
                phone_number = phone_number.replace('+84', "")
                queryset = queryset.filter(
                    Q(name__contains=keywords) | Q(display_name=keywords) | Q(phone_number__icontains=phone_number))
            if groups:
                groups_id = [int(i) for i in groups.split('|')]
                queryset = queryset.filter(groups__id__in=groups_id)
            if groups_name:
                groups_name = groups_name.split('|')
                queryset = queryset.filter(groups__name__in=groups_name)
        return queryset.all()

    @action(methods=["get"], detail=False)
    def find_by_phone(self, request, *args, **kwargs):
        phone_number = request.query_params.get("phone_number")
        if not phone_number:
            raise (ParseError("Số điện thoại không đúng"))
        user = User.objects.filter(phone_number=phone_number).first()
        if not user:
            raise (NotFound("Không tìm thấy"))
        serializer = UserCreateSerializer(user)
        return Response(serializer.data)
 

class GroupViewSets(viewsets.ModelViewSet):
    """Permission for managing user groups"""
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]


class PermissionViewSets(viewsets.GenericViewSet, mixins.ListModelMixin):
    """View sets for listing permissions"""
    serializer_class = PermissionBaseSerializer
    pagination_class = None
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
    queryset = Permission.objects.all()

    def get_queryset(self):
        """Permissions list selection (by module)"""
        modules = os.getenv("MODULES", "")
        if modules:
            modules = modules.split("|")
        modules = ["auth", "core", "menu", "setting"] + modules
        return Permission.objects.filter(content_type__app_label__in=modules).all()


class ContentTypeViewSets(viewsets.GenericViewSet, mixins.ListModelMixin):
    """List content types and their permissions"""
    serializer_class = ContentTypeSerializer
    pagination_class = None
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = ContentType.objects.all()

    def get_queryset(self):
        """Permissions list selection (by module)"""
        modules = os.getenv("MODULES", "")
        if modules:
            modules = modules.split("|")
        modules = ["auth", "core", "menu", "setting"] + modules
        return ContentType.objects.prefetch_related("permission_set").filter(app_label__in=modules).all()


class ImageViewSet(viewsets.ModelViewSet):
    """Managing image from database"""
    serializer_class = ImageSerializer
    queryset = Image.objects.all()
    authentication_classes = []
    permission_classes = []  # TODO: Image missing permission

    def create(self, request, *args, **kwargs):
        """Upload image and save info to database, payload is an array of base64 string"""
        images = request.data

        if not images:
            raise ("Lỗi, payload không đúng")

        # Is request a list?
        if not isinstance(images, list):
            raise ParseError("request body is not iterable")

        headers = {
            'token': settings.SECRET_KEY,
            'bucket': settings.DONTLOOP_BUCKET
        }

        try:
            results = requests.post(settings.MEDIA_SERVER + "/images", json=images, headers=headers)
            data = results.json()
            print(data)
            print(results)
            return_images = []
            for result in data:
                original = result.get("original", None)
                small = result.get("smallUrl", None)
                medium = result.get("mediumUrl", None)
                large = result.get("largeUrl", None)
                image = Image.objects.create(
                    original=original,
                    small=small,
                    medium=medium,
                    large=large
                )
                return_images.append(image)
            # Try to save image
            return Response(ImageSerializer(return_images, many=True).data, status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            raise server_error(request=request)

    def destroy(self, request, pk=None, *args, **kwargs):
        """Delete image model from database and also destroy the file on disk"""
        image = Image.objects.get(pk=pk)

        headers = {
            'token': settings.SECRET_KEY,
            'bucket': settings.DONTLOOP_BUCKET
        }

        results = requests.post(settings.MEDIA_SERVER + "/destroy-image", json={
            'filename': image.original
        }, headers=headers)
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TagViewSets(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
