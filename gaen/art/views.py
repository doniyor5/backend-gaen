from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions, status
from rest_framework.filters import SearchFilter
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from .models import Art, Comment, Category
from .pagination import StandardResultsSetPagination
from .permission import AdminUserCustom
from .serializers import ArtSerializer, CommentSerializer, CategorySerializer


class AdminCategoryAPIView(GenericAPIView):
    permission_classes = [permissions.IsAdminUser]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, SearchFilter]
    serializer_class = CategorySerializer

    def get(self, request, slug=None):
        if slug:
            try:
                category = Category.objects.get(slug=slug)
                serializer = CategorySerializer(category)
                return Response(serializer.data)
            except Category.DoesNotExist:
                return Response({'message': f'Category not found by {slug}'})

        categories = Category.objects.all()
        search_term = request.GET.get('search')

        if search_term:
            categories = categories.filter(name__icontains=search_term)
            serializer = CategorySerializer(categories, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        categories = Category.objects.all().order_by('-created_at')
        page = self.paginate_queryset(categories)
        if page is not None:
            serializer = CategorySerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, slug=None):
        try:
            category = Category.objects.get(slug=slug)
        except Category.DoesNotExist:
            return Response({"error": f"category not found by {slug}"}, status=status.HTTP_404_NOT_FOUND)

        serializer = CategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug=None):
        try:
            category = Category.objects.get(slug=slug)
            category.delete()
            return Response({"message": f"{category.name} category successfully deleted"})
        except Category.DoesNotExist:
            return Response({"error": f"category not found by {slug} id"}, status=status.HTTP_404_NOT_FOUND)

class ArtAPIView(GenericAPIView):
    permission_classes = [AdminUserCustom]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, SearchFilter]

    def get_queryset(self):
        return Art.objects.all()

    def get(self, request, slug=None):
        user = request.user
        arts = Art.objects.filter(user=user) if user.is_authenticated else Art.objects.all()

        if slug:
            art = arts.filter(slug=slug).first()
            if not art:
                return Response({'message': f'Art with ID {slug} not found'}, status=status.HTTP_404_NOT_FOUND)
            serializer = ArtSerializer(art)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # search and filter
        filters = {
            'title__icontains': request.GET.get('title'),
            'art_name__icontains': request.GET.get('art_name'),
            'user__first_name__icontains': request.GET.get('first_name'),
            'user__last_name__icontains': request.GET.get('last_name'),
            'country__iexact': request.GET.get('country'),
            'category__name__iexact': request.GET.get('category'),
            'is_accepted__iexact': request.GET.get('is_accepted'),
        }
        for key, value in filters.items():
            if value:
                arts = arts.filter(**{key: value})

        page = self.paginate_queryset(arts)
        if page is not None:
            serializer = ArtSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ArtSerializer(arts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, slug=None):
        if not request.user.is_authenticated:
            return Response({'message': 'Authentication required to create art'}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = ArtSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, slug=None):
        art = Art.objects.filter(slug=slug).first()
        if not art:
            return Response({'message': f'Art with ID {slug} not found'}, status=status.HTTP_404_NOT_FOUND)
        if art.user != request.user and not request.user.is_staff:
            return Response({'message': 'You can only update your own art'}, status=status.HTTP_403_FORBIDDEN)
        serializer = ArtSerializer(art, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            art.is_accepted = False
            art.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug=None):
        art = Art.objects.filter(slug=slug).first()
        if not art:
            return Response({'message': f'Art with ID {slug} not found'}, status=status.HTTP_404_NOT_FOUND)
        if art.user != request.user and not request.user.is_staff:
            return Response({'message': 'You can only delete your own art'}, status=status.HTTP_403_FORBIDDEN)
        art.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CommentAPIView(GenericAPIView):
    permission_classes = [AdminUserCustom]
    pagination_class = StandardResultsSetPagination

    def get(self, request, art_slug=None, comment_slug=None):
        art = Art.objects.filter(slug=art_slug).first()
        if not art:
            return Response({'message': 'Given art does not exist'}, status=status.HTTP_404_NOT_FOUND)
        comments = Comment.objects.filter(art=art).order_by('-created_at')
        if comment_slug:
            comment = comments.filter(slug=comment_slug).first()
            if not comment:
                return Response({'message': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)
            return Response(CommentSerializer(comment).data, status=status.HTTP_200_OK)
        page = self.paginate_queryset(comments)
        if page is not None:
            serializer = CommentSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, art_slug=None):
        art = Art.objects.filter(slug=art_slug).first()
        if not art:
            return Response({'message': 'Given art does not exist'}, status=status.HTTP_404_NOT_FOUND)
        text = request.data.get("text", "").strip()
        if not text:
            return Response({'message': 'Text must not be empty or contain only white spaces'}, status=status.HTTP_400_BAD_REQUEST)
        comment_obj = Comment(text=text, user=request.user, art=art)
        comment_obj.save()
        return Response({'comment': CommentSerializer(comment_obj).data}, status=status.HTTP_201_CREATED)

    def put(self, request, art_slug=None, comment_slug=None):
        art = Art.objects.filter(slug=art_slug).first()
        if not art:
            return Response({'message': 'Given art does not exist'}, status=status.HTTP_404_NOT_FOUND)
        comment = Comment.objects.filter(art=art, slug=comment_slug).first()
        if not comment:
            return Response({'message': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)
        if comment.user != request.user and not request.user.is_staff:
            return Response({'message': 'You can only modify your own comments'}, status=status.HTTP_403_FORBIDDEN)
        serializer = CommentSerializer(comment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'comment': CommentSerializer(serializer.instance).data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, art_slug=None, comment_slug=None):
        art = Art.objects.filter(slug=art_slug).first()
        if not art:
            return Response({'message': 'Given art does not exist'}, status=status.HTTP_404_NOT_FOUND)
        comment = Comment.objects.filter(slug=comment_slug).first()
        if not comment:
            return Response({'message': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)
        if comment.user != request.user and not request.user.is_staff:
            return Response({'message': 'You can only delete your own comments'}, status=status.HTTP_403_FORBIDDEN)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
