from rest_framework import permissions

class IsSuperUser(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user has superuser/admin permissions
        return request.user and request.user.is_superuser