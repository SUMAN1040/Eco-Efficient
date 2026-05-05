from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, MyTokenObtainPairView, SendOTPView, UserProfileView, ChangePasswordView, VerifyOTPView, SuperuserDashboardView, UpdateUserRoleView, DeleteAccountView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('send-otp/', SendOTPView.as_view(), name='send-otp'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('delete-account/', DeleteAccountView.as_view(), name='delete-account'),
    
    # Superuser Management Dashboard
    path('superuser-dashboard/', SuperuserDashboardView.as_view(), name='superuser-dashboard'),
    path('superuser-dashboard/update-role/<int:user_id>/', UpdateUserRoleView.as_view(), name='update-role'),
]
