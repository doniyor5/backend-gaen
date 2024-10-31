import os
from pathlib import Path
import environ
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

environ.Env.read_env(BASE_DIR / '.env')

env = environ.Env()

SECRET_KEY = env("SECRET_KEY")

DEBUG = True

ALLOWED_HOSTS = ['*']
ADMIN_URL=env("ADMIN_URL")

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # custom apps
    'userAuth',
    'socialAuth',
    'art',
    # third part apps
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'rest_framework_simplejwt.token_blacklist',
    'drf_yasg',
    'django_filters'

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# rest conf
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'NON_FIELD_ERRORS_KEY': 'error',
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=24 * 60 * 7),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=31),
    'AUTH_HEADER_TYPES': ('Bearer',),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": False,
    "UPDATE_LAST_LOGIN": False,
}

# CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = True
# CORS_ORIGIN_ALLOW_ALL = True
CSRF_TRUSTED_ORIGINS = ['https://shaxzodbek-muxtorov.jprq.site']
#
# CORS_ALLOW_METHODS = [
#     'DELETE',
#     'GET',
#     'OPTIONS',
#     'PATCH',
#     'POST',
#     'PUT',
# ]
#
# CORS_ALLOW_HEADERS = [
#     'accept',
#     'accept-encoding',
#     'authorization',
#     'content-type',
#     'dnt',
#     'origin',
#     'user-agent',
#     'x-csrftoken',
#     'x-requested-with',
# ]
#

# CORS_ALLOWED_ORIGINS = ['*']
#

ROOT_URLCONF = 'gaen.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'gaen.wsgi.application'
AUTH_USER_MODEL = 'userAuth.User'
DB_NAME = env("DB_NAME")
DATABASES = {

    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / DB_NAME,

    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': env('POSTGRES_DB', default='postgres'),
#         'USER': env('POSTGRES_USER', default='postgres'),
#         'PASSWORD': env('POSTGRES_PASSWORD', default='postgres'),
#         'HOST': env('POSTGRES_HOST', default='127.0.0.1'),
#         'PORT': env('POSTGRES_PORT', default='5432'),
#     }
# }

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'
STATIC_URL = "static/"

# STATICFILES_DIRS = [
#     BASE_DIR / "static",
# ]


# emails secrets settings

EMAIL_HOST_USER = env('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL')
EMAIL_USE_TLS = True
EMAIL_PORT = 587

# gutHub secrets settings
# https://github.com/settings/developers
# https://github.com/settings/applications/2673337
GITHUB_CLIENT_ID = env('GITHUB_CLIENT_ID')
GITHUB_SECRET = env('GITHUB_SECRET')

# google secrets settings
# https://console.cloud.google.com/apis/credentials/consent/edit;newAppInternalUser=false?project=gaen-432605
# https://console.cloud.google.com/apis/credentials?project=gaen-432605
GOOGLE_CLIENT_ID = env('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_PASSWORD = env('GOOGLE_CLIENT_PASSWORD')
SOCIAL_AUTH_PASSWORD = env('SOCIAL_AUTH_PASSWORD')
