from django.shortcuts import render, redirect, get_object_or_404 #added get_object_or_404

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpRequest
from django.template import RequestContext
from datetime import datetime
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.db.models import Q #part3
from django.shortcuts import render, redirect
from .forms import UserForm
from .models import Exhibit, SavedExhibit #part3

# Home Page View
def home(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    if request.user.is_authenticated:
        return(redirect('/menu'))
    else:
        return render(
            request,
            'signup.html',
            {
                'title':'Home Page',
                'year': datetime.now().year,
            }
        )

# Contact Page View
def contact(request):
    """Renders the contact page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/contact.html',
        {
            'title':'Contact',
            'message':'Dr. Yeoh.',
            'year':datetime.now().year,
        }
    )

# About Page View
def about(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/about.html',
        {
            'title':'ABC System',
            'message':'This application processes ...',
            'year':datetime.now().year,
        }
    )

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return redirect('menu')  # Redirect to the menu page
        else:
            # Handle invalid login
            return render(request, 'login.html', {'error': 'Invalid username or password'})
    return render(request, 'login.html')

# User Login View
def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('menu')  # Redirect to the menu page
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

# ============================
# NEWLY ADDED FEATURES (PART 3)
# ============================

# Search Exhibits View
def search_exhibits(request):
    query = request.GET.get('q')
    exhibits = Exhibit.objects.all()
    
    if query:
        exhibits = exhibits.filter(
            Q(title__icontains=query) | 
            Q(description__icontains=query) | 
            Q(category__icontains=query)
        )

    return render(request, 'app/search_results.html', {'exhibits': exhibits, 'query': query})

# Save an Exhibit View
@login_required
def save_exhibit(request, exhibit_id):
    exhibit = get_object_or_404(Exhibit, id=exhibit_id)
    SavedExhibit.objects.get_or_create(user=request.user, exhibit=exhibit)
    return redirect('saved_exhibits')

# View Saved Exhibits
@login_required
def saved_exhibits(request):
    saved = SavedExhibit.objects.filter(user=request.user).select_related('exhibit')
    return render(request, 'app/saved_exhibits.html', {'saved_exhibits': saved})

# Exhibit Suggestions View
@login_required
def exhibit_suggestions(request):
    user_saved_exhibits = SavedExhibit.objects.filter(user=request.user)
    saved_categories = set(exhibit.exhibit.category for exhibit in user_saved_exhibits)
    
    suggested_exhibits = Exhibit.objects.filter(category__in=saved_categories).exclude(
        id__in=[exhibit.exhibit.id for exhibit in user_saved_exhibits]
    )

    return render(request, 'app/exhibit_suggestions.html', {'suggested_exhibits': suggested_exhibits})

def signup(request):
    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            if User.objects.filter(username=username).exists():
                form.add_error('username', 'Username already exists')
            else:
                User.objects.create_user(username=username, password=password)
                return redirect('login')
    else:
        form = UserForm()
    return render(request, 'signup.html', {'form': form})

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return redirect('menu')  # Redirect to the menu page
        else:
            # Handle invalid login
            return render(request, 'login.html', {'error': 'Invalid username or password'})
    return render(request, 'login.html')

#main menu view
@login_required
def menu(request):
    users = User.objects.all()
    return render(request, 'menu.html', {'users': users})
