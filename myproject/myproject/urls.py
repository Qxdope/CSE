"""myproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import render 
from django.http import HttpResponse
from app import views, forms
import django.contrib.auth.views
from django.contrib.auth.views import LoginView, LogoutView
from datetime import datetime
admin.autodiscover()

def home(request):
    return render(request, 'menu.html')  # Ensure you have a 'home.html' template

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.signup, name='signup'),  # Root URL
    path('accounts/', include('accounts.urls')),  # Your accounts app URLs
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('menu/', views.menu, name='menu'),  # Add this line
    path('logout/', LogoutView.as_view(next_page='/'), name='logout'),
]
