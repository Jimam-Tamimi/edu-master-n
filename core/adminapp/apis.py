import contextlib
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, action
from adminapp.threads import SendEmail
from home.serializers import *
from rest_framework.viewsets import ModelViewSet
from home.models import *
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
User = get_user_model()

# Create your views here.


@api_view(['POST', 'GET'])
def isAdmin(request):
    if (request.user.is_authenticated and request.user.is_superuser):
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
def adminStats(request):
    if (request.user.is_authenticated and request.user.is_superuser):
        verifiedTutorsCount = Tutor.objects.filter(is_verified=True).count()
        loggedInStudentCount = User.objects.filter(is_superuser=False, is_staff=False).count()
        lessonsCompletedCount = TrialLesson.objects.filter(status="COMPLETED").count()

        resData = {
            'verifiedTutorsCount': verifiedTutorsCount, 
            'loggedInStudentCount': loggedInStudentCount, 
            'lessonsCompletedCount': lessonsCompletedCount
        }

        return Response(resData, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)


class TutorViewSets(ModelViewSet):
    queryset = Tutor.objects.all()
    serializer_class = TutorSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ["email", "fName", "gender", "id", "lName", "location", "profile_description", "profile_picture", "subjects__subject", "curriculum__curriculum", "timestamp", "years_of_experience", "is_verified"]
    filterset_fields = ['is_verified']

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        serialized_data = serializer.data

        return Response(convertTutorSerializedDataToResponseData(serialized_data))

    @action(detail=True, methods=['post'], url_path='verify')
    def verify(self, request, pk=None):
        tutor = self.get_object()
        tutor.is_verified = True
        tutor.save()
        SendEmail('Your profile in "TUTORS STREET" was verified.', """We have checked your request to join as a tutor at "TUTORS STREET". You are now a verified tutor at "TUTORS STREET". Thank You. """, [tutor.email]).start()
        
        return Response(convertTutorSerializedDataToResponseData(self.get_serializer(tutor).data), status=status.HTTP_202_ACCEPTED)

    @action(detail=True, methods=['post'], url_path='reject')
    def reject(self, request, pk=None):
        tutor = self.get_object()
        # if tutor.is_verified:
        #     return Response({"error_code": "unverify_to_reject", "error": "Unverify tutor to reject."},  status=status.HTTP_406_NOT_ACCEPTABLE)
        tutor.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

    @action(detail=True, methods=['post'], url_path='unverify')
    def unverify(self, request, pk=None):
        tutor = self.get_object()
        tutor.is_verified = False
        tutor.save()
        return Response(convertTutorSerializedDataToResponseData(self.get_serializer(tutor).data), status=status.HTTP_202_ACCEPTED)


class MessageViewSets(ModelViewSet):
    queryset = UserMessage.objects.all()
    serializer_class = MessageSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ["tutor__fName", "tutor__lName", "tutor__email", "email", "id", "message", "timestamp"]
    filterset_fields = ['has_replied']

    @action(detail=True, methods=['post'], url_path='reply')
    def reply(self, request, pk=None):
        message = self.get_object()
        SendEmail(request.data["subject"], request.data['message'], [message.email]).start()
        message.has_replied = True
        message.save()

        return Response(self.get_serializer(message).data, status=status.HTTP_202_ACCEPTED)


class TrialLessonViewSets(ModelViewSet):
    queryset = TrialLesson.objects.all()
    serializer_class = TrialLessonSerializer

    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ["tutor__fName", "tutor__lName", "tutor__email", "email", "status", "message"]
    filterset_fields = ['status']

    @action(detail=True, methods=['post'], url_path='change-status')
    def changeStatus(self, request, pk=None):
        lesson = self.get_object()
        lesson.status = request.data['status']
        lesson.save()

        return Response(self.get_serializer(lesson).data, status=status.HTTP_202_ACCEPTED)

    @action(detail=True, methods=['post'], url_path='reply')
    def reply(self, request, pk=None):
        lesson = self.get_object()
        SendEmail(request.data["subject"], request.data['message'], [lesson.email]).start()

        return Response(status=status.HTTP_202_ACCEPTED)


class CurriculumViewSets(ModelViewSet):
    queryset = Curriculum.objects.all()
    serializer_class = CurriculumSerializer


class SubjectViewSets(ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
