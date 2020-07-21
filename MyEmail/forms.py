from django.forms import ModelForm

from MyEmail.models import Mail


class DraftUpdateForm(ModelForm):
    class Meta:
        model = Mail
        fields = "__all__"