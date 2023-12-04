from django.urls import path, include

from users.api.v1.views import AllProfilesView, ProfileView, ReviewViewset, DeleteAccountView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("reviews", ReviewViewset, basename="reviews")


urlpatterns = [
    path("", include(router.urls)),
    path("profile/", ProfileView.as_view(), name='profile'),
    path("all-profiles/", AllProfilesView.as_view(), name='all-profiles'),
    path("user/", DeleteAccountView.as_view(), name='delete-my-account'),

]