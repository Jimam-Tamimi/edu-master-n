from django.urls import include, path
from rest_framework import routers 

from home.apis import *


router = routers.DefaultRouter()
router.register(r'tutors', TutorViewSets) 
router.register(r'subject', SubjectViewSets) 
router.register(r'curriculum', CurriculumViewSets) 
router.register(r'degrees', DegreeInformationSets) 

router.register(r'messages', MessageViewSets) 
router.register(r'trial-lessons', TrialLessonViewSets) 

urlpatterns = [
    # path("tutors/", "")
] + router.urls
