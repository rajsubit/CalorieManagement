from django.contrib.auth.models import User

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
	"""
	Serializer class for user model.
	"""

	full_name = serializers.CharField(source='get_full_name', required=False)
	is_authenticated = serializers.BooleanField(required=False)

	class Meta:
		"""
		Meta class for UserProfileSerializer
		"""

		model = User
		fields = (
			'id', 'username', 'full_name', 'password',
			'is_authenticated',)
		extra_kwargs = {'password': {'write_only': True}}
