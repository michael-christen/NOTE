from django import forms
from django.contrib.auth.models import User

class ContactForm(forms.Form):
	subject = forms.CharField()
	email = forms.EmailField(required=False)
	message = forms.CharField()

class RegisterForm(forms.Form):
	commonAttrs = {'class':'span6',}
	email = forms.EmailField()
	username = forms.CharField()
	password = forms.CharField(widget=forms.PasswordInput())
	confirmedPassword = forms.CharField(widget=forms.PasswordInput())
	firstName = forms.CharField(required=False)
	lastName = forms.CharField(required=False)
	def clean_confirmedPassword(self):
		confirmedPassword = self.cleaned_data['confirmedPassword']
		password = self.cleaned_data['password']
		if password != confirmedPassword:
			raise forms.ValidationError("Passwords don't match")
		return confirmedPassword
	def clean_username(self):
		username = self.cleaned_data['username']
		try:
			user = User.objects.get(username=username)
		except User.DoesNotExist:
			return username
		else:
			raise forms.ValidationError('Username already Exists')



class SigninForm(forms.Form):
	username = forms.CharField()
	password = forms.CharField(widget=forms.PasswordInput())

class CreateBookForm(forms.Form):
	title = forms.CharField(max_length=250)
	public = forms.BooleanField(required=False)
