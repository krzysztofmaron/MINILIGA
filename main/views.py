from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .models import Team, Player, Match, League, Participation
from api.serializers import LeagueSerializer, TeamSerializer, PlayerSerializer, MatchSerializer, ParticipationSerializer
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.decorators import login_required

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

def participation_list(request):
    participation = Participation.objects.all()
    serializer = ParticipationSerializer(participation, many=True)
    return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def create_match(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        # Create Match Object
        match = Match.objects.create(
            team1 = Team.objects.get(id = data['team1']),
            team2 = Team.objects.get(id = data['team2']),
            team1score = data['team1score'],
            team2score = data['team2score'],
            matchdate = data['matchdate'],
            accepted = data['accepted'],
        )
        

        # Create Participations
        participation_ids = []

        for element in data['participations']:
            participation = Participation.objects.create(
                match = match,
                player = Player.objects.get(id = element["player"]),

                mvpPoints = element["mvpPoints"],
                goalsScored = element["goalsScored"],
                keeperPoints = element["keeperPoints"],
                matches = element["matches"],
            )
            participation_ids.append(participation.id)
        return JsonResponse({'id': match.id, 'participation_ids': participation_ids})


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
                    if 'goalsScored' in team_data:
                        team.goalsScored = team_data['goalsScored']
                    if 'goalsLost' in team_data:
                        team.goalsLost = team_data['goalsLost']

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

@csrf_exempt
def update_match(request):
    if request.method == 'PATCH':
        try:
            data = json.loads(request.body.decode('utf-8'))
            print(data)

            match = Match.objects.get(id=data['id'])
            match.accepted = data['accepted']
           
            match.save()


            return JsonResponse({'message': 'Match information updated successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)   


@csrf_exempt
def delete_participation(request):
    if request.method == 'DELETE':
        try:
            data = json.loads(request.body.decode('utf-8'))
            for element in data:
                Participation.objects.get(id=element['id']).delete()

            return JsonResponse({'message': 'Items deleted successfully'}, status=204)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data in request body'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def delete_match(request):
    if request.method == 'DELETE':
        try:
            data = json.loads(request.body.decode('utf-8'))
            Match.objects.get(id=data['id']).delete()

            return JsonResponse({'message': 'Items deleted successfully'}, status=204)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data in request body'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

from .forms import LoginForm
from django.contrib.auth import authenticate, login

def adding(request):
    teams = Team.objects.all()
    players = Player.objects.all()
    matches = Match.objects.all()
    context = {
        "teams" : teams,
        "players" : players,
        "matches" : matches,
    }
    if is_captain(request.user) or request.user.is_staff:
        return render(request, "adding.html", context)
    else:
        return redirect("login_page")

def approve(request):
    if request.user.is_staff:
        return render(request, "approve.html")
    elif is_captain(request.user):
        return redirect("adding")
    else:
        return redirect("login_page")

def is_captain(user):
    return user.groups.filter(name='captain').exists()

def login_page(request):
    if request.method == 'POST':
        error_message = None


        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            print(username + password)
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                if request.user.is_staff:
                    print('you are staff')
                    return redirect('approve')
                # Redirect to the dashboard or any desired page
                elif is_captain(user):
                    print('you are captain')
                    return redirect('adding')
                else:
                    # Authentication failed
                    error_message = "Missing permissions."
            else:
                error_message = "Invalid login credentials."
        else:
            # Form is not valid
            error_message = "Form validation error. Please check your input."

    else:
        form = LoginForm()
        error_message = None

    return render(request, 'login.html', {'form': form, 'error_message': error_message})