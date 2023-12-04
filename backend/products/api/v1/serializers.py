from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers
from home.api.v1.serializers import CitySerializer
from home.models import City, Flag, Region

from products.models import Category, Product, ProductMedia
from django.contrib.contenttypes.models import ContentType

from users.api.v1.serializers import ProfileSerializer
from users.models import Review

class ProductMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductMedia
        exclude = ('created_at','updated_at','product')


class ProductSerializer(serializers.ModelSerializer):
    media = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()
    user_details = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = '__all__'

    def to_representation(self, data):
        data = super(ProductSerializer, self).to_representation(data)
        data['city_name'] = City.objects.get(id=data['city']).name if data['city'] is not None else None
        data['state_name'] = Region.objects.get(id=data['state']).name if data['state'] is not None else None
        return data   

    def get_media(self, instance):
        return ProductMediaSerializer(
            ProductMedia.objects.filter(
                product=instance
            ),
            many=True
        ).data

    def get_location(self, instance):
        return {
            "city": instance.city.name if instance.city else None,
            "state": instance.state.name if instance.state else None,
            "zip_code": instance.zip_code
        }

    def get_user_details(self, instance):
        data = ProfileSerializer(instance.user.profile).data
        data['feedback'] = Review.calculate_average_rating(instance.user)
        return data

    def create(self, validated_data):
        request = self.context["request"]
        validated_data["user"] = request.user
        product = super().create(validated_data)
        for file in request.data.getlist('file'):
            ProductMedia.objects.create(
                product=product,
                image=file
            )
        return product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        exclude = ('created_at', 'updated_at')


class ProductFlagSerializer(serializers.ModelSerializer):
    # reported_times = serializers.SerializerMethodField()

    class Meta:
        model = Flag
        exclude = ('created_at','updated_at', 'content_type', 'reported_by')
    
    def validate(self, data):
        request = self.context["request"]
        if not data.get("object_id"):
            raise serializers.ValidationError({"object_id": _("Object Id is required.")})
        if not data.get("reason"):
            raise serializers.ValidationError({"reason": _("reason is required.")})
        if not data.get("comment"):
            raise serializers.ValidationError({"comment": _("comment is required.")})
        if Flag.objects.filter(
            object_id=data.get("object_id"),
            reported_by=request.user
        ).exists():
            raise serializers.ValidationError({"duplicate": _("you already report this item.")})
        return data

    
    def create(self, validated_data):
        request = self.context["request"]
        validated_data["reported_by"] = request.user
        validated_data['content_type'] = ContentType.objects.get(model="product")
        return super().create(validated_data)