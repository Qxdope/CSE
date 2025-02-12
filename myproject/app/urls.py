from django.urls import path
from . import views
from django.contrib.auth.views import LogoutView
from .views import (
    home, contact, about, login, menu, signup, login_view,
    search_exhibits, save_exhibit, saved_exhibits, exhibit_suggestions
)

urlpatterns = [
    path('', views.signup, name='signup'),
    path('contact/', contact, name='contact'),
    path('about/', about, name='about'),
    path('login/', views.login, name='login'),
    path('menu/', views.menu, name='menu'),
    path('signup/', views.signup, name='signup'),
    path('logout/', LogoutView.as_view(next_page='/'), name='logout'),


    # Newly Added Routes
    path('search/', search_exhibits, name='search_exhibits'),
    path('save/<int:exhibit_id>/', save_exhibit, name='save_exhibit'),
    path('saved/', saved_exhibits, name='saved_exhibits'),
    path('suggestions/', exhibit_suggestions, name='exhibit_suggestions'),
]
