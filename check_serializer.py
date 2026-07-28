import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from accounts.serializers import MyTokenObtainPairSerializer
serializer = MyTokenObtainPairSerializer()
print("Serializer fields:", serializer.fields.keys())
