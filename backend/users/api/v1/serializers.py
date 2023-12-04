from rest_framework import serializers

from users.models import Profile, Review

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ('created_at', 'updated_at')


class AllUsersProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ("user_id", "id", "full_name", "profile_image")

    def get_user_id(self, instance):
        return instance.user.id

class ReviewSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    class Meta:
        model = Review
        exclude = ('review_by', 'updated_at')

    def get_profile_image(self, instance):
        return instance.review_by.profile.profile_image.url if instance.review_by.profile.profile_image else ""
    
    def get_name(self, instance):
        return instance.review_by.profile.full_name
    
    def create(self, validated_data):
        request = self.context["request"]
        validated_data["review_by"] = request.user
        return super().create(validated_data)