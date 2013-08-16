from django import forms
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

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

	def get_user(self):
		cd = self.cleaned_data
		username = cd['username']
		password = cd['password']
		cPassword = cd['confirmedPassword']
		lastName = cd['lastName']
		firstName = cd['firstName']
		user = User.objects.create_user(username, cd['email'], password)
		if lastName:
			user.last_name = lastName
		if firstName:
			user.first_name = firstName
		user.save()
		return authenticate(username= username, password=password)



class SigninForm(forms.Form):
	username = forms.CharField()
	password = forms.CharField(widget=forms.PasswordInput())
	def clean_password(self):
		password = self.cleaned_data['password']
		user = self.get_user()
		if(user is not None):
			if(not user.is_active):
				raise forms.ValidationError("User exists, but not active")
			return password
		else:
			raise forms.ValidationError("User not valid")

	def get_user(self):
		password = self.cleaned_data['password']
		username = self.cleaned_data['username']
		user = authenticate(username = username, password = password)
		return user



class CreateBookForm(forms.Form):
	title = forms.CharField(max_length=250)
	public = forms.BooleanField(required=False)
