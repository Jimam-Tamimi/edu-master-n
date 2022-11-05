import contextlib
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.serializers import ModelSerializer, ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model


from account.models import *
from home.models import *

User = get_user_model()


class TutorSerializer(ModelSerializer):
    is_verified =  serializers.BooleanField(read_only=True, default=False)
    class Meta:
        model = Tutor
        fields = '__all__'
 
 
        
        



class SubjectSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'
    
class CurriculumSerializer(ModelSerializer):
    class Meta:
        model = Curriculum
        fields = '__all__'
    
class MessageSerializer(ModelSerializer):
    class Meta:
        model = UserMessage
        fields = '__all__'
    

class TrialLessonSerializer(ModelSerializer):
    class Meta:
        model = TrialLesson
        fields = '__all__'
    

class DegreeInformationSerializer(ModelSerializer):
    class Meta:
        model = DegreeInformation
        fields = '__all__'
    
    
    
def convertTutorSerializedDataToResponseData(serialized_data):
    tmpSubjects = []
    for sub in serialized_data['subjects']:
        with contextlib.suppress(Exception):
            subInstance = Subject.objects.get(id=sub)
            tmpSubjects.append(SubjectSerializer(subInstance).data)
    serialized_data["subjects"] = tmpSubjects
            

    tmpCurriculum = []
    for curr in serialized_data['curriculum']:
        with contextlib.suppress(Exception):
            currInstance = Curriculum.objects.get(id=curr)
            tmpCurriculum.append(CurriculumSerializer(currInstance).data)
    serialized_data["curriculum"] = tmpCurriculum
            
            
    tmpDegrees = []
    for deg in serialized_data['degrees']:
        with contextlib.suppress(Exception):
            degInstance = DegreeInformation.objects.get(id=deg)
            tmpDegrees.append(DegreeInformationSerializer(degInstance).data)
    serialized_data["degrees"] = tmpDegrees
    
    return serialized_data