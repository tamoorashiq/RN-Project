from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from rest_auth.registration.views import RegisterView

from home.api.v1.serializers import (
    CitySerializer,
    CustomAuthTokenSerializer,
    FeedbackSerializer,
    PasswordResetConfirmSerializer,
    SignupSerializer,
    StatesSerializer,
    UserSerializer,
)
from home.models import City, Feedback, Flag, Region
from django.conf import settings
from rest_auth.app_settings import (
    create_token
)
from allauth.account import app_settings as allauth_settings
from home.utils import generate_user_otp, send_account_confirmation_email, send_new_otp, sent_password_reset_email

from users.models import User, User_OTP
from rest_auth.models import TokenModel
from allauth.account.models import EmailAddress
from rest_framework import status
from django.utils.translation import ugettext_lazy as _
from django.utils.translation import ugettext_lazy as _




class SignupViewSet(RegisterView):

    def perform_create(self, serializer):
        user = serializer.save(self.request)
        if getattr(settings, 'REST_USE_JWT', False):
            self.token = jwt_encode(user)
        else:
            create_token(self.token_model, user, serializer)

        if allauth_settings.EMAIL_VERIFICATION == 'mandatory':
            otp = User_OTP.objects.get(user=user).otp
            send_account_confirmation_email(
                user,
                otp
            )
        return user


class LoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = CustomAuthTokenSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        return Response({"token": token.key, "user": user_serializer.data})



class ValidateOTPView(APIView):

    def post(self, request):
        email = self.request.data.get('email', None)
        otp = self.request.data.get('otp', None)
        user_otp = User_OTP.objects.filter(
            user__email=email,
            otp=otp,
            is_expire=False
        )
        if user_otp:
            user_otp.update(is_expire=True)
            email_address = EmailAddress.objects.get(user__email=email)
            email_address.verified = True
            email_address.save()
            token = TokenModel.objects.get(user__email=email)
            return Response(
                {"key": token.key},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"detail": _("OTP is Invalid or Expired")},
                status=status.HTTP_404_NOT_FOUND
            )


class PasswordResetView(APIView):

    def post(self, request, *args, **kwargs):
        email = self.request.data.get('email', None)
        user = User.objects.filter(email=email)
        if user.exists():
            user = user.first()
            otp = generate_user_otp(user)
            sent_password_reset_email(user, otp)
            return Response(
                {"detail": _("Password reset e-mail has been sent.")},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"detail": _("Email Does not exists")},
                status=status.HTTP_200_OK
            ) 


class PasswordResetConfirmView(APIView):
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(request.data)
        return Response(
            {"detail": _("Password has been reset with the new password.")}
        )


class RegenrateOTPView(APIView):

    def post(self, request, *args, **kwargs):
        email = self.request.data.get('email', None)
        user = User.objects.filter(email=email)
        if user.exists():
            user = user.first()
            otp = generate_user_otp(user)
            send_new_otp(user, otp)
            return Response(
                {"detail": _("OTP has been sent to your email address.")},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"detail": _("Email Does not exists, Plz enter correct email")},
                status=status.HTTP_200_OK
            )


class StateViewset(ModelViewSet):
    serializer_class = StatesSerializer
    queryset = Region.objects.filter(is_active=True)
    permission_classes = [permissions.AllowAny]
    pagination_class = None



class CityViewset(ModelViewSet):
    serializer_class = CitySerializer
    queryset = City.objects.all()
    permission_classes = [permissions.AllowAny]
    pagination_class = None

    def get_queryset(self):
        queryset = self.queryset
        region = self.request.query_params.get("state")
        if region:
            queryset = queryset.filter(region__id=region)
        return queryset
    
    
class FeedbackViewset(ModelViewSet):
    serializer_class = FeedbackSerializer
    queryset = Feedback.objects.all()
    permission_classes = [permissions.IsAuthenticated]
