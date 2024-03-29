import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **other_fields):
        
        if not email:
            raise ValueError('Users must have an email address')
        
        user = self.model(email=email, **other_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **other_fields):
        user = self.create_user(email, password, **other_fields)
        user.is_staff = True
        user.is_superuser = True
        
        user.save()
        return user


class MyUser(AbstractBaseUser, PermissionsMixin):
    fName = models.CharField(max_length=20, null=True, blank=True)
    lName = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(max_length=255, unique=True, blank=False, null=False)
    timestamp = models.DateTimeField(auto_now_add=True)


    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    
    
    USERNAME_FIELD = 'email'
    objects = CustomUserManager()
    
    def __str__(self):
        return self.email   
    
    
    
     
class Verification(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, blank=False, null=False)
    code = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    