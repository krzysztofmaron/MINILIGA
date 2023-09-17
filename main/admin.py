from django.contrib import admin
from .models import League, Team, Player, Match, Participation

registerList = [League, Team, Player, Match, Participation]
admin.site.register(registerList)