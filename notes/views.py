from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt

import datetime

def home(request):
    now = datetime.datetime.now()
    return render(request, 'home.html', {'current_date': now})

@login_required(login_url='/signin')
def viewBooks(request):
    return render(request, 'view.html',)
    
def loadBook(request, val):
    return render(request, 'home.html', {'current_date': val})

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

    return render(request, 'signin.html') 
 
def createBook(request):
    return render(request, 'create.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    return render(request, 'contact.html')
