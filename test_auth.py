import os
import django
import json

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from accounts.models import UserProfile, AdminProfile
from rest_framework.test import APIRequestFactory
from accounts.views import RegisterView, MyTokenObtainPairView

User = get_user_model()
factory = APIRequestFactory()

def test_registration():
    print("Testing Registration...")
    view = RegisterView.as_view()
    data = {
        "email": "testuser_new@example.com",
        "password": "testpassword123",
        "name": "Test User",
        "city": "Mumbai"
    }
    request = factory.post('/api/accounts/register/', data, format='json')
    response = view(request)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.data}")
    
    if response.status_code == 201:
        user = User.objects.get(email="testuser_new@example.com")
        print(f"User created: {user.email}, Role: {user.role}")
        profile = UserProfile.objects.get(user=user)
        print(f"Profile created: {profile.name}, City: {profile.city}")
    return response.status_code == 201

def test_login_user():
    print("\nTesting User Login (Standard)...")
    view = MyTokenObtainPairView.as_view()
    data = {
        "email": "testuser_new@example.com",
        "password": "testpassword123"
    }
    request = factory.post('/api/accounts/login/', data, format='json')
    response = view(request)
    print(f"Status Code: {response.status_code}")
    print(f"Role in Response: {response.data.get('role')}")
    return response.status_code == 200

def test_login_admin_id_requirement():
    print("\nTesting Admin Login ID Requirement...")
    # Create an admin user manually for testing
    admin_email = "admin_test@example.com"
    if not User.objects.filter(email=admin_email).exists():
        admin_user = User.objects.create_user(email=admin_email, password="adminpassword123", role='ADMIN')
        AdminProfile.objects.create(user=admin_user, admin_id="ADM001")
    
    view = MyTokenObtainPairView.as_view()
    
    # Attempt 1: Without ID (Should fail)
    print("Attempt 1: No ID")
    data_no_id = {"email": admin_email, "password": "adminpassword123"}
    request = factory.post('/api/accounts/login/', data_no_id, format='json')
    response = view(request)
    print(f"Status Code (expected fail): {response.status_code}, Error: {response.data.get('id')}")

    # Attempt 2: Correct ID (Should succeed)
    print("Attempt 2: Correct ID")
    data_with_id = {"email": admin_email, "password": "adminpassword123", "id": "ADM001"}
    request = factory.post('/api/accounts/login/', data_with_id, format='json')
    response = view(request)
    print(f"Status Code (expected success): {response.status_code}, Role: {response.data.get('role')}")
    
    return response.status_code == 200

if __name__ == "__main__":
    reg_ok = test_registration()
    if reg_ok:
        test_login_user()
    test_login_admin_id_requirement()
