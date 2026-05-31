from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import UserProfile, Institute, Course, Review, Enquiry, Blog, PlacementSummary
from .serializers import (
    UserSerializer, InstituteSerializer, CourseSerializer,
    ReviewSerializer, EnquirySerializer, BlogSerializer
)

# Custom SimpleJWT payload to include user metadata (name, role)
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        try:
            profile = self.user.profile
            data['role'] = profile.role
            data['name'] = self.user.first_name or self.user.username
        except UserProfile.DoesNotExist:
            data['role'] = 'Student'
            data['name'] = self.user.username
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# User Registration View
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')

        if not name or not email or not password:
            return Response(
                {"error": "Please provide name, email and password"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username=email).exists():
            return Response(
                {"error": "User with this email already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create user
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=name
        )
        
        # Create profile
        UserProfile.objects.create(user=user, role='Student')

        return Response(
            {"success": "User registered successfully", "email": email},
            status=status.HTTP_201_CREATED
        )

# Institute ViewSet
class InstituteViewSet(viewsets.ModelViewSet):
    queryset = Institute.objects.all()
    serializer_class = InstituteSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'id_name'

# Course ViewSet
class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'id_name'

# Review ViewSet
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-date')
    serializer_class = ReviewSerializer
    permission_classes = [permissions.AllowAny]

# Enquiry ViewSet
class EnquiryViewSet(viewsets.ModelViewSet):
    queryset = Enquiry.objects.all().order_by('-date')
    serializer_class = EnquirySerializer

    def get_permissions(self):
        if self.action in ['create']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def update(self, request, *args, **kwargs):
        # Allow admins to change status of enquiries
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

# Blog ViewSet
class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-date')
    serializer_class = BlogSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'id_name'

# AI Recommendation API View
class AIRecommendationView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            profile = user.profile
            prefs = profile.preferences
        except UserProfile.DoesNotExist:
            prefs = []

        # Suggest courses matching preferences or default highly-rated ones
        courses = Course.objects.all()
        if prefs:
            recommended = courses.filter(category__in=prefs)
        else:
            recommended = courses.filter(rating__gte=4.8)

        serializer = CourseSerializer(recommended[:4], many=True)
        return Response(serializer.data)

# User ViewSet for managing registered users / students
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-id')
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
