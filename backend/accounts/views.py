from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer, MyTokenObtainPairSerializer, OTPSerializer
from .models import EmailOTP, User, AdminProfile, UserProfile
import kickbox
from django.conf import settings
import random

class SendOTPView(APIView):
    def post(self, request):
        serializer = OTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            
            # Kickbox Verification (Only if key is set)
            api_key = getattr(settings, 'KICKBOX_API_KEY', None)
            if api_key and api_key != 'YOUR_KICKBOX_API_KEY_HERE':
                try:
                    client = kickbox.Client(api_key)
                    kb = client.kickbox()
                    response = kb.verify(email)
                    
                    if response.body.get('result') == 'undeliverable':
                        return Response({"email": ["The email address is invalid or undeliverable."]}, status=status.HTTP_400_BAD_REQUEST)
                    
                    if response.body.get('disposable'):
                        return Response({"email": ["Disposable email addresses are not allowed."]}, status=status.HTTP_400_BAD_REQUEST)
                except Exception as e:
                    # Log error but allow flow during development if API fails
                    print(f"Kickbox Error: {str(e)}")
            
            otp = str(random.randint(100000, 999999))
            EmailOTP.objects.create(email=email, otp=otp)
            
            # Send actual email
            from django.core.mail import send_mail
            from django.template.loader import render_to_string
            from django.utils.html import strip_tags
            
            subject = f'{otp} is your Eco-Efficient verification code'
            plain_message = f'Your verification code is: {otp}\n\nThis code will expire in 10 minutes.'
            html_message = render_to_string('accounts/otp_email.html', {'otp': otp})
            
            try:
                send_mail(
                    subject,
                    plain_message,
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=False,
                    html_message=html_message
                )
                return Response({"detail": "OTP sent successfully."}, status=status.HTTP_200_OK)
            except Exception as e:
                print(f"Email Error: {str(e)}")
                return Response({"detail": "Failed to send email. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "User registered successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = getattr(user, 'user_profile', None)
        
        data = {
            "email": user.email,
            "name": profile.name if profile else "",
            "phone_number": profile.phone_number if profile else "",
            "city": profile.city if profile else "",
            "avatar": request.build_absolute_uri(profile.avatar.url) if profile and profile.avatar else ""
        }
        return Response(data)

    def put(self, request):
        user = request.user
        profile = getattr(user, 'user_profile', None)
        
        data = request.data
        if not profile:
            from .models import UserProfile
            profile = UserProfile.objects.create(user=user, name=data.get('name', ''), phone_number=data.get('phone_number', ''), city=data.get('city', ''))
        else:
            if 'name' in data:
                profile.name = data['name']
            if 'phone_number' in data:
                profile.phone_number = data['phone_number']
            if 'city' in data:
                profile.city = data['city']
            
        if 'avatar' in request.FILES:
            profile.avatar = request.FILES['avatar']
            
        profile.save()

        # Update email if requested
        if 'email' in data and data['email'] != user.email:
            # Check if email is already taken
            from django.contrib.auth import get_user_model
            User = get_user_model()
            if User.objects.filter(email=data['email']).exclude(id=user.id).exists():
                return Response({"email": ["This email is already in use."]}, status=status.HTTP_400_BAD_REQUEST)
            
            # OTP Verification
            otp_val = data.get('otp')
            if not otp_val:
                return Response({"otp_required": True, "detail": "OTP is required to change email."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Verify OTP
            from .models import EmailOTP
            otp_record = EmailOTP.objects.filter(email=data['email'], otp=otp_val).order_by('-created_at').first()
            if not otp_record:
                return Response({"otp": ["Invalid or expired OTP."]}, status=status.HTTP_400_BAD_REQUEST)
                
            user.email = data['email']
            user.save()
            
        return Response({"detail": "Profile updated successfully."})


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        otp_val = request.data.get('otp')
        new_password = request.data.get('new_password')

        if not otp_val or not new_password:
            return Response({"detail": "OTP and new password are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Verify OTP
        from .models import EmailOTP
        otp_record = EmailOTP.objects.filter(email=user.email, otp=otp_val).order_by('-created_at').first()
        if not otp_record:
            return Response({"otp": ["Invalid or expired OTP."]}, status=status.HTTP_400_BAD_REQUEST)

        # Update password
        user.set_password(new_password)
        user.save()

        # Optionally delete the used OTP to prevent reuse
        otp_record.delete()

        return Response({"detail": "Password changed successfully."}, status=status.HTTP_200_OK)

class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        otp_val = request.data.get('otp')
        
        if not otp_val:
            return Response({"otp": ["OTP is required to delete the account."]}, status=status.HTTP_400_BAD_REQUEST)
            
        from .models import EmailOTP
        otp_record = EmailOTP.objects.filter(email=user.email, otp=otp_val).order_by('-created_at').first()
        
        if not otp_record:
            return Response({"otp": ["Invalid or expired OTP."]}, status=status.HTTP_400_BAD_REQUEST)
            
        # Delete OTP record
        otp_record.delete()
        
        # Delete user account and cascade all related data
        user.delete()
        
        return Response({"detail": "Account deleted successfully."}, status=status.HTTP_200_OK)

class VerifyOTPView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        otp_val = request.data.get('otp')

        if not otp_val:
            return Response({"detail": "OTP is required."}, status=status.HTTP_400_BAD_REQUEST)

        from .models import EmailOTP
        otp_record = EmailOTP.objects.filter(email=user.email, otp=otp_val).order_by('-created_at').first()
        if not otp_record:
            return Response({"otp": ["Invalid or expired OTP."]}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "OTP is valid."}, status=status.HTTP_200_OK)

from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import user_passes_test
from django.utils.decorators import method_decorator
from django.contrib import messages
from .models import User, AdminProfile, PartnerProfile
import uuid

def is_superuser(user):
    return user.is_authenticated and user.is_superuser

class SuperuserLoginView(APIView):
    def get(self, request):
        if is_superuser(request.user):
            return redirect('root-superuser-dashboard')
        return render(request, 'superuser_login.html')

    def post(self, request):
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        user = authenticate(request, email=email, password=password)
        if user is not None:
            if user.is_superuser:
                login(request, user)
                request.session.set_expiry(300) # 5 minutes strict expiry
                return redirect('root-superuser-dashboard')
            else:
                messages.error(request, "This account does not have superuser privileges.")
        else:
            messages.error(request, "Invalid email or password.")
            
        return render(request, 'superuser_login.html')

class SuperuserLogoutView(APIView):
    def get(self, request):
        from django.contrib.auth import logout
        logout(request)
        messages.success(request, "You have been securely logged out.")
        return redirect('superuser-login')

@method_decorator(user_passes_test(is_superuser), name='dispatch')
class SuperuserDashboardView(APIView):
    def get(self, request):
        # Refresh the 5-minute session on activity
        request.session.set_expiry(300)
        
        users = User.objects.filter(role=User.Role.USER)
        partners = User.objects.filter(role=User.Role.PARTNER)
        admins = User.objects.filter(role=User.Role.ADMIN, admin_profile__status=AdminProfile.Status.APPROVED)
        pending_admins = AdminProfile.objects.filter(status=AdminProfile.Status.PENDING)
        
        context = {
            'users': users,
            'partners': partners,
            'admins': admins,
            'pending_admins': pending_admins,
        }
        return render(request, 'superuser_dashboard.html', context)

@method_decorator(user_passes_test(is_superuser), name='dispatch')
class UpdateUserRoleView(APIView):
    def post(self, request, user_id):
        target_user = get_object_or_404(User, id=user_id)
        new_role = request.POST.get('new_role')
        
        if target_user.is_superuser:
            messages.error(request, "Cannot modify a superuser's role.")
            return redirect('superuser-dashboard')
            
        if new_role in dict(User.Role.choices):
            target_user.role = new_role
            target_user.save()
            
            # Create corresponding profiles if they don't exist
            if new_role == User.Role.ADMIN:
                import uuid
                AdminProfile.objects.get_or_create(
                    user=target_user,
                    defaults={'admin_id': f"ADM-{uuid.uuid4().hex[:8].upper()}", 'status': AdminProfile.Status.APPROVED}
                )
            elif new_role == User.Role.PARTNER:
                import uuid
                PartnerProfile.objects.get_or_create(
                    user=target_user,
                    defaults={'partner_id': f"PTR-{uuid.uuid4().hex[:8].upper()}"}
                )
                
            messages.success(request, f"Successfully updated {target_user.email} to {new_role}.")
        else:
            messages.error(request, "Invalid role selected.")
            
        return redirect('superuser-dashboard')

@method_decorator(user_passes_test(is_superuser), name='dispatch')
class ApproveAdminRequestView(APIView):
    def post(self, request, profile_id):
        profile = get_object_or_404(AdminProfile, id=profile_id)
        if profile.status != AdminProfile.Status.PENDING:
            messages.error(request, "Request is not pending.")
            return redirect('superuser-dashboard')
            
        generated_admin_id = request.POST.get('generated_admin_id')
        if not generated_admin_id:
            import uuid
            generated_admin_id = f"ADM-{uuid.uuid4().hex[:8].upper()}"
            
        profile.admin_id = generated_admin_id
        profile.status = AdminProfile.Status.APPROVED
        profile.save()
        
        profile.user.is_active = True
        profile.user.save()
        
        # Send Email
        from django.core.mail import send_mail
        from django.conf import settings
        
        subject = 'Admin Request Approved'
        message = f'Your request has been approved. Your Admin ID is {profile.admin_id}.'
        
        try:
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [profile.user.email])
        except Exception as e:
            print(f"Email error: {e}")
            
        messages.success(request, f"Admin request from {profile.user.email} approved.")
        return redirect('superuser-dashboard')

@method_decorator(user_passes_test(is_superuser), name='dispatch')
class RejectAdminRequestView(APIView):
    def post(self, request, profile_id):
        profile = get_object_or_404(AdminProfile, id=profile_id)
        if profile.status != AdminProfile.Status.PENDING:
            messages.error(request, "Request is not pending.")
            return redirect('superuser-dashboard')
            
        note = request.POST.get('rejection_note', '')
        user = profile.user
        
        # Send Rejection Email
        from django.core.mail import send_mail
        from django.conf import settings
        
        subject = 'Admin Request Update'
        message = f'We are sorry, your request has been rejected.\nReason: {note}'
        
        try:
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email])
        except Exception as e:
            print(f"Email error: {e}")
            
        # Delete user and profile so they can reapply
        user.delete()
        
        messages.success(request, f"Admin request from {user.email} rejected and deleted.")
        return redirect('superuser-dashboard')

@method_decorator(user_passes_test(is_superuser), name='dispatch')
class DeleteUserView(APIView):
    def post(self, request, user_id):
        target_user = get_object_or_404(User, id=user_id)
        if target_user.is_superuser:
            messages.error(request, "Cannot delete a superuser.")
            return redirect('superuser-dashboard')
            
        subject = request.POST.get('subject')
        content = request.POST.get('content')
        
        if not subject or not content:
            messages.error(request, "Subject and Content are required to delete a user.")
            return redirect('superuser-dashboard')
            
        from django.core.mail import send_mail
        from django.conf import settings
        
        email = target_user.email
        
        try:
            send_mail(subject, content, settings.DEFAULT_FROM_EMAIL, [email])
        except Exception as e:
            print(f"Email error during deletion: {e}")
            messages.warning(request, f"User deleted, but failed to send the notification email to {email}.")
            
        target_user.delete()
        messages.success(request, f"User {email} has been permanently deleted and notified.")
        return redirect('superuser-dashboard')

@method_decorator(user_passes_test(is_superuser), name='dispatch')
class SendEmailView(APIView):
    def post(self, request, user_id):
        target_user = get_object_or_404(User, id=user_id)
        subject = request.POST.get('subject')
        content = request.POST.get('content')
        
        if not subject or not content:
            messages.error(request, "Subject and Content are required to send an email.")
            return redirect('superuser-dashboard')
            
        from django.core.mail import send_mail
        from django.conf import settings
        
        try:
            send_mail(subject, content, settings.DEFAULT_FROM_EMAIL, [target_user.email])
            messages.success(request, f"Email sent successfully to {target_user.email}.")
        except Exception as e:
            print(f"Email error: {e}")
            messages.error(request, f"Failed to send email to {target_user.email}.")
            
        return redirect('superuser-dashboard')

class AdminRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        phone_number = request.data.get('phone_number')
        password = request.data.get('password')
        org_name = request.data.get('organization_name')
        city = request.data.get('city')
        license_doc = request.FILES.get('license_document')
        gstin_doc = request.FILES.get('gstin_document')
        auth_letter_doc = request.FILES.get('auth_letter_document')

        if not email or not password or not org_name or not city or not license_doc or not gstin_doc or not auth_letter_doc or not phone_number:
            return Response({"detail": "Please provide all required fields, including location, phone number, organization, and all documents."}, status=status.HTTP_400_BAD_REQUEST)
            
        if User.objects.filter(email=email).exists():
            return Response({"email": "by using this mail this already made request"}, status=status.HTTP_400_BAD_REQUEST)
            
        from .models import EmailOTP
        otp_record = EmailOTP.objects.filter(email=email, otp=otp).order_by('-created_at').first()
        if not otp_record:
            return Response({"otp": "Invalid or missing OTP."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create the User
            user = User.objects.create_user(email=email, password=password)
            user.role = User.Role.ADMIN
            user.is_active = False # Require approval
            user.save()

            # Create UserProfile
            UserProfile.objects.create(
                user=user,
                name=org_name,
                phone_number=phone_number,
                city=city
            )

            # Create AdminProfile (Pending by default)
            AdminProfile.objects.create(
                user=user,
                organization_name=org_name,
                license_document=license_doc,
                gstin_document=gstin_doc,
                auth_letter_document=auth_letter_doc
            )

            return Response({"detail": "Admin request submitted successfully."}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PartnerRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        org_name = request.data.get('organization_name')
        city = request.data.get('city')
        license_doc = request.FILES.get('license_document')
        gstin_doc = request.FILES.get('gstin_document')
        auth_letter_doc = request.FILES.get('auth_letter_document')

        if not email or not password or not org_name or not city or not license_doc or not gstin_doc or not auth_letter_doc:
            return Response({"detail": "Please provide all required fields, including location, organization, and all documents."}, status=status.HTTP_400_BAD_REQUEST)
            
        if User.objects.filter(email=email).exists():
            return Response({"email": "User with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create the User
            user = User.objects.create_user(email=email, password=password)
            user.role = User.Role.PARTNER
            user.save()

            # Create UserProfile
            UserProfile.objects.create(
                user=user,
                name=org_name,
                city=city
            )

            # Create PartnerProfile
            import uuid
            partner_id = f"PTN-{uuid.uuid4().hex[:8].upper()}"
            PartnerProfile.objects.create(
                user=user,
                partner_id=partner_id,
                organization_name=org_name,
                license_document=license_doc,
                gstin_document=gstin_doc,
                auth_letter_document=auth_letter_doc
            )

            return Response({"detail": "Partner request submitted successfully."}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)