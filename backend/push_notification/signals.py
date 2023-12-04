from django.db.models.signals import post_save
from django.dispatch import receiver
from fcm_django.models import FCMDevice

@receiver(post_save, sender=FCMDevice, dispatch_uid="Set token to pubnub")
def delete_previous_device_tokens(sender, created, instance, **kwargs):
    if created:
        FCMDevice.objects.filter(user=instance.user).exclude(
            id=instance.id
        ).delete()