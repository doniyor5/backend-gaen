from unicodedata import name
from django.urls import path
from .views import RegisterView, VerifyUserEmail, LoginUserView, PasswordResetConfirm, PasswordResetRequestView, SetNewPasswordView, LogoutApiView, ProfileUpdateView, DeleteUserApiView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-email/', VerifyUserEmail.as_view(), name='verify'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', LoginUserView.as_view(), name='login-user'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirm.as_view(), name='reset-password-confirm'),
    path('set-new-password/', SetNewPasswordView.as_view(), name='set-new-password'),
    path('logout/', LogoutApiView.as_view(), name='logout'),
    path('delete/', DeleteUserApiView.as_view(), name='delete-user'),

    path('updateProfile/', ProfileUpdateView.as_view(), name='update-profile')
]
