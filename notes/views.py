from django.http import HttpResponse
from django.shortcuts import render
import datetime

def home(request):
    now = datetime.datetime.now()
    return render(request, 'home.html', {'current_date': now})

def viewBook(request, val):
    return render(request, 'home.html', {'current_date': val})
