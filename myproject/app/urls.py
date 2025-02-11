from django.urls import path
from .views import (
    home, contact, about, login_view, menu, 
    search_exhibits, save_exhibit, saved_exhibits, exhibit_suggestions
)

urlpatterns = [
    path('', home, name='home'),
    path('contact/', contact, name='contact'),
    path('about/', about, name='about'),
    path('login/', login_view, name='login'),
    path('menu/', menu, name='menu'),

    # Newly Added Routes
    path('search/', search_exhibits, name='search_exhibits'),
    path('save/<int:exhibit_id>/', save_exhibit, name='save_exhibit'),
    path('saved/', saved_exhibits, name='saved_exhibits'),
    path('suggestions/', exhibit_suggestions, name='exhibit_suggestions'),
]
