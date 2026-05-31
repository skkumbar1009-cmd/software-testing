from django.db import models
from django.contrib.auth.models import User

# User profile model extending default User
class UserProfile(models.Model):
    ROLE_CHOICES = (
        ('Student', 'Student'),
        ('Admin', 'Admin'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Student')
    preferences = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.role}"

# Institute Model
class Institute(models.Model):
    id_name = models.CharField(max_length=100, unique=True) # e.g. "sevenmentor"
    name = models.CharField(max_length=255)
    logo = models.CharField(max_length=10) # e.g. "SM"
    description = models.TextField()
    rating = models.FloatField(default=4.0)
    reviews_count = models.IntegerField(default=0)
    placement_rate = models.IntegerField(default=85) # %
    students_trained = models.IntegerField(default=0)
    avg_package = models.CharField(max_length=50) # e.g. "4.8 LPA"
    highest_package = models.CharField(max_length=50) # e.g. "12.0 LPA"
    duration = models.CharField(max_length=100) # e.g. "3 - 4 Months"
    fees_range = models.CharField(max_length=100) # e.g. "₹18,000 - ₹35,000"
    locations = models.JSONField(default=list) # e.g. ["Shivaji Nagar", "FC Road"]
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    hiring_partners = models.JSONField(default=list) # list of company names
    gallery = models.JSONField(default=list, blank=True) # list of photo URLs

    def __str__(self):
        return self.name

# Course Model
class Course(models.Model):
    id_name = models.CharField(max_length=100, unique=True) # e.g. "manual-testing"
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    duration = models.CharField(max_length=100)
    fees = models.IntegerField()
    rating = models.FloatField(default=4.0)
    type = models.CharField(max_length=50) # e.g. "Beginner"
    placement_support = models.CharField(max_length=255)
    badge = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField()
    tools = models.JSONField(default=list)
    skills_covered = models.JSONField(default=list)
    institutes = models.ManyToManyField(Institute, related_name='courses', blank=True)

    def __str__(self):
        return self.title

# Course Syllabus details model
class SyllabusModule(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='syllabus_modules')
    module_number = models.IntegerField()
    title = models.CharField(max_length=255)
    content = models.TextField()

    class Meta:
        ordering = ['module_number']

    def __str__(self):
        return f"{self.course.title} - Module {self.module_number}: {self.title}"

# Placements Aggregate Data
class PlacementSummary(models.Model):
    highest_package = models.CharField(max_length=50)
    avg_package = models.CharField(max_length=50)
    students_placed = models.CharField(max_length=50)
    active_partners = models.CharField(max_length=50)

# Success Stories / Testimonials
class SuccessStory(models.Model):
    name = models.CharField(max_length=255)
    course = models.CharField(max_length=255)
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE, related_name='testimonials', blank=True, null=True)
    company = models.CharField(max_length=255)
    package = models.CharField(max_length=100)
    avatar_url = models.CharField(max_length=500, blank=True, null=True)
    comment = models.TextField()

    def __str__(self):
        return f"{self.name} - Placed at {self.company}"

# Review Model
class Review(models.Model):
    student_name = models.CharField(max_length=255)
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE, related_name='reviews')
    course_name = models.CharField(max_length=255, blank=True, null=True)
    rating = models.IntegerField(default=5)
    comment = models.TextField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.student_name} review of {self.institute.name} - {self.rating} stars"

# Enquiry Lead Model
class Enquiry(models.Model):
    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Contacted', 'Contacted'),
        ('Closed', 'Closed'),
    )
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enquiries')
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE, related_name='enquiries')
    student_name = models.CharField(max_length=255)
    student_email = models.EmailField()
    student_phone = models.CharField(max_length=50)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Enquiry from {self.student_name} to {self.institute.name}"

# Blog Model
class Blog(models.Model):
    id_name = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    excerpt = models.TextField()
    content = models.TextField()
    date = models.DateField()
    read_time = models.CharField(max_length=50)
    author = models.CharField(max_length=255)
    image_url = models.CharField(max_length=500)

    def __str__(self):
        return self.title
