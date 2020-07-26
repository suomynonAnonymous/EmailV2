import os

from django.db import models
from django.contrib.auth.models import User


def file_name(instance, filename):
    return 'mail/user_{0}/{1}'.format(instance.sender.id, filename)


class Mail(models.Model):
    LABEL_CHOICES = (('GR', 'General'), ('SP', 'Support'), ('AS', 'Assignment'), ('EX', 'Examination'),
                     ('PR', 'Practical'))
    subject = models.CharField(max_length=100, blank=True, null=True)
    label = models.CharField(max_length=2, choices=LABEL_CHOICES, default='GR')
    body = models.TextField(blank=True, null=True)
    attachment = models.FileField(upload_to=file_name, blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    sender_starred = models.BooleanField(default=False)
    sender_delete = models.BooleanField(default=False)
    mail_draft = models.BooleanField(default=False)
    # related fields
    sender = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name="mail_sender")
    reply_to = models.ForeignKey("self", blank=True, null=True, on_delete=models.CASCADE)

    # def __str__(self):
    #     return self.subject + '--' + self.sender.username

    def get_file_upload_name(self):
        if self.attachment:
            return os.path.split(self.attachment.name)[1]
        else:
            return ""


class MailReceiver(models.Model):
    received_date = models.DateTimeField(auto_now_add=True)
    viewed_date = models.DateTimeField(blank=True, null=True)
    # mail_send = models.BooleanField(default=False)
    mail_starred = models.BooleanField(default=False)
    mail_spam = models.BooleanField(default=False)
    mail_deleted = models.BooleanField(default=False)
    mail_viewed = models.BooleanField(default=False)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="mail_receiver")
    mail = models.ForeignKey(Mail, on_delete=models.CASCADE)

    # def __str__(self):
    #     return self.mail.subject + '--' + self.mail.sender.username + '--' + self.receiver.username

    def get_file_upload_name(self):
        if self.mail.attachment:
            return os.path.split(self.mail.attachment.name)[1]
        else:
            return ""
