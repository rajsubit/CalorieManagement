from django.contrib.auth.models import User

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
	""" Serializer class for user model. """
	first_name = serializers.CharField(required=False)
	last_name = serializers.CharField(required=False)

	class Meta:
		""" Meta class for UserProfileSerializer """
		model = User
		fields = ('id', 'username', 'first_name', 'last_name', 'password',)
		extra_kwargs = {'password': {'write_only': True}}
