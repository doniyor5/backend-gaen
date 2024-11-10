from django.contrib import admin
from django.urls import path, include
from django.urls import path, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static
from .settings import ADMIN_URL

schema_view = get_schema_view(
    openapi.Info(
        title="Your API Title",
        default_version='v1',
        description="Description of your API",
    ),
    public=True,  # Allows public access to the documentation
    permission_classes=[permissions.AllowAny, ],  # No authentication required
)

urlpatterns = [
    path(f'api/{ADMIN_URL}/', admin.site.urls),

    path('api/v1/auth/', include("userAuth.urls")),
    path('api/v1/auth/', include('socialAuth.urls')),
    path('api/v1/article/user/', include('art.urls')),

    re_path(r'^api/swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('api/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
