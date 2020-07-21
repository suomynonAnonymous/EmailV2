from django.urls import path

from MyEmail.views import MailListView, mail_starred, mail_deleted, mail_send, mail_viewed, mail_unread, mail_spam, \
    MailDraftView, MailDetailView, DraftUpdateView

urlpatterns = [
    path('mail_list_class', MailListView.as_view(), name='mail_list_class'),
    path('mail_draft_class', MailDraftView.as_view(), name='mail_draft_class'),
    path('mail_spam/<int:pk>', mail_spam, name='mail_spam'),
    path('mail_starred/<int:pk>', mail_starred, name='mail_starred'),
    path('mail_deleted/<int:pk>', mail_deleted, name='mail_deleted'),
    path('mail_send/<int:pk>', mail_send, name='mail_send'),
    path('mail_viewed/<int:pk>', mail_viewed, name='mail_viewed'),
    path('mail_unread/<int:pk>', mail_unread, name='mail_unread'),
    path('mail_detail/<int:pk>', MailDetailView.as_view(), name='mail_detail'),
    path('mail_draft_detail/<int:pk>', DraftUpdateView.as_view(), name='mail_draft_detail'),
]