# Generated by Django 3.0 on 2021-01-23 09:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_tag'),
        ('cms', '0008_auto_20210114_2328'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='tags',
            field=models.ManyToManyField(to='core.Tag'),
        ),
        migrations.AlterField(
            model_name='post',
            name='tags',
            field=models.ManyToManyField(to='core.Tag'),
        ),
        migrations.DeleteModel(
            name='Tag',
        ),
    ]
