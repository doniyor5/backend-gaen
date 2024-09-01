from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import RefreshToken
from .managers import UserManager
from slugify import slugify

AUTH_PROVIDERS = {'email': 'email', 'google': 'google', 'github': 'github', 'linkedin': 'linkedin'}


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True, verbose_name=_("email"))
    first_name = models.CharField(max_length=100, verbose_name=_("First Name"))
    last_name = models.CharField(max_length=100, null=True, blank=True)

    username = models.CharField(max_length=20, unique=True, null=True, blank=True)
    profile_pic = models.ImageField(upload_to=f'media/profilePictures/%Y/%m/', null=True, blank=True)
    country = models.CharField(max_length=80, null=False, blank=False)

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    auth_provider = models.CharField(max_length=50, blank=False, null=False, default=AUTH_PROVIDERS.get('email'))
    slug = models.CharField(max_length=300, null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.username is None:
            self.slug = slugify(str(self.username) + '-' + str(self.date_joined)[:25])
        else:
            self.slug = slugify(str(self.first_name) + '-' + str(self.date_joined)[:25])
        return super().save(*args, **kwargs)

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects = UserManager()

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }

    def __str__(self):
        return self.email

    class Meta:
        db_table = 'Users'

    @property
    def get_full_name(self):
        if self.last_name is None:
            return str(self.first_name).title()
        return f"{str(self.first_name).title()} {str(self.last_name).title()}"


class OneTimePassword(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)

    def __str__(self):
        return f"{self.user.first_name} - otp code"

    class Meta:
        db_table = 'PasswordConfirms'
