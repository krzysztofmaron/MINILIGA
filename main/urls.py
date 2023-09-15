from django.urls import path

from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("teams", views.teams, name="teams"),
    path("statistics", views.statistics, name="statistics"),
    path("matches", views.matches, name="matches"),
    path("teams/<int:id>", views.teamOverview, name="teamOverview"),
    path("db-add/token=19PBJD6tst3RJqY", views.adding, name="adding"),

    path("api/teams", views.team_list, name="team_list"),
    path("api/players", views.player_list, name="player_list"),
    path("api/matches", views.match_list, name="match_list"),
    
    path('api/update_players', views.update_players, name='update_players'),
    path('api/update_teams', views.update_teams, name='update_teams'),
    path('api/create_match', views.create_match, name='create_match'),
]