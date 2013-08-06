from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt

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

@csrf_exempt
def auth(request):
    userName = None
    passWord = None

    if(request.method == 'POST'):
	userName = request.POST['username']
	passWord = request.POST['password']

    if(userName and passWord):
	user = authenticate(username = userName, password = passWord)
	if(user is not None):
	   if(user.is_active):
	       print "User is valid authenticated and verified"
	       login(request, user)
	   else:
	       print "User exists, but not active"
	else:
	   print "User not valid"
    else:
	print "Please sign in again"

    return render(request, 'notes/signin.html') 
 
def createBook(request):
    return render(request, 'notes/create.html')

def about(request):
    return render(request, 'notes/about.html')

def contact(request):
    return render(request, 'notes/contact.html')

