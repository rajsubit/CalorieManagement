from rest_framework.generics import (
    CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
)

from .models import Meal
from .serializers import MealSerializer


class MealCreateAPI(CreateAPIView):
    """ API to create new meal """
    serializer_class = MealSerializer


class MealListAPI(ListAPIView):
    """ API to list meals """

    serializer_class = MealSerializer
    queryset = Meal.objects.all()


class MealDetailAPI(RetrieveUpdateDestroyAPIView):
    """ API to get, update and delete meal data """

    serializer_class = MealSerializer
    queryset = Meal.objects.all()
