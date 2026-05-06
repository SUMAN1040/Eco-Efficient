from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    def _create_user(self, email, password=None, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'ADMIN')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

class User(AbstractUser):
    class Role(models.TextChoices):
        USER = "USER", _("User")
        ADMIN = "ADMIN", _("Admin")
        PARTNER = "PARTNER", _("Partner")

    username = None
    email = models.EmailField(_('email address'), unique=True)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.USER)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return f"{self.email} ({self.role})"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile')
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    city = models.CharField(max_length=100)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    
    def __str__(self):
        return self.name

class AdminProfile(models.Model):
    class Status(models.TextChoices):
        PENDING = "PENDING", _("Pending")
        APPROVED = "APPROVED", _("Approved")
        REJECTED = "REJECTED", _("Rejected")

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='admin_profile')
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    admin_id = models.CharField(max_length=50, unique=True, blank=True, null=True)
    organization_name = models.CharField(max_length=255, blank=True, null=True)
    license_document = models.FileField(upload_to='admin_licenses/', blank=True, null=True)
    gstin_document = models.FileField(upload_to='admin_gstin/', blank=True, null=True)
    auth_letter_document = models.FileField(upload_to='admin_auth_letters/', blank=True, null=True)
    
    def __str__(self):
        return f"Admin: {self.admin_id}"

class PartnerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='partner_profile')
    partner_id = models.CharField(max_length=50, unique=True, blank=True, null=True)
    organization_name = models.CharField(max_length=255, blank=True, null=True)
    license_document = models.FileField(upload_to='partner_licenses/', blank=True, null=True)
    gstin_document = models.FileField(upload_to='partner_gstin/', blank=True, null=True)
    auth_letter_document = models.FileField(upload_to='partner_auth_letters/', blank=True, null=True)
    
    def __str__(self):
        return f"Partner: {self.partner_id}"

class EmailOTP(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.email} - {self.otp}"
