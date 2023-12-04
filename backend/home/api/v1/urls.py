from django.urls import path, include
from rest_framework.routers import DefaultRouter

from home.api.v1.viewsets import (
    PasswordResetConfirmView,
    PasswordResetView,
    RegenrateOTPView,
    StateViewset,
    CityViewset,
    # CityView,
    SignupViewSet,
    FeedbackViewset,
    ValidateOTPView
)
from rest_auth.views import LoginView


router = DefaultRouter()
router.register("feedbacks", FeedbackViewset, basename="feedbacks")
router.register("states", StateViewset, basename="states")
router.register("city", CityViewset, basename="city")






urlpatterns = [
    path("signup/", SignupViewSet.as_view(), name='signup'),
    path("login/", LoginView.as_view(), name='login'),
    path('validate-otp/', ValidateOTPView.as_view(), name='validate_otp'),
    path('reset_password/', PasswordResetView.as_view(), name='reset_password'),
    path('confirm_reset_password/', PasswordResetConfirmView.as_view(), name='confirm_reset_password'),
    path('regenerate-otp/', RegenrateOTPView.as_view(), name='regenrate_otp'),
    path("", include(router.urls)),
    path("", include("users.api.v1.urls")),
    path("", include("products.api.v1.urls")),
    path("", include("push_notification.urls")),
    path("admin/", include("admin_panel.api.v1.urls"))

]
