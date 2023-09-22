from rest_framework import serializers
from main.models import League, Team, Player, Match, Participation
class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = ['leagueID']

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'
    


class MatchSerializer(serializers.ModelSerializer):
    team1_name = serializers.CharField(source='team1.name', read_only=True)
    team2_name = serializers.CharField(source='team2.name', read_only=True)

    class Meta:
        model = Match
        fields = '__all__'

class ParticipationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participation
        fields = '__all__'
