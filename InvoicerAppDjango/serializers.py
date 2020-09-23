
from rest_framework import serializers
from django.conf import settings
from .models import (
    Client,
    Invoice,
    Profile,
    Item
)
        
from rest_framework_jwt.settings import api_settings

from django.contrib.auth.models import User
    


# USER SERIALIZER
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'id']


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ['email', 'last_name', 'first_name','username']




# AUTH TOKEN AND USER SERIALIZER
class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ['token', 'username', 'password', 'id', 'email', 'first_name', 'last_name']


# PROFILE SERIALIZERS

## user information 
class ProfileSerializer(serializers.ModelSerializer):
    class Meta :
        model = Profile
        fields = ['address', 'OIB', 'company_name', 'user', 'phone']

## user invoice settings
class InvoiceSettingsSerializer(serializers.ModelSerializer):
    class Meta :
        model = Profile
        fields = ['tax', 'currency', 'quantity']

#CLIENT SERIALIZER
class UserClientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields ='__all__'

# detail serilaizer
class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields =['first_name','last_name', 'OIB', 'email', 'company_name', 'phone', 'address']


#INVOICE SERIALIZER
class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'


#ITEMS SERIALIZER

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'