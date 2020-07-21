# Generated by Django 3.0.8 on 2020-07-21 02:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Mail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(blank=True, max_length=100, null=True)),
                ('label', models.CharField(blank=True, choices=[('SP', 'Support'), ('AS', 'Assignment'), ('EX', 'Examination'), ('PR', 'Practical')], max_length=2, null=True)),
                ('body', models.TextField(blank=True, null=True)),
                ('file', models.FileField(blank=True, null=True, upload_to='files/')),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('sender_delete', models.BooleanField(default=False)),
                ('mail_draft', models.BooleanField(default=False)),
                ('reply_to', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='MyEmail.Mail')),
                ('sender', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='mail_sender', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MailReceiver',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('send_date', models.DateTimeField(auto_now_add=True)),
                ('viewed_date', models.DateTimeField(auto_now=True)),
                ('mail_send', models.BooleanField(default=False)),
                ('mail_starred', models.BooleanField(default=False)),
                ('mail_spam', models.BooleanField(default=False)),
                ('mail_deleted', models.BooleanField(default=False)),
                ('mail_viewed', models.BooleanField(default=False)),
                ('email', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='MyEmail.Mail')),
                ('receiver', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='mail_receiver', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
