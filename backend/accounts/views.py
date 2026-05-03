from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
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
