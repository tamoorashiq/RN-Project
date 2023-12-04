from django.urls import path, include
from rest_framework.routers import DefaultRouter

from admin_panel.api.v1.views import UserViewset, CategoryViewset, FlaggedItemViewset, ProductViewset


router = DefaultRouter()
router.register("users", UserViewset, basename="users")
router.register("products", ProductViewset, basename="products")

router.register("flag-items", FlaggedItemViewset, basename="flags")
router.register("categories", CategoryViewset, basename="categories")


urlpatterns = [
    path("", include(router.urls)),
]
