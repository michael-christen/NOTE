from django import forms
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

class SigninForm(forms.Form):
	username = forms.CharField()
	password = forms.CharField(widget=forms.PasswordInput())
