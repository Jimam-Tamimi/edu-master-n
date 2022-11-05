from django.urls import include, path
from rest_framework import routers 

from adminapp.apis import *


router = routers.DefaultRouter()
router.register(r'tutors', TutorViewSets) 
router.register(r'messages', MessageViewSets) 
router.register(r'lessons', TrialLessonViewSets) 
router.register(r'subjects', SubjectViewSets) 
router.register(r'curriculums', CurriculumViewSets) 
# router.register(r'degrees', DegreeInformationSets) 

urlpatterns = [
    path("is-admin/", isAdmin),
    path("admin-stats/", adminStats),
] + router.urls
