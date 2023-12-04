from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from push_notification.models import Notification
from push_notification.serializers import NotificationSerializer
from django_filters import rest_framework as filters
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from push_notification.services import create_notification
from users.models import User


class NotificationViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer
    queryset = Notification.objects.filter()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['user', 'is_read']

    def get_queryset(self):
        queryset = self.queryset.filter(
            user=self.request.user
        ).order_by("-created_at")
        return queryset

    @action(detail=False, methods=['GET'])
    def read_notification(self, request):
        Notification.objects.filter(
            id=request.GET.get("id")
        ).update(is_read=True)
        return Response({"message": "Notification status updated"}, status=status.HTTP_200_OK)

        
            

class SendNotificationView(APIView):
    
    def post(self, request):
        for user_id in request.data.get("users"):
            create_notification({
                "title": request.data.get("title"),
                "description": request.data.get("description"),
                "image_url": request.data.get("image_url"),
                "link": request.data.get("link"),
                "user": User.objects.get(id=user_id)
            }
        )
        return Response({"message": "Notification successfully sent,"}, status=status.HTTP_200_OK)