from rest_framework import serializers
from main.models import League, Team, Player, Match

class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = ['leagueID']

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):
    league = serializers.SerializerMethodField()

    class Meta:
        model = Player
        fields = '__all__'
    
    def get_league(self, obj):
        return obj.team.league.leagueID

class MatchSerializer(serializers.ModelSerializer):
    team1_name = serializers.CharField(source='team1.name', read_only=True)
    team2_name = serializers.CharField(source='team2.name', read_only=True)

    class Meta:
        model = Match
        fields = ['team1_name','team1score','team2_name','team2score','matchdate']