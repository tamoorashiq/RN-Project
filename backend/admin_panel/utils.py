from users.models import User
from allauth.utils import generate_unique_username
from allauth.account.models import EmailAddress

def create_user(request):
    user = User.objects.create(
        email=request.data.get("email"),
        first_name=request.data.get("full_name"),
        last_name=request.data.get("full_name"),
        username=generate_unique_username([
            request.data.get("full_name"),
            request.data.get("email"),
            'user'
        ])
    )
    user.set_password(request.data.get("password"))
    user.save()
    EmailAddress.objects.create(
        user=user,
        email=user.email,
        verified=True,
        primary=True
    )
    return user