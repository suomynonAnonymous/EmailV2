from django.urls import path

from .views import MailListView, mail_starred, mail_deleted, mail_send, mail_viewed, mail_unread, mail_spam, \
    MailDraftView, MailDetailView, DraftUpdateView, MailMultipleCreate, DraftCreateView, ReplyCreateView, \
    SendDetailView, sender_starred, sender_delete, StarTrashView

urlpatterns = [
    path('mail_list_class', MailListView.as_view(), name='mail_list_class'),
    path('mail_create_class', MailMultipleCreate.as_view(), name='mail_create_class'),
    path('draft_create_class', DraftCreateView.as_view(), name='draft_create_class'),
    path('reply_create_class', ReplyCreateView.as_view(), name='reply_create_class'),
    path('mail_draft_class', MailDraftView.as_view(), name='mail_draft_class'),
    path('star_trash_class', StarTrashView.as_view(), name='star_trash_class'),

    path('mail_spam/<int:pk>', mail_spam, name='mail_spam'),
    path('mail_starred/<int:pk>', mail_starred, name='mail_starred'),
    path('sender_starred/<int:pk>', sender_starred, name='sender_starred'),
    path('mail_deleted/<int:pk>', mail_deleted, name='mail_deleted'),
    path('sender_delete/<int:pk>', sender_delete, name='sender_delete'),
    path('mail_send/<int:pk>', mail_send, name='mail_send'),
    path('mail_viewed/<int:pk>', mail_viewed, name='mail_viewed'),
    path('mail_unread/<int:pk>', mail_unread, name='mail_unread'),
    path('mail_detail/<int:pk>', MailDetailView.as_view(), name='mail_detail'),
    path('send_detail/<int:pk>', SendDetailView.as_view(), name='send_detail'),
    path('mail_draft_detail/<int:pk>', DraftUpdateView.as_view(), name='mail_draft_detail'),
]