from django.db import models
from django.db.utils import cached_property
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
    PermissionsMixin, AbstractUser, Group
from django.conf import settings

import uuid

group_names = {
    'admin': 'Quản trị viên',
    'editor': 'Thư ký',
    'owner': 'Chủ nhà',
    'partner': 'Môi giới',
    'staff': 'Nhân viên',
    'member': 'Thành viên'
}


class UserManager(BaseUserManager):

    def create_user(self, phone_number, password=None, **extra_fields):
        """Create and save new user"""
        if not phone_number:
            raise ValueError('User must have phone_number')

        user = self.model(phone_number=phone_number.lower(), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, phone_number, password):
        """Create and save a new super user"""
        user = self.create_user(phone_number, password)
        user.is_staff = True
        user.is_superuser = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model which replace username by email"""
    id = models.UUIDField(auto_created=True, editable=False, default=uuid.uuid4, primary_key=True)
    password = models.CharField('password', max_length=128)
    email = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=191, null=True)
    id_number = models.CharField(max_length=191, blank=True, null=True)
    id_issue_date = models.CharField(max_length=191, blank=True, null=True)
    id_issue_place = models.CharField(max_length=191, blank=True, null=True)
    phone_number = models.CharField(max_length=191, unique=True)
    phone_number_2 = models.CharField(max_length=191, blank=True, null=True)
    address = models.TextField(null=True, blank=True)
    display_name = models.CharField(max_length=191, null=True, blank=True)
    balance = models.BigIntegerField(default=0)
    promote_balance = models.BigIntegerField(default=0)
    extra_balance = models.BigIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    old_system_id = models.IntegerField(null=True)
    telegram_login = models.CharField(null=True, blank=True, max_length=255)
    objects = UserManager()

    USERNAME_FIELD = 'phone_number'

    @cached_property
    def contact(self):
        phones = " - ".join([self.phone_number or "", self.phone_number_2 or ""])
        names = []
        if self.name:
            names.append(self.name)
        if self.display_name:
            names.append(self.display_name)

        final_name = f"( {'/'.join(names)} )" if len(names) else ""
        return f"{phones} {final_name}"

    @cached_property
    def is_admin(self):
        return self.groups.filter(name="admin") or self.is_superuser

    class Meta:
        app_label = "core"


class Image(models.Model):
    id = models.UUIDField(auto_created=True, editable=False, default=uuid.uuid4, primary_key=True)
    original = models.CharField(max_length=255)
    large = models.CharField(max_length=255, null=True)
    medium = models.CharField(max_length=255, null=True)
    small = models.CharField(max_length=255, null=True)

    @cached_property
    def original_url(self):
        url = self.original or self.large or self.medium or self.small or None
        if url:
            if url[:1] == "/":
                url = url[1:]
            return settings.ASSET_BASE + url

    @cached_property
    def large_url(self):
        url = self.large or self.original or self.medium or self.small or None
        if url:
            if url[:1] == "/":
                url = url[1:]
            return settings.ASSET_BASE + url

    @cached_property
    def medium_url(self):
        url = self.medium or self.large or self.original or self.small or None
        if url:
            if url[:1] == "/":
                url = url[1:]
            return settings.ASSET_BASE + url

    @cached_property
    def small_url(self):
        url = self.small or self.medium or self.large or self.original or None
        if url:
            if url[:1] == "/":
                url = url[1:]
            return settings.ASSET_BASE + url


class Tag(models.Model):
    id = models.UUIDField(auto_created=True, editable=False, default=uuid.uuid4, primary_key=True)
    name = models.CharField(max_length=30)
    slug = models.CharField(max_length=50)
    images = models.ManyToManyField("core.Image")
    description = models.TextField(null=True)
