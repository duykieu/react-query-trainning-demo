# Generated by Django 2.2.4 on 2021-01-10 19:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0002_auto_20201204_2215'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='description',
            field=models.TextField(blank=True, max_length=10000, null=True),
        ),
    ]
