from django.contrib import admin
from .models import League, Team, Player, Match, Participation


class PlayerAdmin(admin.ModelAdmin):
    list_display = ('league_id', 'name', 'surname', 'team')
    search_fields = ['league_id', 'name', 'surname', 'team__name']

class TeamAdmin(admin.ModelAdmin):
    list_display = ('league', 'name')
    search_fields = ['league__leagueID', 'name']

class ParticipationAdmin(admin.ModelAdmin):
    list_display = ('league_id', 'player', 'match')
    search_fields = ['league_id', 'player']

class MatchAdmin(admin.ModelAdmin):
    list_display = ('league_id', 'team1', 'team1score', 'team2score', 'team2', 'matchdate')
    search_fields = ['league_id', 'team1', 'team2', 'matchdate']


admin.site.register(Player, PlayerAdmin)
admin.site.register(Team, TeamAdmin)
admin.site.register(Participation, ParticipationAdmin)
admin.site.register(Match, MatchAdmin)
admin.site.register(League)