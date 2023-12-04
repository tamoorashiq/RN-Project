from django.contrib.auth import get_user_model, forms
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
from allauth.account.forms import ResetPasswordForm
from allauth.account.forms import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from allauth.account.utils import user_username
from allauth.account import app_settings as allauth_account_settings
from allauth.account.adapter import get_adapter
from allauth.utils import build_absolute_uri
User = get_user_model()
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator

class UserChangeForm(forms.UserChangeForm):
    class Meta(forms.UserChangeForm.Meta):
        model = User


class UserCreationForm(forms.UserCreationForm):

    error_message = forms.UserCreationForm.error_messages.update(
        {"duplicate_username": _("This username has already been taken.")}
    )

    class Meta(forms.UserCreationForm.Meta):
        model = User

    def clean_username(self):
        username = self.cleaned_data["username"]

        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            return username

        raise ValidationError(self.error_messages["duplicate_username"])



class CustomPasswordResetForm(ResetPasswordForm):
    def _send_password_reset_mail(self, request, email, users, **kwargs):
        for user in self.users:
            path = f"{urlsafe_base64_encode(force_bytes(user.id))}/{default_token_generator.make_token(user)}"
            url = build_absolute_uri(request, path)

            context = {
                "current_site": get_current_site(request),
                "user": user,
                "password_reset_url": url,
                "request": request,
            }
            if (
                allauth_account_settings.AUTHENTICATION_METHOD
                != allauth_account_settings.AuthenticationMethod.EMAIL
            ):
                context["username"] = user_username(user)

            get_adapter(request).send_mail(
                "account/email/password_reset_key", email, context
            )
