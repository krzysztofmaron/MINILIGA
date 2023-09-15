let checkbox = []



let teamPlayers = []
let teamNames = []

async function fetch_teams(url){
    await fetch(url)
      .then((response) => {
          // Check if the request was successful
          if (!response.ok) {
          throw new Error('Network response was not ok');
          }
          // Parse the JSON response
          return response.json();
      })
      .then((data) => {
          teamNames = data
          renderLeftSelector()
          renderRightSelector()
      })
      .catch((error) => {
          console.error('Fetch error:', error);
      });
  }
fetch_teams('/api/teams')

async function fetch_players(url){
    await fetch(url)
      .then((response) => {
          // Check if the request was successful
          if (!response.ok) {
          throw new Error('Network response was not ok');
          }
          // Parse the JSON response
          return response.json();
      })
      .then((data) => {
          teamPlayers = data
          renderPlayerListLeft(1)
          renderPlayerListRight(1)
      })
      .catch((error) => {
          console.error('Fetch error:', error);
      });
  }
fetch_players('/api/players')

const selectorLeft = document.querySelector('.team_a')
const selectorRight = document.querySelector('.team_b')

function renderLeftSelector(){
        let html = '<option></option>'
        for (const e of teamNames){
            const html2=`
                <option>${e.name}</option>
            `
            html += html2
        }
        selectorLeft.innerHTML = html
}
function renderRightSelector(){
    let html = '<option></option>'
    for (const e of teamNames){
        const html2=`
            <option>${e.name}</option>
        `
        html += html2
    }
    selectorRight.innerHTML = html
}

const leftParentElement = document.querySelector('.left .players-list')
const rightParentElement = document.querySelector('.right .players-list')

function renderPlayerListLeft(id){
    let html = ''
    console.log(teamPlayers.filter((item) => item.team == id))
    let count = 0
    for (const e of teamPlayers.filter((item) => item.team == id)){
    const html2= ` 
        <div class="test-sample" id="${e.id}">
            <div class="display-name">${e.name} ${e.surname}</div>
            <div class="display-goals"><input disabled data-id="${count}" class="disable" type='number' min='0' value="0" id="goals-${e.id}"></input></div>
            <div class="display-keepers"><input disabled data-id="${count}" class="disable" type='number' min='0' value="0" id="keepers-${e.id}"></input></div>
            <div class="display-mvp"><input disabled data-id="${count}" class="disable" type='number' min='0' value="0" id="mvp-${e.id}"></input></div>
            <div class="display-played"><input data-id="${count}" type='checkbox' id="match-${e.id}"></input></div>
        </div>
    `
    html += html2
    count++
    }
    leftParentElement.innerHTML = html
}
function renderPlayerListRight(id){
    let html = ''
    console.log(teamPlayers.filter((item) => item.team == id))
    let count = 1000
    for (const e of teamPlayers.filter((item) => item.team == id)){
    const html2= ` 
        <div class="test-sample" id="${e.id}">
            <div class="display-name">${e.name} ${e.surname}</div>
            <div class="display-goals"><input disabled data-id="${count}" class="disable" type='number' min='0' value="0" id="goals-${e.id}"></input></div>
            <div class="display-keepers"><input disabled data-id="${count}" class="disable" type='number' min='0' value="0" id="keepers-${e.id}"></input></div>
            <div class="display-mvp"><input disabled data-id="${count}" class="disable" type='number' min='0' value="0" id="mvp-${e.id}"></input></div>
            <div class="display-played"><input data-id="${count}" type='checkbox' id="match-${e.id}"></input></div>
        </div>
    `
    html += html2
    count++
    }
    rightParentElement.innerHTML = html
}

function findTeamIdByName(teamname) {
    const team = teamNames.find(team => team.name === teamname);
    return team ? team.id : null; // Return the ID or null if not found
  }
selectorLeft.addEventListener('change', function(e){
    console.log( findTeamIdByName(e.target.value) )
    renderPlayerListLeft(findTeamIdByName(e.target.value))
    checkboxUpdate()

})
selectorRight.addEventListener('change', function(e){
    console.log( findTeamIdByName(e.target.value) )
    renderPlayerListRight(findTeamIdByName(e.target.value))
    checkboxUpdate()
})

