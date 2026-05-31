from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Institute, Course, SyllabusModule, PlacementSummary, SuccessStory, Review, Enquiry, Blog

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='profile.role', read_only=True)
    preferences = serializers.JSONField(source='profile.preferences', read_only=True)
    name = serializers.CharField(source='first_name', read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'preferences', 'name')

# Syllabus Module Serializer
class SyllabusModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SyllabusModule
        fields = ('module_number', 'title', 'content')

# Course Serializer
class CourseSerializer(serializers.ModelSerializer):
    syllabus_modules = SyllabusModuleSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = (
            'id', 'id_name', 'title', 'category', 'duration', 'fees',
            'rating', 'type', 'placement_support', 'badge', 'description',
            'tools', 'skills_covered', 'syllabus_modules'
        )

# SuccessStory Serializer
class SuccessStorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SuccessStory
        fields = '__all__'

# Review Serializer
class ReviewSerializer(serializers.ModelSerializer):
    institute_name = serializers.CharField(source='institute.name', read_only=True)

    class Meta:
        model = Review
        fields = ('id', 'student_name', 'institute', 'institute_name', 'course_name', 'rating', 'comment', 'date')

# Institute Serializer
class InstituteSerializer(serializers.ModelSerializer):
    testimonials = SuccessStorySerializer(many=True, read_only=True)
    courses_offered = serializers.SerializerMethodField()

    class Meta:
        model = Institute
        fields = (
            'id', 'id_name', 'name', 'logo', 'description', 'rating',
            'reviews_count', 'placement_rate', 'students_trained',
            'avg_package', 'highest_package', 'duration', 'fees_range',
            'locations', 'phone', 'email', 'hiring_partners', 'gallery',
            'testimonials', 'courses_offered'
        )

    def get_courses_offered(self, obj):
        return [c.id_name for c in obj.courses.all()]

# Enquiry Serializer
class EnquirySerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    institute_name = serializers.CharField(source='institute.name', read_only=True)

    class Meta:
        model = Enquiry
        fields = (
            'id', 'course', 'course_title', 'institute', 'institute_name',
            'student_name', 'student_email', 'student_phone', 'message',
            'status', 'date'
        )

# Blog Serializer
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'
