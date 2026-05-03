from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer, MyTokenObtainPairSerializer, OTPSerializer
from .models import EmailOTP
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
            html_message = render_to_string('accounts/otp_email.html', {'otp': otp})
            plain_message = strip_tags(html_message)
            
            try:
                send_mail(
                    subject,
                    plain_message,
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    html_message=html_message,
                    fail_silently=False,
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

