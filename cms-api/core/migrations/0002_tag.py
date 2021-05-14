# Generated by Django 3.0 on 2021-01-23 09:37

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.UUIDField(auto_created=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
                ('slug', models.CharField(max_length=50)),
                ('description', models.TextField(null=True)),
                ('images', models.ManyToManyField(to='core.Image')),
            ],
        ),
    ]
