# MINILIGA		   miniliga.com.pl

### description
Project created for a football league from Cracow, the main point was to avoid multiple posts with match results, mess in statistics and start to keep everything in one place.
Making team captains able to add match statistics on their own was a priority so we created a system that allows to do so, then the matches go through moderation before being accepted.
Every statistic is then calculated on the fly, so running the website is limited to accepting the matches and/or making changes to them if needed.
We also plan on adding history to the website and then being able to display e.g. the top scorer from the previous season or the best team


### technologies used:
- Django
- JavaScript
- HTML, CSS <sup>obviously</sup>
- DjangoRestFramework
- PostgreSQL database
  - dj-database-url library for connecting the app to external database
- whitenoise library for static files
- gunicorn

### deployment information
Deployed entirely on **render.com** with separate **PostgreSQL database**.

> *Project shall be continued and available to use in the future.*

### creators
> I am myself a co-creator of the website responsible mainly for back-end layer i.e. django, js, api. I have made the whole design, had some part in front-end layer as well.
>

### functionality description
- the content of pages ***teams*** and ***statistics*** are dynamically generated with api in JavaScript using fetch functions, different content is generated based on sorting cryteria and league filters.
- the content of ***matches*** page is generated with a django templates ***for loop*** due to simplicity of the problem.

- adding matches creates instances of Participation (a model similar to Player model) for all players that participated in a match. Each has the information about statistics acquired in a specific match.
- adding matches also creates Match objects with `accepted = false` , the approve panel displays only unaccepted matches.

- approving a match results in that match changing the field to `accepted = true` and deleting all instances of Participation model related to that specific match.
- declining a match results in deleting the match entirely and all participations related to that match.

- both moderation panels require login for the access, allowing only `staff members to approve panel` and only `captains to adding panel`.


