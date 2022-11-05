import contextlib
from json import loads
import json
from time import strftime
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from home.helpres import distance
from home.models import Subject
from home.serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from home.models import Tutor
from rest_framework.decorators import action
from django.utils.datastructures import MultiValueDictKeyError
from django.db import IntegrityError


# Create your views here.
class TutorViewSets(ModelViewSet):
    queryset = Tutor.objects.all()
    serializer_class = TutorSerializer 
    filter_backends = [SearchFilter]
    search_fields = ["email", "fName", "gender", "id", "lName", "location", "location_name", "profile_description", "profile_picture", "subjects__subject", "curriculum__curriculum", "timestamp", "years_of_experience", "is_verified"]
    # filterset_fields = ['is_verified', "subjects__subject"]

 

    
    
    def list(self, request, *args, **kwargs):
        print(self.get_queryset())
        q = self.get_queryset()
        q = self.filter_queryset(q)
        resList = [convertTutorSerializedDataToResponseData(self.get_serializer(ins).data) for ins in q]
        return Response(resList, status=status.HTTP_200_OK)
    
    
    
    def retrieve(self, request, *args, **kwargs):

        return Response(convertTutorSerializedDataToResponseData(self.get_serializer(self.get_object()).data), status=status.HTTP_200_OK)
    
    
    def create(self, request, *args, **kwargs):
        try:
            tutor = Tutor.objects.create(
                fName=request.data['fName'], 
                lName=request.data['lName'], 
                gender=request.data['gender'].upper(), 
                email=request.data['email'], 
                profile_description=request.data['profile_description'], 
                years_of_experience=request.data['years_of_experience'], 
                location=request.data['location'], 
                location_name=request.data['location_name'], 
                profile_picture=request.data['profile_picture'] ,
            )
            tutor.subjects.add(*request.data["subjects"].split(','))
            tutor.curriculum.add(*request.data["curriculum"].split(','))
            degrees = loads(request.data["degrees"])
            tutor.degrees.add(*degrees)
            tutor.save()
            return Response({"success": True}, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            if(str(e)=="UNIQUE constraint failed: home_tutor.email"):
                return Response({"error": "This email is already registered. Please try with a different email"}, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception  as e:
            return Response({"error": f"Something went wrong with {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
            
            
    
 

    @action(detail=False, methods=['get'], url_path='filter')
    def filter(self, request, pk=None):
        params = request.GET
        # print(params)
        q = self.queryset
        with contextlib.suppress(Exception):
            if(params['is_verified']):
                q =  q.filter(is_verified=bool(params['is_verified']))
        with contextlib.suppress(Exception):
            if(params['subject']):
                q =  q.filter(subjects__subject=params['subject'])

        with contextlib.suppress(Exception):
            if(params['curriculum']):
                q =  q.filter(curriculum__curriculum=params['curriculum'])

        q = self.filter_queryset(q)

        with contextlib.suppress(Exception):
            if params['years_of_experience']:
                nQ =  [instance for instance in q if (instance.years_of_experience >= int(params['years_of_experience']))]
                q = nQ


        # print(type(json.loads(params['location'])))
        # with contextlib.suppress(Exception):
        # try: 
        if (params['location'] and params['distance']):
            location = json.loads(params['location'])
            nQ = [ins for ins in q if ((int(params['distance']) >= distance(location, json.loads(ins.location))))]
            q = nQ
        # except Exception as e:
        #     print(e)   
                
        print(q)
        # print(self.queryset.filter(
        #     is_verified=bool(params['is_verified']), 
        #     subjects__subject=params['subject'],
        #     curriculum__curriculum=params['curriculum'],
        # ))
        resList = [convertTutorSerializedDataToResponseData(self.get_serializer(ins).data) for ins in q]

        return Response(resList, status=status.HTTP_202_ACCEPTED)
    
    

class SubjectViewSets(ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer 
    
class MessageViewSets(ModelViewSet):
    queryset = UserMessage.objects.all()
    serializer_class = MessageSerializer 
    def list(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def update(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def partial_update(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)    
    def retrieve(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        
class TrialLessonViewSets(ModelViewSet):
    queryset = TrialLesson.objects.all()
    serializer_class = TrialLessonSerializer 
    
class CurriculumViewSets(ModelViewSet):
    queryset = Curriculum.objects.all()
    serializer_class = CurriculumSerializer 

class DegreeInformationSets(ModelViewSet):
    queryset = DegreeInformation.objects.all()
    serializer_class = DegreeInformationSerializer 
