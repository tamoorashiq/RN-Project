from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from home.models import Flag
from products.api.v1.serializers import CategorySerializer, ProductFlagSerializer, ProductSerializer
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404

from products.models import Category, Product

class PublicProductViewset(ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [permissions.AllowAny]
    http_method_names = ["get"]

    def get_queryset(self):
        qs = super(PublicProductViewset, self).get_queryset()
        return qs.order_by("-created_at")

class ProductViewset(ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = {
            "category": ["in", "exact"],
            "state": ["exact"],
            "city": ["exact"],
            "user": ["exact"]
        }
    search_fields = ["name", "estimated_amount"]

    
    def get_queryset(self):
        qs = super(ProductViewset, self).get_queryset()
        return qs.order_by("-created_at")

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        queryset = queryset.exclude(user=self.request.user)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


    @action(detail=False, methods=["GET"])
    def my_products(self, request, *args, **kwargs):
        serializer = ProductSerializer(
            Product.objects.filter(user=request.user),
            many=True
        )
        return Response(serializer.data, status=200)

    @action(detail=True, methods=["DELETE"])
    def delete(self, request, pk=None):
        instance = get_object_or_404(Product, pk=pk)
        instance.delete()
        return Response({"message": "Product sucessfully deleted."},status=200)

class CategoryViewset(ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    http_method_names = ['get'] 
    filterset_fields = {}
    search_fields = ["name"] 


class ProductFlagViewset(ModelViewSet):
    serializer_class = ProductFlagSerializer
    queryset = Flag.objects.all()
    permission_classes = [permissions.IsAuthenticated]