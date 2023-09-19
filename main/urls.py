from django.urls import path
from django.contrib.auth.decorators import login_required

from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("teams", views.teams, name="teams"),
    path("statistics", views.statistics, name="statistics"),
    path("matches", views.matches, name="matches"),
    path("teams/<int:id>", views.teamOverview, name="teamOverview"),
    path("approve", login_required(views.approve), name="approve"),
    path("adding", login_required(views.adding), name="adding"),

    path("api/teams", views.team_list, name="team_list"),
    path("api/players", views.player_list, name="player_list"),
    path("api/matches", views.match_list, name="match_list"),
    path("api/participation", views.participation_list, name="participation_list"),
    
    path('api/update_players', views.update_players, name='update_players'),
    path('api/update_teams', views.update_teams, name='update_teams'),
    path('api/update_match', views.update_match, name='update_match'),
    path('api/create_match', views.create_match, name='create_match'),
    # path('api/create_participation', views.create_participation, name='create_participation'),

    path('api/delete_participation', views.delete_participation, name='delete_participation'),
    path('api/delete_match', views.delete_match, name='delete_match'),

    path('login/', views.login_page, name="login_page")
]