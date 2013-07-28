#from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
#from django.contrib.auth import authenticate, login
from notes.models import Book, Idea, BookPermission, IdeaRelationship
from django.core import serializers
import json

def getBook(request, bookNum):
    print 'hello1'
    if(request.is_ajax()):
	print 'hello2'
	book = Book.objects.get(pk=bookNum)
	ideaSet = book.idea_set.all()
	book_json = serializers.serialize('json',ideaSet)
	return HttpResponse(json.dumps(book_json),
	    content_type='application/json')
    else:
	return HttpResponse('Error')

