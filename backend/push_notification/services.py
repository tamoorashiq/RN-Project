from push_notification.utils import send_notification
from push_notification.models import Notification


def create_notification(data:dict) -> Notification:
    notification = Notification.objects.create(
        title=data.get("title", ""),
        description=data.get("description", ""),
        image=data.get("images", ""),
        user=data.get("user", ""),
    )
    send_notification(
        user=notification.user,
        title=notification.title,
        message=notification.description,
        notification=notification,
        data=data
    )
    return notification
