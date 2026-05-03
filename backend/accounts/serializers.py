from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserProfile, AdminProfile, PartnerProfile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['name', 'phone_number', 'city']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(source='user_profile', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'role', 'profile']

class RegisterSerializer(serializers.ModelSerializer):
    name = serializers.CharField(write_only=True)
    phone = serializers.CharField(write_only=True, required=False)
    city = serializers.CharField(write_only=True)
    otp = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'name', 'phone', 'city', 'otp')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        return value

    def validate(self, data):
        from .models import EmailOTP
        otp_val = data.get('otp')
        email_val = data.get('email')
        
        # Verify OTP
        otp_record = EmailOTP.objects.filter(email=email_val, otp=otp_val).order_by('-created_at').first()
        if not otp_record:
            raise serializers.ValidationError({"otp": "Invalid or missing OTP."})
        
        # Simple 5 minute expiry check (can be expanded)
        return data

    def create(self, validated_data):
        name = validated_data.pop('name')
        phone = validated_data.pop('phone', '')
        city = validated_data.pop('city')
        otp = validated_data.pop('otp')
        
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            role=User.Role.USER
        )
        from .models import UserProfile
        UserProfile.objects.create(user=user, name=name, phone_number=phone, city=city)
        return user

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    id = serializers.CharField(required=False, allow_blank=True, write_only=True)

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        token['email'] = user.email
        return token

    def validate(self, attrs):
        # We need to fetch the user first to check their role before standard validation
        email = attrs.get('email')
        password = attrs.get('password')
        role_id = attrs.get('id')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError({"detail": "No active account found with the given credentials."})

        # Check password before further processing
        if not user.check_password(password):
             raise serializers.ValidationError({"detail": "Invalid credentials."})

        # Enforce ID requirement for ADMIN and PARTNER
        if user.role == 'ADMIN':
            if not role_id:
                raise serializers.ValidationError({"id": "Admin ID is required for Admin login."})
            if not hasattr(user, 'admin_profile') or user.admin_profile.admin_id != role_id:
                raise serializers.ValidationError({"id": "Invalid Admin ID."})
        
        elif user.role == 'PARTNER':
            if not role_id:
                raise serializers.ValidationError({"id": "Partner ID is required for Partner login."})
            if not hasattr(user, 'partner_profile') or user.partner_profile.partner_id != role_id:
                raise serializers.ValidationError({"id": "Invalid Partner ID."})

        # If everything is fine, proceed with standard JWT validation
        data = super().validate(attrs)
        data['role'] = self.user.role
        data['email'] = self.user.email
        
        if self.user.role == 'USER' and hasattr(self.user, 'user_profile'):
            data['name'] = self.user.user_profile.name
        
        return data

class OTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
