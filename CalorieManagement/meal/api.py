from rest_framework.generics import (
    CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
)
from rest_framework.permissions import IsAuthenticated

from .models import Meal
from .serializers import MealSerializer


class MealCreateAPI(CreateAPIView):
    """ API to create new meal """
    serializer_class = MealSerializer


class MealListAPI(ListAPIView):
    """ API to list meals """

    serializer_class = MealSerializer
    queryset = Meal.objects.all()

    def list(self, request):
        print (request.user)
        return super(MealListAPI, self).list(request)


class MealDetailAPI(RetrieveUpdateDestroyAPIView):
    """ API to get, update and delete meal data """

    serializer_class = MealSerializer
    queryset = Meal.objects.all()
