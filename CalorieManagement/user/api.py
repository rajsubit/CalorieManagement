from django.contrib import auth
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .serializers import UserSerializer


class UserAPI(ModelViewSet):
    """ View sets for UserProfile """

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        print(kwargs.get('pk'))


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def login(request):
    """ View to authenticate user and login"""

    username = request.data.get("username")
    password = request.data.get("password")
    message = ''
    if not username or not password:
        message = "Please pass both username and password"
        return Response(
            {"detail": message},
            status=status.HTTP_401_UNAUTHORIZED
        )
    user = auth.authenticate(username=username, password=password)
    if not user:
        message = "Incorrect username or password"
        return Response(
            {"detail": message},
            status=status.HTTP_401_UNAUTHORIZED
        )
    auth.login(request, user)
    serializer = UserSerializer(user)
    message = "Login Successful"
    return Response(dict(serializer.data), status=status.HTTP_200_OK)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def logout(request):
    """ View to logout users """
    if not request.user.is_authenticated():
        return Response(
            {"detail": "Please login to logout."},
            status=status.HTTP_400_BAD_REQUEST)
    auth.logout(request)
    return Response(
        {"detail": "Successfully logged out."},
        status=status.HTTP_200_OK)
