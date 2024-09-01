from rest_framework.generics import GenericAPIView
from rest_framework import permissions, status
from rest_framework.response import Response

from .models import Art, Comment, Category
from .pagination import StandardResultsSetPagination
from .serializers import ArtSerializer, CommentSerializer, CategorySerializer
from userAuth.serializers import UserSerializer  # type: ignore[attr-defined]
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from .permissons import AdminUserCustom


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

    def get(self, request, slug=None):
        user = request.user
        arts = Art.objects.filter(user=user) if user.is_authenticated else Art.objects.all()

        if slug:
            try:
                art = arts.get(slug=slug)
                serializer = ArtSerializer(art)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Art.DoesNotExist:
                return Response(data={'message': f'Art with ID {slug} not found'}, status=status.HTTP_404_NOT_FOUND)

        arts = Art.objects.all()

        # search
        title = request.GET.get('title', None)
        art_name = request.GET.get('art_name', None)
        first_name = request.GET.get('last_name', None)
        last_name = request.GET.get('first_name', None)

        if title:
            arts = arts.filter(title__icontains=title)
        if art_name:
            arts = arts.filter(art_name__icontains=art_name)
        if first_name:
            arts = arts.filter(user__first_name__icontains=first_name)
        if last_name:
            arts = arts.filter(user__last_name__icontains=last_name)

        # filter
        country = request.GET.get('country', None)
        category = request.GET.get('category', None)
        is_accepted = request.GET.get('is_accepted', None)
        if country:
            arts = arts.filter(country__iexact=country)
        if category:
            arts = arts.filter(category__name__iexact=category)
        if is_accepted:
            arts = arts.filter(is_accepted__iexact=is_accepted)

        page = self.paginate_queryset(arts)
        if page is not None:
            serializer = ArtSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = ArtSerializer(arts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response(data={'message': 'Authentication required to create art'},
                            status=status.HTTP_401_UNAUTHORIZED)

        serializer = ArtSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, slug=None):
        try:
            art = Art.objects.get(slug=slug)
        except Art.DoesNotExist:
            return Response(data={'message': f'Art with ID {slug} not found'}, status=status.HTTP_404_NOT_FOUND)

        if art.user == request.user or request.user.is_staff:
            serializer = ArtSerializer(art, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                art.is_accepted = False
                art.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'message': 'You can only update your own art'}, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, slug=None):
        try:
            art = Art.objects.get(slug=slug)
        except Art.DoesNotExist:
            return Response(data={'message': f'Art with ID {slug} not found'}, status=status.HTTP_404_NOT_FOUND)

        if art.user == request.user or request.user.is_staff:
            art.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(data={'message': 'You can only delete your own art'}, status=status.HTTP_403_FORBIDDEN)


class CommentAPIView(GenericAPIView):
    permission_classes = [AdminUserCustom]
    pagination_class = StandardResultsSetPagination

    def get(self, request, art_slug=None, comment_slug=None):
        try:
            art = Art.objects.get(slug=art_slug)
        except Art.DoesNotExist:
            return Response(data={'message': 'Given art does not exist'}, status=status.HTTP_404_NOT_FOUND)
        comments = Comment.objects.filter(art=art).order_by('-created_at')
        if comment_slug:
            try:
                comment = comments.get(slug=comment_slug)
                return Response(CommentSerializer(comment).data, status=status.HTTP_200_OK)
            except Comment.DoesNotExist:
                return Response(data={'message': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)
        page = self.paginate_queryset(comments)
        if page is not None:
            serializer = CommentSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, art_slug=None):
        try:
            art = Art.objects.get(slug=art_slug)
        except Art.DoesNotExist:
            return Response(data={'message': 'Given art does not exist'}, status=status.HTTP_404_NOT_FOUND)
        user_obj = request.user

        text = request.data.get("text")
        if text is None:
            return Response(data={'message': 'text must not be empty'}, status=status.HTTP_400_BAD_REQUEST)
        text = text.strip()
        if text == '':
            return Response(data={'message': 'text must not include only white spaces'},
                            status=status.HTTP_400_BAD_REQUEST)

        comment_obj = Comment(text=text, user=user_obj, art=art)
        comment_obj.save()
        return Response(data={
            'comment': CommentSerializer(comment_obj).data,
        }, status=status.HTTP_201_CREATED)

    def put(self, request, art_slug=None, comment_slug=None):
        try:
            art = Art.objects.get(slug=art_slug)
        except Art.DoesNotExist:
            return Response(data={'message': 'Given art does not exist'}, status=status.HTTP_404_NOT_FOUND)

        if not comment_slug:
            return Response({"message": "select comment"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            comment = Comment.objects.filter(art=art).get(slug=comment_slug)
        except Comment.DoesNotExist:
            return Response({"message": "comment not found"}, status=status.HTTP_404_NOT_FOUND)

        if comment.user == request.user or request.user.is_staff:

            serializer = CommentSerializer(comment, data=request.data, partial=True)

            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()

            return Response(data={
                'comment': CommentSerializer(serializer.instance).data,
            }, status=status.HTTP_200_OK)
        return Response({'message': 'You can only modify your own comments'}, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, art_slug=None, comment_slug=None):
        try:
            art = Art.objects.get(slug=art_slug)
        except Art.DoesNotExist:
            return Response(data={'message': 'Given art does not exist'}, status=status.HTTP_404_NOT_FOUND)

        if not comment_slug:
            return Response({"message": "select comment"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            comment = Comment.objects.get(slug=comment_slug)
        except Comment.DoesNotExist:
            return Response({"message": "comment not found"}, status=status.HTTP_404_NOT_FOUND)

        if comment.user == request.user or request.user.is_staff:
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'message': 'You can only delete your own comments'}, status=status.HTTP_403_FORBIDDEN)
