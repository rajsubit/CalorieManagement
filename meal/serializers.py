from rest_framework import serializers

from .models import Meal


class MealSerializer(serializers.ModelSerializer):
    """ Serializer class for Meal Model. """

    user_fullname = serializers.CharField(
        source='user.get_full_name',
        allow_blank=True, required=False, read_only=True)

    class Meta:
        model = Meal
        fields = (
            "id", "user", "user_fullname", "name",
            "date", "time", "calorie",
        )
