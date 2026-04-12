# @@CONTENT_PLACEHOLDER@@
@@from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register, name="auth-register"),
    path("login/", views.login, name="auth-login"),
    path("logout/", views.logout, name="auth-logout"),
    path("refresh/", views.refresh_token, name="auth-refresh"),
    path("me/", views.me, name="auth-me"),
]@@

write_file "backend/apps/accounts/views.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.conf import settings
from .serializers import RegisterSerializer, UserSerializer


def _set_auth_cookies(response: Response, access: str, refresh: str) -> Response:
    """Write JWT tokens to httpOnly cookies."""
    jwt_settings = settings.SIMPLE_JWT
    response.set_cookie(
        key="access_token",
        value=access,
        max_age=int(jwt_settings["ACCESS_TOKEN_LIFETIME"].total_seconds()),
        httponly=True,
        secure=not settings.DEBUG,
        samesite="Lax",
        path="/",
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh,
        max_age=int(jwt_settings["REFRESH_TOKEN_LIFETIME"].total_seconds()),
        httponly=True,
        secure=not settings.DEBUG,
        samesite="Lax",
        path="/api/v1/auth/refresh/",
    )
    return response


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    refresh = RefreshToken.for_user(user)
    response = Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
    return _set_auth_cookies(response, str(refresh.access_token), str(refresh))


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    from django.contrib.auth import authenticate
    email = request.data.get("email", "")
    password = request.data.get("password", "")
    user = authenticate(request, username=email, password=password)
    if not user:
        return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
    refresh = RefreshToken.for_user(user)
    response = Response(UserSerializer(user).data, status=status.HTTP_200_OK)
    return _set_auth_cookies(response, str(refresh.access_token), str(refresh))


@api_view(["POST"])
@permission_classes([AllowAny])
def refresh_token(request):
    token_str = request.COOKIES.get("refresh_token")
    if not token_str:
        return Response({"detail": "Refresh token missing."}, status=status.HTTP_401_UNAUTHORIZED)
    try:
        refresh = RefreshToken(token_str)
        response = Response({"detail": "Token refreshed."}, status=status.HTTP_200_OK)
        return _set_auth_cookies(response, str(refresh.access_token), str(refresh))
    except TokenError as e:
        return Response({"detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    token_str = request.COOKIES.get("refresh_token")
    if token_str:
        try:
            RefreshToken(token_str).blacklist()
        except TokenError:
            pass
    response = Response({"detail": "Logged out."}, status=status.HTTP_200_OK)
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return response


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    return Response(UserSerializer(request.user).data)@@

# =============================================================================
# 7. BACKEND — apps/blog/
# =============================================================================
section "backend/apps/blog/"

mkd "backend/apps/blog/migrations"
write_file "backend/apps/blog/migrations/__init__.py" <<'@@CONTENT_PLACEHOLDER@@'
