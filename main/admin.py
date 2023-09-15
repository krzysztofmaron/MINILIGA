from django.contrib import admin
from .models import League, Team, Player, Match

registerList = [League, Team, Player, Match]
admin.site.register(registerList)