import os
import django

# Setup Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import UserProfile, Institute, Course, SyllabusModule, SuccessStory, Review, Enquiry, Blog

def seed():
    print("Clearing database...")
    User.objects.all().delete()
    UserProfile.objects.all().delete()
    Institute.objects.all().delete()
    Course.objects.all().delete()
    SyllabusModule.objects.all().delete()
    SuccessStory.objects.all().delete()
    Review.objects.all().delete()
    Enquiry.objects.all().delete()
    Blog.objects.all().delete()

    print("Creating admin and student accounts...")
    # Admin
    admin_user = User.objects.create_superuser('admin@testinghub.com', 'admin@testinghub.com', 'admin', first_name="System Admin")
    UserProfile.objects.create(user=admin_user, role='Admin')
    
    # Student
    student_user = User.objects.create_user('student@testinghub.com', 'student@testinghub.com', 'student', first_name="Pune Student")
    UserProfile.objects.create(user=student_user, role='Student', preferences=['automation-testing'])

    print("Creating institutes...")
    institutes_data = [
        {
            "id_name": "sevenmentor",
            "name": "SevenMentor",
            "logo": "SM",
            "description": "SevenMentor is a premier training provider in Pune, recognized for its modern learning hubs and state-of-the-art classroom infrastructure.",
            "rating": 4.7,
            "reviews_count": 342,
            "placement_rate": 92,
            "students_trained": 8500,
            "avg_package": "4.8 LPA",
            "highest_package": "9.5 LPA",
            "duration": "3 - 4 Months",
            "fees_range": "₹18,000 - ₹35,000",
            "locations": ["Shivaji Nagar", "FC Road", "Kharadi"],
            "phone": "+91 97633 97633",
            "email": "enquiry@sevenmentor.com",
            "hiring_partners": ["TCS", "Infosys", "Wipro", "Capgemini"],
            "gallery": ["https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"]
        },
        {
            "id_name": "qspiders",
            "name": "QSpiders Pune",
            "logo": "QS",
            "description": "QSpiders is India's largest software testing training ecosystem. Known for its extensive placement cell.",
            "rating": 4.8,
            "reviews_count": 651,
            "placement_rate": 95,
            "students_trained": 18000,
            "avg_package": "5.1 LPA",
            "highest_package": "12.0 LPA",
            "duration": "4 Months",
            "fees_range": "₹25,000 - ₹40,000",
            "locations": ["Deccan Gymkhana", "Hinjewadi", "Chinchwad"],
            "phone": "+91 80505 80505",
            "email": "pune@qspiders.com",
            "hiring_partners": ["Cognizant", "Accenture", "Deloitte", "Atos Syntel"],
            "gallery": ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"]
        },
        {
            "id_name": "testometer",
            "name": "TestoMeter",
            "logo": "TM",
            "description": "TestoMeter focuses exclusively on core Software Testing specializations, high-intensity bootcamps, and mock interviews.",
            "rating": 4.9,
            "reviews_count": 284,
            "placement_rate": 94,
            "students_trained": 4200,
            "avg_package": "5.5 LPA",
            "highest_package": "11.0 LPA",
            "duration": "2 - 3 Months",
            "fees_range": "₹15,000 - ₹30,000",
            "locations": ["Kothrud"],
            "phone": "+91 99701 40019",
            "email": "info@testometer.co.in",
            "hiring_partners": ["Persistent Systems", "Symantec", "Quick Heal", "Tietoevry"],
            "gallery": ["https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80"]
        }
    ]

    inst_objs = {}
    for inst_data in institutes_data:
        inst = Institute.objects.create(**inst_data)
        inst_objs[inst.id_name] = inst

    print("Creating courses and syllabus...")
    courses_data = [
        {
            "id_name": "manual-testing",
            "title": "Manual Testing",
            "category": "Manual Testing",
            "duration": "6 Weeks",
            "fees": 12000,
            "rating": 4.8,
            "type": "Beginner",
            "placement_support": "Yes",
            "badge": "Popular",
            "description": "Master software testing fundamentals, test case designing, execution, bug tracking, and Agile methodologies.",
            "tools": ["Jira", "Excel"],
            "skills_covered": ["Agile Testing", "Defect Logging", "Test Plan Creation"],
            "syllabus": [
                "Introduction to Software Engineering & Testing",
                "Software Testing Life Cycle (STLC)",
                "Bug Life Cycle & Defect Management using Jira"
            ]
        },
        {
            "id_name": "automation-testing",
            "title": "Automation Testing Masterclass",
            "category": "Automation Testing",
            "duration": "12 Weeks",
            "fees": 28000,
            "rating": 4.9,
            "type": "Advanced",
            "placement_support": "100% Placement Guarantee",
            "badge": "Best Seller",
            "description": "A comprehensive program covering Java/Python, Selenium WebDriver, TestNG, Cucumber BDD, Git, and Jenkins.",
            "tools": ["Selenium", "Java", "TestNG", "Jenkins", "Git"],
            "skills_covered": ["Framework Architecture", "Automation Scripting", "CI/CD Pipeline"],
            "syllabus": [
                "Core Java / Python Fundamentals for Automation",
                "Selenium WebDriver Core Concepts & Element Locators",
                "Page Object Model (POM) Design Pattern"
            ]
        }
    ]

    for course_data in courses_data:
        syllabus_list = course_data.pop("syllabus")
        course = Course.objects.create(**course_data)
        
        # Link course to institutes
        for inst in inst_objs.values():
            course.institutes.add(inst)

        # Create syllabus modules
        for idx, module_title in enumerate(syllabus_list):
            SyllabusModule.objects.create(
                course=course,
                module_number=idx + 1,
                title=module_title,
                content="Comprehensive handbook notes, sandbox exercises, and live QA projects."
            )

    print("Creating reviews...")
    Review.objects.create(
        student_name="Aditya Rane",
        institute=inst_objs["sevenmentor"],
        course_name="Automation Testing Masterclass",
        rating=5,
        comment="Outstanding lab sessions and corporate trainers. Highly recommend for QA switchers!"
    )
    Review.objects.create(
        student_name="Priyanka Joshi",
        institute=inst_objs["qspiders"],
        course_name="Selenium WebDriver Certification",
        rating=5,
        comment="The placement drives here are unmatched. I got an offer within 20 days."
    )

    print("Creating blogs...")
    Blog.objects.create(
        id_name="selenium-v4-features",
        title="Key Features of Selenium v4 Every Tester Must Know",
        category="Selenium",
        excerpt="Selenium 4 introduces relative locators and direct CDP integrations. Learn how to leverage them.",
        content="Selenium 4 has brought major architectural updates, including W3C Standardization which ensures direct communication with web browsers without using JSON Wire Protocol.",
        date="2026-05-15",
        read_time="5 Min Read",
        author="Kunal Deshmukh",
        image_url="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80"
    )

    print("Seeding completed successfully!")

if __name__ == '__main__':
    seed()
