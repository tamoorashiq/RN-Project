from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from home.models import City, Region

from steep_thunder_40040.models import TimeStampedModel
from django.db.models import Avg

class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.


    This model represents the User instance of the system, login system and
    everything that relates with an `User` is represented by this model.
    """

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), blank=True, null=True, max_length=255)
    flag = models.BooleanField(default=False)
    is_read_terms = models.BooleanField(_('Is Read Terms and Condition?'), default=False)


    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

class User_OTP(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    otp = models.IntegerField()
    is_expire = models.BooleanField(default=False)


    def __str__(self):
        return f'{self.user}'



class Profile(TimeStampedModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to ='profiles/', null=True, blank=True)
    full_name = models.CharField(max_length=200, null=True, blank=True)
    phone_number = models.CharField(max_length=200, null=True, blank=True)
    street_address = models.CharField(max_length=200, null=True, blank=True)
    state = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True, blank=True)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, blank=True)
    zip_code = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return f"{self.full_name}"
    
class Review(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    review_by = models.ForeignKey(User, related_name="review_by", on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.rating}"
    
    @classmethod
    def calculate_average_rating(cls, user):
        average_rating = cls.objects.filter(user=user).aggregate(Avg('rating'))
        return average_rating['rating__avg']