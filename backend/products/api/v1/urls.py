from django.urls import path, include
from rest_framework.routers import DefaultRouter

from products.api.v1.viewsets import ProductFlagViewset, ProductViewset, CategoryViewset, PublicProductViewset

router = DefaultRouter()
router.register("products", ProductViewset, basename="products")
router.register("public-products", PublicProductViewset, basename="public-products")

router.register("categories", CategoryViewset, basename="categories")
router.register("flag-product", ProductFlagViewset, basename="flag")


urlpatterns = [
    path("", include(router.urls)),
]
