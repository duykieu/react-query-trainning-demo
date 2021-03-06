# Generated by Django 2.2.4 on 2020-12-04 21:53

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.UUIDField(auto_created=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('original', models.CharField(max_length=255)),
                ('large', models.CharField(max_length=255, null=True)),
                ('medium', models.CharField(max_length=255, null=True)),
                ('small', models.CharField(max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.UUIDField(auto_created=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('email', models.CharField(blank=True, max_length=255, null=True)),
                ('name', models.CharField(max_length=191, null=True)),
                ('id_number', models.CharField(blank=True, max_length=191, null=True)),
                ('id_issue_date', models.CharField(blank=True, max_length=191, null=True)),
                ('id_issue_place', models.CharField(blank=True, max_length=191, null=True)),
                ('phone_number', models.CharField(max_length=191, unique=True)),
                ('phone_number_2', models.CharField(blank=True, max_length=191, null=True)),
                ('address', models.TextField(blank=True, null=True)),
                ('display_name', models.CharField(blank=True, max_length=191, null=True)),
                ('balance', models.BigIntegerField(default=0)),
                ('promote_balance', models.BigIntegerField(default=0)),
                ('extra_balance', models.BigIntegerField(default=0)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('old_system_id', models.IntegerField(null=True)),
                ('telegram_login', models.CharField(blank=True, max_length=255, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
        ),
    ]
