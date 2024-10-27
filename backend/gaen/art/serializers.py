from rest_framework import serializers
from .models import Category, Art, Comment
from userAuth.serializers import UserSerializer # type: ignore[attr-defined]
from userAuth.models import User # type: ignore[attr-defined]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'description', 'update_at', 'created_at' ,'slug', )

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('text', 'created_at', 'update_at', 'art', 'user', 'edited', 'slug')

    def create(self, validated_data):
        comment = Comment.objects.create(text=validated_data["text"], user=validated_data["user"])
        return comment


class ArtSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(queryset=Category.objects.all(), slug_field='name', required=True)
    comments = CommentSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Art
        fields = ('title', 'art_name', 'country', 'email', 'description', 'art_img', 'category', 'is_accepted',
                  'created_at', 'update_at', 'edited', 'user', 'comments')
