from rest_framework.viewsets import ModelViewSet

from .models import Meal
from .serializers import MealSerializer


# class MealCreateAPI(CreateAPIView):
#     """ API to create new meal """
#     serializer_class = MealSerializer


# class MealListAPI(ListAPIView):
#     """ API to list meals """

#     serializer_class = MealSerializer
#     queryset = Meal.objects.all()

#     def list(self, request):
#         return super(MealListAPI, self).list(request)


# class MealDetailAPI(RetrieveUpdateDestroyAPIView):
#     """ API to get, update and delete meal data """

#     serializer_class = MealSerializer
#     queryset = Meal.objects.all()


class MealAPI(ModelViewSet):
    """
    API for meal model
    """
    queryset = Meal.objects.all().select_related('user')
    serializer_class = MealSerializer
