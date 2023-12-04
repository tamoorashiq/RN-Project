from push_notification.models import *

from rest_framework import serializers


class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        exclude = [
        ]
