# Generated by Django 2.2.4 on 2020-12-04 22:14

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.UUIDField(auto_created=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('slug', models.CharField(max_length=255)),
                ('images', models.ManyToManyField(to='core.Image')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.UUIDField(auto_created=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('slug', models.CharField(max_length=255)),
                ('summary', models.TextField(max_length=500, null=True)),
                ('body', models.CharField(max_length=255)),
                ('published_at', models.DateTimeField(null=True)),
                ('created_at', models.DateTimeField(null=True)),
                ('updated_at', models.DateTimeField(null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('images', models.ManyToManyField(to='core.Image')),
            ],
        ),
        migrations.CreateModel(
            name='Page',
            fields=[
                ('id', models.UUIDField(auto_created=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('body', models.TextField(blank=True, null=True)),
                ('images', models.ManyToManyField(to='core.Image')),
                ('tags', models.ManyToManyField(to='cms.Tag')),
            ],
        ),
        migrations.CreateModel(
            name='Collection',
            fields=[
                ('id', models.UUIDField(auto_created=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('slug', models.CharField(max_length=255)),
                ('images', models.ManyToManyField(to='core.Image')),
            ],
        ),
    ]
