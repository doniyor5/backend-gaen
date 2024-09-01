from rest_framework.permissions import BasePermission, IsAuthenticatedOrReadOnly, IsAdminUser

class AdminUserCustom(BasePermission):
    def has_permission(self, request, view):
        return (
            IsAuthenticatedOrReadOnly().has_permission(request, view)
            or IsAdminUser().has_permission(request, view)
        )
