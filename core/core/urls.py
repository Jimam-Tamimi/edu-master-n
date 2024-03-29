"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from core.settings import BASE_DIR


MEDIA_URL = '/media/'
MEDIA_ROOT=os.path.join(BASE_DIR, "media")
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('django-admin/', admin.site.urls),
    path("api/", include("home.urls")),
    path("api/account/", include("account.urls")),
    path("api/admin/", include("adminapp.urls")),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += staticfiles_urlpatterns()

urlpatterns += [re_path(r'^admin/.*', TemplateView.as_view(template_name='adminFrontend/index.html'))]
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='homeFrontend/index.html'))]
