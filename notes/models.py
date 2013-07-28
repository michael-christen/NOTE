from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
	#might have problem using models.user
	owner  = models.ForeignKey(User)
	#title  = models.ForeignKey(Idea, related_name='title')
	title  = models.IntegerField(null=True, default=None)
	public = models.BooleanField(default = False)
	creationTime = models.DateTimeField(auto_now_add=True)
	modifiedTime = models.DateTimeField(auto_now=True)
	def __unicode__(self):
	    return unicode(self.id)

#might be able to just use user supported restrictions
class BookPermission(models.Model):
	book = models.ForeignKey(Book)
	user = models.ForeignKey(User)
	writePerm = models.BooleanField(default=False)

class Idea(models.Model):
	#book = models.IntegerField(null = True, default = None)
	book = models.ForeignKey(Book)
	parent = models.IntegerField(null = True, default = None)
	childOrder = models.IntegerField(default=0)
	contentType = models.CharField(max_length=3, default='txt')
	content = models.CharField(max_length=250) 
	def __unicode__(self):
	    return self.content

class IdeaRelationship(models.Model):
	fromIdea = models.ForeignKey(Idea, related_name='from')
	toIdea   = models.ForeignKey(Idea, related_name='to')
	weight   = models.CharField(max_length=120)


