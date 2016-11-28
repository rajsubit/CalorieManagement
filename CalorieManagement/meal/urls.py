from django.conf.urls import url

from .api import MealListAPI, MealDetailAPI


urlpatterns = [
    url(
        regex=r'^api/list/$',
        view=MealListAPI.as_view(),
        name='meal_list_api'
    ),

    url(
        regex=r'^api/detail/(?P<pk>[0-9]+)/$',
        view=MealDetailAPI.as_view(),
        name='meal_detail_api'
    )
]
