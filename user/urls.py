from django.conf.urls import url

from rest_framework import routers

from .api import UserAPI, login, logout

router = routers.SimpleRouter()
router.register(r'api/user', UserAPI)

urlpatterns = [
	url(
		regex=r'^api/login/$',
		view=login,
		name="api_login"
	),

	url(
		regex=r'^api/logout/$',
		view=logout,
		name="api_logout"
	),
]

urlpatterns += router.urls
