from fcm_django.models import FCMDevice
import requests
from requests.structures import CaseInsensitiveDict
from steep_thunder_40040.settings import FCM_SERVER_KEY

def delete_device(user_id):
    return FCMDevice.objects.filter(user=user_id).delete()


def activate_device(user_id):
    return FCMDevice.objects.filter(user=user_id).update(active=True)


def send_notification(user, title, message, notification, data = {}):
    url = "https://fcm.googleapis.com/fcm/send"
    headers = CaseInsensitiveDict()
    headers["Accept"] = "application/json"
    headers["Authorization"] = "key={}".format(FCM_SERVER_KEY)
    headers["Content-Type"] = "application/json"
    devices = FCMDevice.objects.filter(user=user)
    try:
        for device in devices:
            payload = {
                    'to': device.registration_id,
                    'notification': {
                        "title": title,
                        "body": message
                    },
                    'data': {
                        'click_action': data.get('link'),
                        'imageUrl': data.get('image_url')
                    }
                }
            resp = requests.post(url, headers=headers, json=payload)
    except Exception as e:
        print('-----------------------')
        print(e)
        print('-----------------------')
