from rest_framework.viewsets import ModelViewSet
from admin_panel.api.v1.serializers import AdminCategorySerializer, AdminFlagSerializer, AdminProductSerializer, AdminUserSerializer
from home.models import Flag
from products.models import Category, Product
from rest_framework import permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from steep_thunder_40040.permissions import IsSuperUser
from users.models import User
from rest_framework.decorators import action
from rest_framework import serializers
from admin_panel.utils import create_user
from users.models import Profile, User
from home.models import City, Region
from django.utils.translation import gettext_lazy as _
from django_filters.rest_framework import DjangoFilterBackend

class UserViewset(ModelViewSet):
    permission_classes = [IsSuperUser]
    serializer_class = AdminUserSerializer
    queryset = User.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = {}
    search_fields = ["name"]

    @action(detail=False, methods=["POST"])
    def add_user(self, request, *args, **kwargs):
        if User.objects.filter(email=request.data.get("email")).exists():
            raise serializers.ValidationError({"email": _("User already exists with this email address.")})
        else:
            user = create_user(request)
            Profile.objects.filter(user=user).update(
                full_name=request.data.get("full_name"),
                phone_number=request.data.get("phone_number"),
                street_address=request.data.get("street_address"),
                state=Region.objects.get(id=request.data.get("state")),
                city=City.objects.get(id=request.data.get('city')),
                zip_code=request.data.get("zip_code"),
                profile_image=request.data.get("profile_image")
            )
        return Response(AdminUserSerializer(user).data, status=200)

class CategoryViewset(ModelViewSet):
    permission_classes = [IsSuperUser]
    serializer_class = AdminCategorySerializer
    queryset = Category.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = {}
    search_fields = ["name"]


class FlaggedItemViewset(ModelViewSet):
    permission_classes = [IsSuperUser]
    serializer_class = AdminFlagSerializer
    queryset = Flag.objects.filter()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = {
        "reason": ["exact"],
    }
    search_fields = ["reported_by__profile__full_name"]

    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class ProductViewset(ModelViewSet):
    serializer_class = AdminProductSerializer
    queryset = Product.objects.all()
    permission_classes = [IsSuperUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = {
        "category": ["in", "exact"],
        "state": ["exact"],
        "city": ["exact"],
        "user": ["exact"]
    }
    search_fields = ["name", "estimated_amount"]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
