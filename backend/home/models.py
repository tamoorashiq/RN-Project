from django.db import models
from cities_light.receivers import connect_default_signals
from cities_light.abstract_models import (
    AbstractCity,
    AbstractCountry,
    AbstractRegion,
    AbstractSubRegion,
)
from home.constant import FalgReason

from steep_thunder_40040.models import TimeStampedModel
from django.contrib.contenttypes.fields import ContentType, GenericForeignKey

class Country(AbstractCountry):
    is_active = models.BooleanField(default=False)


class Region(AbstractRegion):
    is_active = models.BooleanField(default=False)


class City(AbstractCity):
    is_active = models.BooleanField(default=True)


class SubRegion(AbstractSubRegion):
    is_active = models.BooleanField(default=True)


connect_default_signals(Country)
connect_default_signals(Region)
connect_default_signals(SubRegion)
connect_default_signals(City)

class Feedback(TimeStampedModel):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, null=True, blank=True)
    email_address = models.EmailField(max_length = 200, null=True, blank=True)
    subject = models.CharField(max_length=200, null=True, blank=True)
    message = models.TextField(null=True, blank=True)
    reply = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.subject}"
    
class Flag(TimeStampedModel):
    content_type = models.ForeignKey(
        ContentType, null=True, blank=True, on_delete=models.DO_NOTHING
    )
    object_id = models.IntegerField()
    content_object = GenericForeignKey("content_type", "object_id")
    reason = models.CharField(
        max_length=200,
        choices=FalgReason.choices()
    )
    comment = models.TextField()
    reported_by = models.ForeignKey("users.User", on_delete=models.CASCADE, null=True, blank=True, related_name="reported_by")

    @classmethod
    def get_report_count(cls, content_type, object_id):
        return cls.objects.filter(content_type=content_type, object_id=object_id).count()