from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model

from users.forms import UserChangeForm, UserCreationForm
from users.models import Profile, Review, User_OTP

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):

    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (("User", {"fields": ("name",)}),) + auth_admin.UserAdmin.fieldsets
    list_display = ["username", "name", "is_superuser"]
    search_fields = ["name"]


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'phone_number', 'street_address', 'state', 'city', 'zip_code')
    search_fields = ["phone_number", "full_name"]


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'rating', 'comment', 'review_by')
    search_fields = ["rating", "comment"]

@admin.register(User_OTP)
class UserOTPAdmin(admin.ModelAdmin):
    list_display = ('user', 'otp', 'is_expire')