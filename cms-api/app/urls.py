"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
# from rest_framework import permissions
# from drf_yasg.views import get_schema_view
# from drf_yasg import openapi
from core.views import UserViewSets, GroupViewSets, user_login, ImageViewSet, TagViewSets, \
    PermissionViewSets, ContentTypeViewSets
# Property
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .elastic import elastic_authenticated_search


admin.sites.AdminSite.index_title = "Chọn một model"
admin.sites.AdminSite.site_title = "PyProps Management"

routers = DefaultRouter()
routers.register('api/permissions', PermissionViewSets)
routers.register('api/groups', GroupViewSets)
routers.register('api/users', UserViewSets)
routers.register('api/images', ImageViewSet)
routers.register('api/tags', TagViewSets)
routers.register('api/content_types', ContentTypeViewSets)


# schema_view = get_schema_view(
#     openapi.Info(
#         title="Snippets API",
#         default_version='v1',
#         description="Test description",
#         terms_of_service="https://www.google.com/policies/terms/",
#         contact=openapi.Contact(email="contact@snippets.local"),
#         license=openapi.License(name="BSD License"),
#     ),
#     public=True,
#     permission_classes=(permissions.AllowAny,),
# )
urlpatterns = [
    # re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    # path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    # path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    path('', include(routers.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('login/', user_login),
    path('api/login/', user_login),
    path('api/cms/', include('cms.urls')),
    path('api/auth_search/', elastic_authenticated_search),
]
