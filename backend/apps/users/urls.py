from django.urls import path
from .views import RegisterView, MyTokenObtainPairView # Import the new view
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), # Use the new view
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]