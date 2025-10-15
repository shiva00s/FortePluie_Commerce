# apps/users/views.py
from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
# Add to the bottom of apps/users/views.py
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer # Import our new serializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,) # Crucially, anyone can access this view to register
    serializer_class = RegisterSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer