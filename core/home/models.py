from email.policy import default
from django.db import models

# Create your models here.



    
class Subject(models.Model):
    subject = models.CharField(max_length=20, null=False, blank=False, unique=True)
    class Meta: 
        ordering = ["-id"]
    
    
    def __str__(self):
        return f"{self.subject}"
    
class Curriculum(models.Model):
    curriculum = models.CharField(max_length=20, null=False, blank=False, unique=True)
    class Meta: 
        ordering = ["-id"]
    
    
class DegreeInformation(models.Model):
    degree_name = models.CharField(max_length=80, null=False, blank=False)
    university_name = models.CharField(max_length=80, null=False, blank=False)
    start_year = models.DateField()
    end_year = models.DateField()
    certificate = models.ImageField(null=False, blank=False) 
 
    

class Tutor(models.Model):
    fName = models.CharField(max_length=20, null=False, blank=False)
    lName = models.CharField(max_length=20, null=False, blank=False)
    gender = models.CharField(max_length=10, null=False, blank=False, choices=(("MALE","MALE"), ("FEMALE","FEMALE"), ("OTHER", "OTHER"), ))
    email = models.EmailField(max_length=200, null=False, blank=False, unique=True)

    profile_description = models.TextField()
    subjects = models.ManyToManyField(Subject)
    curriculum = models.ManyToManyField(Curriculum)
    
    degrees = models.ManyToManyField(DegreeInformation)
    
    years_of_experience = models.IntegerField(null=False, blank=False)
    location = models.JSONField(null=False, blank=False)
    location_name = models.CharField(null=False, blank=False, max_length=500, default="Location Name")

    profile_picture = models.ImageField(null=False, blank=False)
    

    is_verified = models.BooleanField(default=False)
    
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.fName} {self.lName}"

    class Meta: 
        ordering = ["-id"]
    
    
    

class UserMessage(models.Model):
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE,null=True, blank=True )
    title = models.CharField(max_length=200, null=False, blank=False)
    name = models.CharField(max_length=50, null=False, blank=False)
    
    email = models.EmailField(max_length=200, null=False, blank=False)
    number = models.CharField(max_length=50, null=False, blank=False)
    message = models.TextField(null=False, blank=False)    
    
    has_replied = models.BooleanField(default=False)
    
    
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta: 
        ordering = ["-id"]
    
    

    def __str__(self):
        return f"{self.title}"
    

class TrialLesson(models.Model):
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE,null=False, blank=False )
    email = models.EmailField(max_length=200, null=False, blank=False)
    date = models.DateField(null=False, blank=False)
    time = models.TimeField(null=False, blank=False)
    message = models.TextField(null=False, blank=False)    
    status = models.CharField(max_length=30, null=False, blank=False, default="REQUESTED", choices=(("REQUESTED","REQUESTED"), ("IN_PROGRESS","IN_PROGRESS"), ("COMPLETED", "COMPLETED"), ))
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta: 
        ordering = ["-id"]
    
    
    
    def __str__(self):
        return f"{self.email}"
    
    
    