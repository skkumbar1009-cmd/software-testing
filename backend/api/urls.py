from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CustomTokenObtainPairView, RegisterView, InstituteViewSet,
    CourseViewSet, ReviewViewSet, EnquiryViewSet, BlogViewSet,
    AIRecommendationView, UserViewSet
)
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'institutes', InstituteViewSet, basename='institute')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'enquiries', EnquiryViewSet, basename='enquiry')
router.register(r'blogs', BlogViewSet, basename='blog')
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('recommendations/', AIRecommendationView.as_view(), name='recommendations'),
]
