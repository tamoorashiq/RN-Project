from django.db.models.signals import post_save
from django.dispatch import receiver
from home.models import Feedback
from django.core.mail import send_mail
from steep_thunder_40040.settings import DEFAULT_FROM_EMAIL

@receiver(post_save, sender=Feedback)
def reply_feedback(sender, instance, created, **kwargs):
    if instance.reply:
        send_mail(
            "Feedback Reply", 
            instance.reply, 
            DEFAULT_FROM_EMAIL, 
            [instance.email_address]
        )