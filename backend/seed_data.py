import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from accounts.models import UserProfile, AdminProfile, PartnerProfile

User = get_user_model()

def seed():
    print("Clearing existing users (except admin@ecoefficient.com)...")
    User.objects.exclude(email='admin@ecoefficient.com').delete()

    print("Seeding Users...")
    
    # 1. Normal User
    user_email = "user@test.com"
    u = User.objects.create_user(email=user_email, password="password123", role='USER')
    UserProfile.objects.create(user=u, name="Test Regular User", city="Navi Mumbai")
    print(f"Created USER: {user_email}")

    # 2. Admin User
    admin_email = "admin@test.com"
    a = User.objects.create_user(email=admin_email, password="password123", role='ADMIN', is_staff=True)
    AdminProfile.objects.create(user=a, admin_id="ADM-1234-5678")
    print(f"Created ADMIN: {admin_email} (ID: ADM-1234-5678)")

    # 3. Partner User
    partner_email = "partner@test.com"
    p = User.objects.create_user(email=partner_email, password="password123", role='PARTNER')
    PartnerProfile.objects.create(user=p, partner_id="PRT-5678-9012", company_name="EcoPartners Ltd")
    print(f"Created PARTNER: {partner_email} (ID: PRT-5678-9012)")

    print("\nVerifying Data Separation:")
    print(f"UserProfile Count: {UserProfile.objects.count()}")
    print(f"AdminProfile Count: {AdminProfile.objects.count()}")
    print(f"PartnerProfile Count: {PartnerProfile.objects.count()}")

if __name__ == "__main__":
    seed()
