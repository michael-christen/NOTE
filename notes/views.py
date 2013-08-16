from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .forms import ContactForm, SigninForm, RegisterForm, CreateBookForm

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

    fwdLink = None
    if request.method == 'GET':
        if 'next' in request.GET:
            fwdLink = request.GET['next']

    elif request.method == 'POST':
        signinForm = SigninForm(request.POST)
        registerForm =  RegisterForm(request.POST)
        if 'next' in request.POST:
            fwdLink = request.POST['next']

        if 'signIn' in request.POST and signinForm.is_bound:
            if signinForm.is_valid():
                login(request, signinForm.get_user())
                if fwdLink:
                    return redirect(fwdLink)
                else:
                    return redirect('/accounts/profile')
            else:
                return render(request, 'notes/auth.html', {
                    'registerForm': RegisterForm(), 
                    'signinForm' : signinForm,
                    'next' : fwdLink
                })

        elif 'signUp' in request.POST and registerForm.is_bound:
            if registerForm.is_valid():
                login(request, registerForm.get_user)
                if fwdLink:
                    return redirect(fwdLink)
                else:
                    return redirect('/accounts/profile')
            else:
                return render(request, 'notes/auth.html', {
                    'registerForm': registerForm, 
                    'signinForm' : SigninForm(),
                    'next' : fwdLink
                })

    return render(request, 'notes/auth.html', {
        'registerForm' : RegisterForm(), 
        'signinForm' : SigninForm(),
        'next' : fwdLink
    })

def createBook(request):
    if request.method == 'POST':
        form = CreateBookForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            title = cd['title']
            public = cd['public']
            print 'title', title
            print 'public', public
        else:
            print 'form invalid'

    return render(request, 'notes/create.html')

def about(request):
    return render(request, 'notes/about.html')

def contact(request):
    return render(request, 'notes/contact.html')

