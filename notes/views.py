from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from .forms import ContactForm, SigninForm, RegisterForm

import datetime

def home(request):
    now = datetime.datetime.now()
    return render(request, 'notes/home.html', {'current_date': now})

@login_required(login_url='/authenticate')
def viewBooks(request):
    return render(request, 'notes/view.html',)
    
def loadBook(request, val):
    return render(request, 'notes/home.html', {'current_date': val})

@login_required(login_url='/authenticate')
def userInfo(request):
    return render(request, 'notes/user.html', {'user': request.user})

def meta(request):
    return render(request, 'notes/meta.html', {'data': request.META.items()})

def cont(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            return HttpResponse('thanks')
    else:
        form = ContactForm()
    return render(request, 'notes/contact_form.html', {'contactForm': form})


def signout(request):
    logout(request)
    return redirect('/');

def auth(request):
    if request.user.is_authenticated():
        return redirect('/accounts/profile')
    if request.method == 'POST':
        signinForm = SigninForm(request.POST)
        registerForm =  RegisterForm(request.POST)
        if 'signIn' in request.POST and signinForm.is_bound:
            print 'signInForm'
            if signinForm.is_valid():
                signinForm = signinForm.cleaned_data
                username = signinForm['username']
                password = signinForm['password']
                user = authenticate(username = username, password = password)
            	if(user is not None):
                    if(user.is_active):
                        print "User is valid authenticated and verified"
                        login(request, user)
                        return redirect('/accounts/profile')
                    else:
                        print "User exists, but not active"
                else:
                    print "User not valid"
            else:
            	print "Please sign in again"
        elif 'signUp' in request.POST and registerForm.is_bound:
            if registerForm.is_valid():
                registerForm = registerForm.cleaned_data
                username = registerForm['username']
                password = registerForm['password']
                cPassword = registerForm['confirmedPassword']
                lastName = registerForm['lastName']
                firstName = registerForm['firstName']
                if password == cPassword:
                    user = User.objects.create_user(username, registerForm['email'], password)
                    if lastName:
                        user.last_name = lastName
                    if firstName:
                        user.first_name = firstName
                    user.save()
                    user = authenticate(username= username, password=password)
                    login(request, user)
                    print "Well Done"
                    return redirect('/accounts/profile')
    signinForm = SigninForm()
    registerForm = RegisterForm()

    return render(request, 'notes/auth.html', {'registerForm' : registerForm, 'signinForm' : signinForm}) 
 
def createBook(request):
    return render(request, 'notes/create.html')

def about(request):
    return render(request, 'notes/about.html')

def contact(request):
    return render(request, 'notes/contact.html')