function checkboxUpdate(){
    checkbox = document.querySelectorAll('input[type="checkbox"]')
    checkbox.forEach(e=> {
        e.addEventListener('click', function(){
            console.log(e)
            const disabled = document.querySelectorAll('.disable')
            if(e.checked) {
                disabled.forEach(input => {
                    if (input.dataset.id === e.dataset.id) {
                        input.setAttribute('enabled', '')
                        input.removeAttribute('disabled')
                    }
                })
            }else{
                disabled.forEach(input => {
                    if (input.dataset.id === e.dataset.id) {
                        input.setAttribute('disabled', '')
                        input.removeAttribute('enabled')
                        input.value='0'
                    }
                })
            }
        })
    })
}



document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.querySelector(".send-btn");

    submitButton.addEventListener("click", function (event) {
      
    // event.preventDefault()

      const team1ID = findTeamIdByName(document.getElementById("left-selector").value);
      const team2ID = findTeamIdByName(document.getElementById("right-selector").value);
      const team1score = document.getElementById("left-score").value
      const team2score = document.getElementById("right-score").value
      const matchDate = document.getElementById("match-date").value

      console.log(team1ID)
      console.log(team2ID)
      console.log(team1score)
      console.log(team2score)
      console.log(matchDate)
      
      let teamData = []
      if(team1score > team2score){
        const dataObject1 = {
            id: team1ID,
            points: teamNames.find(team => team.id == team1ID).points + 3,
            matches: teamNames.find(team => team.id == team1ID).matches + 1,
        }
        const dataObject2 = {
            id: team2ID,
            matches: teamNames.find(team => team.id == team2ID).matches + 1,
        }
        teamData.push(dataObject1)
        teamData.push(dataObject2)
      }else if(team1score < team2score){
        const dataObject1 = {
            id: team2ID,
            points: teamNames.find(team => team.id == team2ID).points + 3,
            matches: teamNames.find(team => team.id == team2ID).matches + 1,
        }
        const dataObject2 = {
            id: team1ID,
            matches: teamNames.find(team => team.id == team1ID).matches + 1,
        }
        teamData.push(dataObject1)
        teamData.push(dataObject2)
      }else{
        const dataObject1 = {
            id: team1ID,
            points: teamNames.find(team => team.id == team1ID).points + 1,
            matches: teamNames.find(team => team.id == team1ID).matches + 1,
        }
        const dataObject2 = {
            id: team2ID,
            points: teamNames.find(team => team.id == team2ID).points + 1,
            matches: teamNames.find(team => team.id == team2ID).matches + 1,
        }
        teamData.push(dataObject1)
        teamData.push(dataObject2)
      }

      // Create the match data
      const matchData = {
        team1: team1ID,
        team1score: team1score,
        team2: team2ID,
        team2score: team2score,
        date: matchDate,
      };

      // Create an array to store player data
      const elements = document.querySelectorAll(".test-sample")

      let ids = []
      for (const e of elements) {
        const id = e.id;
        if (id) {
            ids.push(id);
        }
      }
      console.log(ids)
      console.log(teamPlayers)

      let playerData = []

      for (const e of ids){
        const playerMatchCheckbox = document.getElementById(`match-${e}`)
        const playerMvpPoints = parseInt(teamPlayers.find(player => player.id == e).mvpPoints) + parseInt(document.getElementById(`mvp-${e}`).value)
        const playerGoals = parseInt(teamPlayers.find(player => player.id == e).goalsScored) + parseInt(document.getElementById(`goals-${e}`).value)
        const playerKeeperPoints = parseInt(teamPlayers.find(player => player.id == e).keeperPoints) + parseInt(document.getElementById(`keepers-${e}`).value)
        const playerMatches = parseInt(teamPlayers.find(player => player.id == e).matches)
        if (playerMatchCheckbox.checked){
            let dataObject = {
                id: e,
                mvpPoints: playerMvpPoints,
                goalsScored: playerGoals,
                keeperPoints: playerKeeperPoints,
                matches: playerMatches+1,
            }
            playerData.push(dataObject)
        }
      }
      console.log(playerData)

      // Send POST request to create a Match object
      fetch("../api/create_match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(matchData),
      })
        .then((response) => {
            if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((match) => {
          // Handle match creation success
          console.log("Match created:", match);
            
        })
        .catch((error) => {
          console.error("Error creating match:", error);
        });

        fetch(`../api/update_players`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerData),
            })
            .then(response => {
                if (response.ok) {
                    console.log('Player information updated successfully');
                } else {
                    console.error('Failed to update player information');
                }
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });

        fetch(`../api/update_teams`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teamData),
            })
            .then(response => {
                if (response.ok) {
                    console.log('Player information updated successfully');
                } else {
                    console.error('Failed to update player information');
                }
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });

        window.location.reload();
    });
  });