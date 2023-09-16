from django.contrib import admin
from .models import League, Team, Player, Match, MatchQueue, TeamQueue, PlayerQueue

registerList = [League, Team, Player, Match, MatchQueue, TeamQueue, PlayerQueue]
admin.site.register(registerList)