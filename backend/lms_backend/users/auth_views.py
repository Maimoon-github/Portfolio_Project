"""
Authentication views that wrap JWT functionality to match frontend expectations.
"""

from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView as BaseTokenObtainPairView,
    TokenRefreshView as BaseTokenRefreshView,
)
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from django.contrib.auth import authenticate
from .models import User
from .serializers import UserCreateSerializer, UserSerializer


class LoginView(BaseTokenObtainPairView):
    """
    Login endpoint that returns JWT tokens and user data.
    Maps to /api/v1/auth/login/ to match frontend expectations.
    """
    
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 200:
            # Get user data to include in response
            username = request.data.get('username')
            email = request.data.get('email')
            
            # Try to find user by username or email
            user = None
            if username:
                user = User.objects.filter(username=username).first()
            elif email:
                user = User.objects.filter(email=email).first()
            
            if user:
                user_serializer = UserSerializer(user)
                response.data['user'] = user_serializer.data
        
        return response


class LogoutView(APIView):
    """
    Logout endpoint that blacklists the refresh token.
    Maps to /api/v1/auth/logout/ to match frontend expectations.
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response(
                {"detail": "Successfully logged out."}, 
                status=status.HTTP_200_OK
            )
        except TokenError:
            return Response(
                {"detail": "Invalid token."}, 
                status=status.HTTP_400_BAD_REQUEST
            )


class RegisterView(APIView):
    """
    Registration endpoint that creates a new user and returns tokens.
    Maps to /api/v1/auth/register/ to match frontend expectations.
    """
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Generate tokens for the new user
            refresh = RefreshToken.for_user(user)
            
            # Return user data and tokens
            user_data = UserSerializer(user).data
            
            return Response({
                'user': user_data,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RefreshTokenView(BaseTokenRefreshView):
    """
    Token refresh endpoint.
    Maps to /api/v1/auth/refresh/ to match frontend expectations.
    """
    pass
