from django.http import Http404, HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import AuthStatusSerializer, SignUpSerializer, MyTokenObtainPairSerializer, UserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .email import * 



class SignUpView(generics.CreateAPIView):
  
    queryset = User.objects.all()
    serializer_class = SignUpSerializer
    token_serializer_class = MyTokenObtainPairSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            user = serializer.instance
            # Generate token
            token_serializer = self.token_serializer_class()
            token = token_serializer.get_token(user)


            # Return token
            return Response({'access_token': str(token.access_token)}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save()
    
   



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    
    if request.user is None:
        return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
@api_view(['GET'])
def check_auth_status(request):
   
    serializer = AuthStatusSerializer({'is_authenticated': request.user.is_authenticated})
    return Response(serializer.data, status=status.HTTP_200_OK)

