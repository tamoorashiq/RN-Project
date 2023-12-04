import random

from users.models import User_OTP
from django.contrib.sites.models import Site
from django.template.loader import render_to_string
from steep_thunder_40040.settings import DEFAULT_FROM_EMAIL
from django.core.mail import send_mail


def generate_user_otp(user):
    otp = format(random.randint(0, 9999), '06d')
    user_otp = User_OTP.objects.filter(user=user)
    if user_otp.exists():
        user_otp.update(otp=otp, is_expire=False)
    else:
        user_otp = User_OTP.objects.create(user=user, otp=otp)

    return otp


def send_account_confirmation_email(user, otp):
    current_site = Site.objects.get_current()
    msg_plain = render_to_string('email/account_confirmation_email.txt',
                                 {'user': user, 'otp': otp, 'domain': current_site.domain})
    msg_html = render_to_string('email/account_confirmation_email.html',
                                {'user': user, 'otp': otp, 'domain': current_site.domain})
    send_mail(
        'Account Confirmation Email',
        msg_plain,
        DEFAULT_FROM_EMAIL,
        [user.email],
        html_message=msg_html,
    )


def sent_password_reset_email(user, otp):
    current_site = Site.objects.get_current()
    msg_plain = render_to_string('email/password_reset_email.txt',
                                 {'user': user, 'otp': otp, 'domain': current_site.domain})
    msg_html = render_to_string('email/password_reset_email.html',
                                {'user': user, 'otp': otp, 'domain': current_site.domain})

    send_mail(
        'Password Reset Email',
        msg_plain,
        DEFAULT_FROM_EMAIL,
        [user.email],
        html_message=msg_html,
    )

def send_new_otp(user, otp):
    current_site = Site.objects.get_current()
    msg_plain = render_to_string('email/otp_email.txt', {'user': user, 'otp': otp, 'domain': current_site.domain})
    msg_html = render_to_string('email/otp_email.html', {'user': user, 'otp': otp, 'domain': current_site.domain})

    send_mail(
        'New OTP',
        msg_plain,
        DEFAULT_FROM_EMAIL,
        [user.email],
        html_message=msg_html,
    )
