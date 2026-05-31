from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import Institute, UserProfile

class SanityAPITestCase(APITestCase):

    def setUp(self):
        # Create a mock institute
        self.inst = Institute.objects.create(
            id_name="testmentor",
            name="Test Mentor",
            logo="TM",
            description="Leading software testing institute mock testing description.",
            rating=4.8,
            placement_rate=90,
            students_trained=500,
            avg_package="4.5 LPA",
            highest_package="8.0 LPA",
            duration="3 Months",
            fees_range="₹15,000",
            locations=["Deccan"],
            phone="+91 99999 88888",
            email="test@mentor.com",
            hiring_partners=["TCS", "Infosys"]
        )

    def test_get_institutes_list(self):
        """Verify the institutes list endpoint is active and returns seeded items."""
        url = reverse('institute-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], "Test Mentor")

    def test_get_institute_details(self):
        """Verify reading a specific institute profile by lookup id_name."""
        url = reverse('institute-detail', kwargs={'id_name': 'testmentor'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['logo'], "TM")
