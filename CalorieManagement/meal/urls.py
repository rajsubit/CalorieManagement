from rest_framework import routers

from .api import MealAPI

router = routers.SimpleRouter()

router.register(r"api/meal", MealAPI, base_name="meal")


urlpatterns = [
]

urlpatterns += router.urls
