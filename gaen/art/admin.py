from django.contrib import admin
from .models import Art, Comment, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    _ = ('name', 'description', 'created_at', 'update_at')
    list_display, list_filter, search_fields = _, _, _


@admin.register(Art)
class ArtAdmin(admin.ModelAdmin):
    _ = ('title', 'art_name','art_name','email','art_img','description', 'category', 'is_accepted', 'created_at', 'update_at', 'edited','user', )
    list_display, list_filter, search_fields = _, _, _


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    _ = ('text','created_at', 'update_at', 'art', 'user', 'edited')
    list_display, list_filter, search_fields = _, _, _
