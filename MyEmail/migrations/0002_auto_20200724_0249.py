# Generated by Django 3.0.8 on 2020-07-24 02:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MyEmail', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mailreceiver',
            name='viewed_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
