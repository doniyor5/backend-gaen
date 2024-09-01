from django.contrib import admin
from .models import User, OneTimePassword


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    _ = ('email', 'first_name', 'last_name', 'username', 'profile_pic', 'country', 'is_active', 'is_staff',
         'is_verified', 'date_joined', 'last_login', 'is_superuser', 'last_login', 'auth_provider', 'slug')
    list_display, list_filter, search_fields = _, _, _

@admin.register(OneTimePassword)
class OneTimePasswordAdmin(admin.ModelAdmin):
    _ = ('user', 'otp')
    list_display, list_filter, search_fields = _, _, _
