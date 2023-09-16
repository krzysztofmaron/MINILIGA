from django.contrib import admin
from .models import League, Team, Player, Match, MatchQueue

registerList = [League, Team, Player, Match, MatchQueue]
admin.site.register(registerList)