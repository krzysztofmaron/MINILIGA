from django.contrib import admin
from .models import League, Team, Player, Match, Participation


class PlayerAdmin(admin.ModelAdmin):
    list_display = ('name', 'surname', 'team')
    search_fields = ['name', 'surname', 'team__name']

class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'league')
    search_fields = ['name']

class ParticipationAdmin(admin.ModelAdmin):
    list_display = ('player', 'match')
    search_fields = ['player']

class MatchAdmin(admin.ModelAdmin):
    list_display = ('team1', 'team1score', 'team2score', 'team2', 'matchdate')
    search_fields = ['team1', 'team2', 'matchdate']


admin.site.register(Player, PlayerAdmin)
admin.site.register(Team, TeamAdmin)
admin.site.register(Participation, ParticipationAdmin)
admin.site.register(Match, MatchAdmin)
admin.site.register(League)