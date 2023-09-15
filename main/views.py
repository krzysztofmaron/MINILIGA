from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Team, Player, Match, League
from api.serializers import LeagueSerializer, TeamSerializer, PlayerSerializer, MatchSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
import json


def home(request):
    return render(request, "home.html")

def teams(request):
    teams = Team.objects.all
    return render(request, "teams.html", {"team": teams})

def statistics(request):
    teams = Team.objects.all

    playersMvpAsc = Player.objects.all().order_by('mvpPoints')
    playersMvpDesc = Player.objects.all().order_by('-mvpPoints')
    playersGoalsAsc = Player.objects.all().order_by('goalsScored')
    playersGoalsDesc = Player.objects.all().order_by('-goalsScored')
    playersKeeperAsc = Player.objects.all().order_by('keeperPoints')
    playersKeeperDesc = Player.objects.all().order_by('-keeperPoints')

    context = {
        "teams" : teams,
        "playersMvpAsc" : playersMvpAsc,
        "playersMvpDesc" : playersMvpDesc,
        "playersGoalsAsc": playersGoalsAsc,
        "playersGoalsDesc": playersGoalsDesc,
        "playersKeeperAsc": playersKeeperAsc,
        "playersKeeperDesc": playersKeeperDesc,
    }
    return render(request, "stats.html", context)

def matches(request):
    matches = Match.objects.all().order_by('-matchdate')
    return render(request, "matches.html", {"matches": matches})

def teamOverview(request, id):
    team = Team.objects.get(id=id)
    goalsdiff = team.goalsScored - team.goalsLost
    players = Player.objects.filter(team=team)
    return render(request, "teamOverview.html", 
                  {
                    "team": team,
                    "goalsdiff": goalsdiff,
                    "players": players,
                   })

def team_list(request):
    teams = Team.objects.all()
    serializer = TeamSerializer(teams, many=True)
    return JsonResponse(serializer.data, safe=False)

def player_list(request):
    players = Player.objects.all()
    serializer = PlayerSerializer(players, many=True)
    return JsonResponse(serializer.data, safe=False)

def match_list(request):
    matches = Match.objects.all().order_by('-matchdate')
    serializer = MatchSerializer(matches, many=True)
    return JsonResponse(serializer.data, safe=False)

def adding(request):
    teams = Team.objects.all()
    players = Player.objects.all()
    matches = Match.objects.all()

    context = {
        "teams" : teams,
        "players" : players,
        "matches" : matches,
    }
    return render(request, "adding.html", context)

@csrf_exempt
def create_match(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        match = Match.objects.create(
            team1=Team.objects.get(id = data['team1']),
            team2=Team.objects.get(id = data['team2']),
            team1score=data['team1score'],
            team2score=data['team2score'],
            matchdate=data['date'],
        )
        return JsonResponse({'id': match.id})
    
@csrf_exempt
def update_players(request):
    if request.method == 'PATCH':
        try:
            # Parse the request body as JSON
            data = json.loads(request.body.decode('utf-8'))
            print(data)

            for player_data in data:
                player_id = player_data['id']
                try:
                    # Retrieve the player by ID
                    player = Player.objects.get(id=player_id)

                    # Update the player's fields based on the JSON data
                    if 'mvpPoints' in player_data:
                        player.mvpPoints = player_data['mvpPoints']
                    if 'goalsScored' in player_data:
                        player.goalsScored = player_data['goalsScored']
                    if 'keeperPoints' in player_data:
                        player.keeperPoints = player_data['keeperPoints']
                    if 'matches' in player_data:
                        player.matches = player_data['matches']

                    # Save the updated player
                    player.save()
                except Player.DoesNotExist:
                    # Handle the case where a player with the specified ID doesn't exist
                    pass

            return JsonResponse({'message': 'Players information updated successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
@csrf_exempt
def update_teams(request):
    if request.method == 'PATCH':
        try:
            # Parse the request body as JSON
            data = json.loads(request.body.decode('utf-8'))
            print(data)

            for team_data in data:
                team_id = team_data['id']
                try:
                    # Retrieve the player by ID
                    team = Team.objects.get(id=team_id)

                    # Update the player's fields based on the JSON data
                    if 'points' in team_data:
                        team.points = team_data['points']
                    if 'matches' in team_data:
                        team.matches = team_data['matches']

                    # Save the updated player
                    team.save()
                except Team.DoesNotExist:
                    # Handle the case where a player with the specified ID doesn't exist
                    pass

            return JsonResponse({'message': 'Teams information updated successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)