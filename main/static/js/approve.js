
let fetchData = []
let teamsData = []
let participationData = []
let teamPlayers = []

async function fetchAll(){
    function fetch_teams(url){
        fetch(url)
            .then((response) => {
                // Check if the request was successful
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();
            })
            .then((data) => {
                // context = data
                teamsData = data
                fetch_participations('../api/participation')
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }
    function fetch_participations(url){
        fetch(url)
            .then((response) => {
                // Check if the request was successful
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();
            })
            .then((data) => {
                // context = data
                participationData = data
                fetch_players('../api/players')
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }
    function fetch_players(url){
        fetch(url)
            .then((response) => {
                // Check if the request was successful
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();
            })
            .then((data) => {
                // context = data
                teamPlayers = data
                render(fetchData)
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }
    function fetch_matches(url){
        fetch(url)
            .then((response) => {
                // Check if the request was successful
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json();
            })
            .then((data) => {
                // context = data
                fetchData = data
                fetch_teams('../api/teams')
                // render(fetchData)
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    await fetch_matches('../api/matches')

}
fetchAll()


const contentBox = document.querySelector('.content')
  

function render(data){

    let count = 0
    for(const e of data.filter((item) => item.accepted === false)){
        count++
        const html2 = `
            <div class="match-container">
                <div class="arrow-btn" id="arrow-${count}"></div>
                <div data-match="${count}-${e.id}" class="match-data">
                    <div data-team1-id="${count}-${e.team1}" class="team-1-name">${e.team1_name}</div>
                    <div class="team-score">
                        <div data-team1-score="${count}-${e.team1score}" class="team-1-score">${e.team1score}</div>
                        <div class="colon">:</div>
                        <div data-team2-score="${count}-${e.team2score}" class="team-2-score">${e.team2score}</div>
                    </div>
                    <div data-team2-id="${count}-${e.team2}" class="team-2-name">${e.team2_name}</div>
                </div>
                <div class="buttons-container">
                    <div data-accept-button="${count}" class="approve-btn">APPROVE</div>
                    <div data-decline-button="${count}" class="decline-btn">DECLINE</div>
                </div>
            </div>
        `
        contentBox.innerHTML += html2

        let html4 = ''
        const activeMatch = data.filter((item) => item.id === e.id)
        for(const item of participationData.filter((item) => item.match === activeMatch[0].id)){
            const playerName = teamPlayers.find((player) => player.id === item.player).name
            const playerSurname = teamPlayers.find((player) => player.id === item.player).surname
            const playerTeamId = teamPlayers.find((player) => player.id === item.player).team
            const playerTeamName = teamsData.find((team) => team.id === playerTeamId).name
            html4 += `
            <div data-stats="${count}-${item.player}" class="player-stats">
                <div class="player-name">${playerName} ${playerSurname}</div>
                <div data-player-mvp="${count}-${item.player}" class="player-mvp">${item.mvpPoints}</div>
                <div data-player-goals="${count}-${item.player}" class="player-goals">${item.goalsScored}</div>
                <div data-player-keepers="${count}-${item.player}" class="player-keepers">${item.keeperPoints}</div>
                <div class="player-played">${playerTeamName}</div>
            </div>
            `
        }


        const html3 = `
            <div class="players-container hidden" id="pc-arrow-${count}">
                <nav>
                    <ul>
                        <li>Imię i Nazwisko</li>
                        <li>Mvp</li>
                        <li>Gole</li>
                        <li>Pkt. Br.</li>
                        <li>Drużyna</li>
                    </ul>
                </nav>
                ${html4}
            </div>
        `
        contentBox.innerHTML += html3

        addListeners()
    }
    const arrowBtns = document.querySelectorAll('.arrow-btn')

    arrowBtns.forEach(e => {
        e.addEventListener("click", function(){
            const activePlayersContainer = document.getElementById('pc-' + e.id)
            activePlayersContainer.classList.toggle('hidden')
            e.classList.toggle('rotated')

        })
    })
}


function addListeners(){
    const acceptBtns = document.querySelectorAll('.approve-btn')

    acceptBtns.forEach(e => {
        e.addEventListener("click", function(event){

            const dataset = event.target.dataset
            const clickedButton = dataset.acceptButton
            const matches = document.querySelectorAll('[data-match]')
            matches.forEach((element) => {
                const element2 = element.dataset.match
                const [countPart, matchID] = element2.split('-')
                if(countPart === clickedButton){
                    matchJsonData = {
                        id: matchID,
                        accepted: true,
                    }

                    let teamsJsonData = []
                    let team1ID = ''
                    let team2ID = ''
                    let team1Sc = ''
                    let team2Sc = ''
                    const team1s = document.querySelectorAll('[data-team1-id]')
                    const team2s = document.querySelectorAll('[data-team2-id]')
                    const score1 = document.querySelectorAll('[data-team1-score]')
                    const score2 = document.querySelectorAll('[data-team2-score]')
                    team1s.forEach((element) => {
                        const element2 = element.dataset.team1Id
                        const [countPart, teamID] = element2.split('-')
                        if(countPart == clickedButton){
                            team1ID = teamID
                        }
                    })
                    team2s.forEach((element) => {
                        const element2 = element.dataset.team2Id
                        const [countPart, teamID] = element2.split('-')
                        if(countPart == clickedButton){
                            team2ID = teamID
                        }
                    })
                    score1.forEach((element) => {
                        const element2 = element.dataset.team1Score
                        const [countPart, teamID] = element2.split('-')
                        if(countPart == clickedButton){
                            team1Sc = parseInt(element.innerHTML)
                        }
                    })
                    score2.forEach((element) => {
                        const element2 = element.dataset.team2Score
                        const [countPart, teamID] = element2.split('-')
                        if(countPart == clickedButton){
                            team2Sc = parseInt(element.innerHTML)
                        }
                    })

                    if(team1Sc > team2Sc){
                        const teamTempData1 = {
                            id: team1ID,
                            goalsScored: teamsData.find((item) => item.id == team1ID).goalsScored + parseInt(team1Sc),
                            goalsLost: teamsData.find((item) => item.id == team1ID).goalsLost + parseInt(team2Sc),
                            points: teamsData.find((item) => item.id == team1ID).points + 3,
                            matches: teamsData.find((item) => item.id == team1ID).matches + 1,
                        }
                        const teamTempData2 = {
                            id: team2ID,
                            goalsScored: teamsData.find((item) => item.id == team2ID).goalsScored + parseInt(team2Sc),
                            goalsLost: teamsData.find((item) => item.id == team2ID).goalsLost + parseInt(team1Sc),
                            matches: teamsData.find((item) => item.id == team2ID).matches + 1,
                        }
                        teamsJsonData.push(teamTempData1)
                        teamsJsonData.push(teamTempData2)
                    }else if(team1Sc < team2Sc){
                        const teamTempData1 = {
                            id: team1ID,
                            goalsScored: teamsData.find((item) => item.id == team1ID).goalsScored + parseInt(team1Sc),
                            goalsLost: teamsData.find((item) => item.id == team1ID).goalsLost + parseInt(team2Sc),
                            matches: teamsData.find((item) => item.id == team1ID).matches + 1,
                        }
                        const teamTempData2 = {
                            id: team2ID,
                            goalsScored: teamsData.find((item) => item.id == team2ID).goalsScored + parseInt(team2Sc),
                            goalsLost: teamsData.find((item) => item.id == team2ID).goalsLost + parseInt(team1Sc),
                            points: teamsData.find((item) => item.id == team2ID).points + 3,
                            matches: teamsData.find((item) => item.id == team2ID).matches + 1,
                        }
                        teamsJsonData.push(teamTempData1)
                        teamsJsonData.push(teamTempData2)
                    }else{
                        const teamTempData1 = {
                            id: team1ID,
                            goalsScored: teamsData.find((item) => item.id == team1ID).goalsScored + parseInt(team1Sc),
                            goalsLost: teamsData.find((item) => item.id == team1ID).goalsLost + parseInt(team2Sc),
                            points: teamsData.find((item) => item.id == team1ID).points + 1,
                            matches: teamsData.find((item) => item.id == team1ID).matches + 1,
                        }
                        const teamTempData2 = {
                            id: team2ID,
                            goalsScored: teamsData.find((item) => item.id == team2ID).goalsScored + parseInt(team2Sc),
                            goalsLost: teamsData.find((item) => item.id == team2ID).goalsLost + parseInt(team1Sc),
                            points: teamsData.find((item) => item.id == team2ID).points + 1,
                            matches: teamsData.find((item) => item.id == team2ID).matches + 1,
                        }
                        teamsJsonData.push(teamTempData1)
                        teamsJsonData.push(teamTempData2)
                    }

                    let playerJsonData = []

                    const playerstats = document.querySelectorAll('[data-stats]')
                    playerstats.forEach((element) => {
                        const element2 = element.dataset.stats
                        const [countPart, playerID] = element2.split('-')
                        if(countPart === clickedButton){
                            const playerMvpPoints = [...document.querySelectorAll('[data-player-mvp]')].find((item) => item.dataset.playerMvp == countPart+'-'+playerID)
                            const playerGoals = [...document.querySelectorAll('[data-player-goals]')].find((item) => item.dataset.playerGoals == countPart+'-'+playerID)
                            const playerKeepers = [...document.querySelectorAll('[data-player-keepers]')].find((item) => item.dataset.playerKeepers == countPart+'-'+playerID)
                            const tempData = {
                                id: playerID,
                                mvpPoints: teamPlayers.find((item) => item.id == playerID).mvpPoints + parseInt(playerMvpPoints.innerHTML),
                                goalsScored: teamPlayers.find((item) => item.id == playerID).goalsScored + parseInt(playerGoals.innerHTML),
                                keeperPoints: teamPlayers.find((item) => item.id == playerID).keeperPoints + parseInt(playerKeepers.innerHTML),
                                matches: teamPlayers.find((item) => item.id == playerID).matches + 1,
                            }
                            playerJsonData.push(tempData)
                        }
                        
                    })
                    function updatePlayersApi(url){
                        fetch(url, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(playerJsonData),
                        })
                        .then(response => {
                            if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('Response data:', data);
                            updateMatchApi('../api/update_match')
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    }
                    function updateMatchApi(url){
                        fetch(url, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(matchJsonData),
                        })
                        .then(response => {
                            if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('Response data:', data);
                            updateTeamsApi('../api/update_teams')
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    }
                    function updateTeamsApi(url){
                        fetch(url, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(teamsJsonData),
                        })
                        .then(response => {
                            if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('Response data:', data);
                            deleteParticiApi('../api/delete_participation')
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    }
                    function deleteParticiApi(url){
                        let participationDeleteList = []
                        let allParticipations = participationData.filter((item) => item.match == matchID)
                        allParticipations.forEach(e => {
                            const data = {
                                id: e.id,
                            }
                            participationDeleteList.push(data)
                        })
                        
                        fetch(url, {
                            method: 'DELETE',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(participationDeleteList),
                          })
                        .then(response => {
                            if (response.ok) {
                            console.log('Resources deleted successfully.');
                            document.querySelector('.content').innerHTML = '<p class="attention-txt">loading may take a brief moment depending on the amount of data, if you have problems refresh with CTRL + F5</p>'
                            fetchAll()
                            } else {
                            console.error('Failed to delete resources:', response.status);
                            // Handle the error, e.g., show an error message to the user.
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            // Handle any network errors here.
                        });
                    }
                    updatePlayersApi('../api/update_players')


                }
            })
        })
    })



    const rejectBtns = document.querySelectorAll('.decline-btn')

    rejectBtns.forEach(e => {
        e.addEventListener("click", function(event){

            const dataset = event.target.dataset
            const clickedButton = dataset.declineButton
            const matches = document.querySelectorAll('[data-match]')
            matches.forEach((element) => {
                const element2 = element.dataset.match
                const [countPart, matchID] = element2.split('-')
                if(countPart === clickedButton){
                    matchJsonData = {
                        id: matchID,
                    }

                    let participationDeleteList = []
                    let allParticipations = participationData.filter((item) => item.match == matchID)
                    allParticipations.forEach(e => {
                        const data = {
                            id: e.id,
                        }
                        participationDeleteList.push(data)
                    })
                    
                    function deleteParticipation(url){
                        fetch(url, {
                            method: 'DELETE',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(participationDeleteList),
                          })
                        .then(response => {
                            if (response.ok) {
                            console.log('Resources deleted successfully.');
                            deleteMatch('../api/delete_match')
                            } else {
                            console.error('Failed to delete resources:', response.status);
                            // Handle the error, e.g., show an error message to the user.
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            // Handle any network errors here.
                        });
                    }
                    deleteParticipation('../api/delete_participation')

                    function deleteMatch(url){
                        fetch(url, {
                            method: 'DELETE',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(matchJsonData),
                          })
                        .then(response => {
                            if (response.ok) {
                            console.log('Matches deleted successfully.');
                            document.querySelector('.content').innerHTML = '<p class="attention-txt">loading may take a brief moment depending on the amount of data, if you have problems refresh with CTRL + F5</p>'
                            fetchAll()
                            } else {
                            console.error('Failed to delete resources:', response.status);
                            // Handle the error, e.g., show an error message to the user.
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            // Handle any network errors here.
                        });
                    }
                    

                }
            })
        })
    })

}