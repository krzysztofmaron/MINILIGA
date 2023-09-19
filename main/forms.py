from django import forms

class LoginForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'username-input', 'placeholder':'Enter your username'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'password-input', 'placeholder':'Enter your password'}))