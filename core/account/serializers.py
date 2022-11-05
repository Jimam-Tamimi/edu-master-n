from django.db.models import fields
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.serializers import ModelSerializer, ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model


from account.models import *

User = get_user_model()


class UserSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    cpassword = serializers.CharField(required=True, write_only=True)
    class Meta:
        model = MyUser
        fields = [ "id", "email", "password", "cpassword", 'fName', 'lName']  
        
 
        
    
    def create(self, validated_data): 
        email = validated_data['email']
        password = validated_data['password']
        cpassword = validated_data['cpassword']
        fName  = validated_data.get('fName', None)
        lName  = validated_data.get('lName', None)
        print(validated_data)
        if email == '':
            raise ValidationError("Email is required")
        if(password != cpassword):
            raise ValidationError("Passwords do not match")
         
        if(len(password) < 4):
            raise ValidationError("Password must be at least 4 characters")

        if(not lName or not fName):
            raise ValidationError("names are required")
         
        user = MyUser.objects.create(email=email.lower(), fName=fName, lName=lName)
        user.set_password(password)
        user.save()
        return user
        
        
    