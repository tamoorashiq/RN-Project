from rest_framework.views import APIView
from rest_framework import permissions, filters
from users.api.v1.serializers import AllUsersProfileSerializer, ProfileSerializer, ReviewSerializer
from users.models import Profile, Review
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend


class ProfileView(APIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            self.queryset.get(user=request.user)
        )
        return Response(serializer.data, status=200)
            

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            Profile.objects.get(user=request.user),
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=200)


class AllProfilesView(APIView):
    serializer_class = AllUsersProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            self.queryset.all(),
            many=True
        )
        return Response(serializer.data, status=200)


class DeleteAccountView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        request.user.delete()
        return Response({"message": "your account successfully deleted."},status=200)


class ReviewViewset(ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = {
        "user": ["exact"]
    }


    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context