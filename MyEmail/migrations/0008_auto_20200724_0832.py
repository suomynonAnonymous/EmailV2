# Generated by Django 3.0.8 on 2020-07-24 08:32

import MyEmail.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MyEmail', '0007_auto_20200724_0607'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mail',
            name='attachment',
            field=models.FileField(blank=True, null=True, upload_to=MyEmail.models.file_name),
        ),
    ]
