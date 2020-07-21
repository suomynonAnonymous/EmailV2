from django.db import models
from django.contrib.auth.models import User

LABEL_CHOICES = (('SP', 'Support'), ('AS', 'Assignment'), ('EX', 'Examination'),
                 ('PR', 'Practical'))


class Mail(models.Model):
    subject = models.CharField(max_length=100, blank=True, null=True)
    label = models.CharField(max_length=2, choices=LABEL_CHOICES, blank=True, null=True)
    body = models.TextField(blank=True, null=True)
    file = models.FileField(upload_to="files/", blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    # sender_delete = models.BooleanField(default=False)
    mail_draft = models.BooleanField(default=False)
    # related fields
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="mail_sender", null=True, blank=True)
    reply_to = models.ForeignKey("self", blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.subject + '--' + self.sender.username


class MailReceiver(models.Model):
    send_date = models.DateTimeField(auto_now_add=True)
    viewed_date = models.DateTimeField(auto_now=True)
    mail_send = models.BooleanField(default=False)
    mail_starred = models.BooleanField(default=False)
    mail_spam = models.BooleanField(default=False)
    mail_deleted = models.BooleanField(default=False)
    mail_viewed = models.BooleanField(default=False)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="mail_receiver", null=True, blank=True)
    mail = models.ForeignKey(Mail, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.mail.sender.username + '--' + self.mail.subject + '---'+ self.receiver.username