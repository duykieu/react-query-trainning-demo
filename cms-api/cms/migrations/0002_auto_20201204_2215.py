# Generated by Django 2.2.4 on 2020-12-04 22:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
        ('cms', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Collection',
            new_name='Category',
        ),
    ]