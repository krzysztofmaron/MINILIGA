from django.db import models

class League(models.Model):
    leagueID = models.IntegerField(default=0)
    def __str__(self):
        return str(self.leagueID)

class Team(models.Model):
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    points = models.IntegerField(default=0)
    goalsScored = models.IntegerField(default=0)
    goalsLost = models.IntegerField(default=0)
    matches = models.IntegerField(default=0)
    def __str__(self):
        return str(self.name)

class Player(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    surname = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    goalsScored = models.IntegerField(default=0)
    mvpPoints = models.IntegerField(default=0)
    matches = models.IntegerField(default=0)
    keeperPoints = models.IntegerField(default=0)
    def __str__(self):
        return str(self.name +' '+ self.surname)
    
class Match(models.Model):
    team1 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="team1")
    team1score = models.IntegerField(default=0)
    team2 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="team2")
    team2score = models.IntegerField(default=0)
    matchdate = models.DateField()
    def __str__(self):
        return str(self.team1.name + ' vs ' + self.team2.name)

class MatchQueue(models.Model):
    team1 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="team1q")
    team1score = models.IntegerField(default=0)
    team2 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="team2q")
    team2score = models.IntegerField(default=0)
    matchdate = models.DateField()
    def __str__(self):
        return str(self.team1.name + ' vs ' + self.team2.name)