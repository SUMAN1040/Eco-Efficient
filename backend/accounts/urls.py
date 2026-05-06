from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, MyTokenObtainPairView, SendOTPView, UserProfileView, ChangePasswordView, VerifyOTPView, SuperuserDashboardView, UpdateUserRoleView, DeleteAccountView, AdminRequestView, PartnerRequestView, ApproveAdminRequestView, RejectAdminRequestView, DeleteUserView, SendEmailView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('send-otp/', SendOTPView.as_view(), name='send-otp'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('delete-account/', DeleteAccountView.as_view(), name='delete-account'),
    path('admin-request/', AdminRequestView.as_view(), name='admin-request'),
    path('partner-request/', PartnerRequestView.as_view(), name='partner-request'),
    
    # Superuser Management Dashboard
    path('superuser-dashboard/', SuperuserDashboardView.as_view(), name='superuser-dashboard'),
    path('superuser-dashboard/update-role/<int:user_id>/', UpdateUserRoleView.as_view(), name='update-role'),
    path('superuser-dashboard/approve-admin/<int:profile_id>/', ApproveAdminRequestView.as_view(), name='approve-admin'),
    path('superuser-dashboard/reject-admin/<int:profile_id>/', RejectAdminRequestView.as_view(), name='reject-admin'),
    path('superuser-dashboard/delete-user/<int:user_id>/', DeleteUserView.as_view(), name='delete-user'),
    path('superuser-dashboard/send-email/<int:user_id>/', SendEmailView.as_view(), name='send-email'),
]
