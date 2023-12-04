from rest_framework import serializers
from home.models import Flag
from products.api.v1.serializers import ProductMediaSerializer
from products.models import Category, Product, ProductMedia
from users.api.v1.serializers import ProfileSerializer

from users.models import User


class AdminUserSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    phone_number = serializers.SerializerMethodField()
    street_address = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__' 
        extra_kwargs = {
            'password': {'required': False},
            'username': {'required': False}
        }

    def get_profile_image(self, instance):
        return instance.profile.profile_image.url if instance.profile.profile_image else None
    
    def get_phone_number(self, instance):
        return instance.profile.phone_number

    def get_street_address(self, instance):
        return instance.profile.street_address

class AdminCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class AdminProductSerializer(serializers.ModelSerializer):
    media = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()
    user_details = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = '__all__'

    def get_media(self, instance):
        return ProductMediaSerializer(
            ProductMedia.objects.filter(
                product=instance
            ),
            many=True
        ).data

    def get_location(self, instance):
        return {
            "city": instance.city.name,
            "state": instance.state.name,
            "zip_code": instance.zip_code
        }

    def get_user_details(self, instance):
        return ProfileSerializer(instance.user.profile).data

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


class AdminFlagSerializer(serializers.ModelSerializer):
    reported_times = serializers.SerializerMethodField()
    posted_by = serializers.SerializerMethodField()
    class Meta:
        model=Flag
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["content_type"] = instance.content_type.name
        representation["reported_by"] = instance.reported_by.profile.full_name
        return representation

    def get_reported_times(self, instance):
        return instance.get_report_count(
            instance.content_type,
            instance.object_id
        )

    def get_posted_by(self, instance):
        product = Product.objects.filter(
            id=instance.object_id
        )
        if product.exists():
            return product.first().user.profile.full_name
        else:
            return None
