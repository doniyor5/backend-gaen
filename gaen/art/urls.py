from django.urls import path

from .views import CommentAPIView, ArtAPIView, AdminCategoryAPIView

urlpatterns = [
    path('category/<str:slug>/', AdminCategoryAPIView.as_view(), name='category'),
    path('category/', AdminCategoryAPIView.as_view(), name='category-create'),
    path('art/', ArtAPIView.as_view(), name='get-arts'),
    path('art/<str:slug>/', ArtAPIView.as_view(), name='get-art'),
    path('art/<str:art_slug>/comments/', CommentAPIView.as_view(), name='get-arts'),
    path('art/<str:art_slug>/comments/<str:comment_slug>', CommentAPIView.as_view(), name='get-arts'),
]
