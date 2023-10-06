from django.urls import path
from . import views
from .views import MyTokenObtainPairView, SignUpView, admin_info
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('admin-info/', admin_info, name='admin_info'),
    path('check-auth-status/', views.check_auth_status),
]
