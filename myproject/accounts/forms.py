from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import UserProfile  # Use your custom user model if you have one

class UserRegistrationForm(UserCreationForm):
    class Meta:
        model = UserProfile  # Replace with your custom user model
        fields = ['username', 'email', 'password1', 'password2']
