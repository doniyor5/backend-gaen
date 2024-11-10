from django.contrib import admin
from .models import Art, Comment, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'description')
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at', 'update_at')
    ordering = ('-created_at',)


@admin.register(Art)
class ArtAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'category', 'is_accepted', 'created_at')
    list_filter = ('category', 'is_accepted', 'created_at')
    search_fields = ('title', 'description', 'user__username', 'category__name')
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at', 'update_at', 'edited')
    ordering = ('-created_at',)
    list_editable = ('is_accepted',)
    list_per_page = 25


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('short_text', 'user', 'art', 'created_at')
    list_filter = ('user', 'art', 'created_at')
    search_fields = ('text', 'user__username', 'art__title')
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at', 'update_at', 'edited')
    ordering = ('-created_at',)
    list_per_page = 25

    def short_text(self, obj):
        return obj.text[:50] + '...' if len(obj.text) > 50 else obj.text
    short_text.short_description = 'Comment Text'
