from rest_framework.viewsets import ModelViewSet

from .models import Meal
from .serializers import MealSerializer


class MealAPI(ModelViewSet):
	"""
	API for meal model
	"""

	queryset = Meal.objects.all().select_related('user')
	serializer_class = MealSerializer
