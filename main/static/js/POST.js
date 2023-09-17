let checkbox = []



let teamPlayers = []
let teamNames = []
let matchesData = []

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

async function fetch_matches(url){
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
          matchesData = data.sort((a, b) => b.id - a.id)
      })
      .catch((error) => {
          console.error('Fetch error:', error);
      });
  }
fetch_matches('/api/matches')




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

    submitButton.addEventListener("click", function () {
      
    //get participation data
    let participationJsonData = []
    for(const e of teamPlayers){
        const checkbox = document.getElementById("match-" + e.id)
        if(checkbox.checked){
            const data = {
                player: e.id,
                mvpPoints: parseInt(document.getElementById("mvp-" + e.id).value),
                goalsScored: parseInt(document.getElementById("goals-" + e.id).value),
                keeperPoints: parseInt(document.getElementById("keepers-" + e.id).value),
                matches: 1,
            }
            participationJsonData.push(data)
        }
    }

    //get match data
    function findTeamIdByName(name){
        for(const e of teamNames){
            if(e.name === name){
                return e.id
            }
        }
    }
    const matchJsonData = {
        team1: findTeamIdByName(selectorLeft.value),
        team1score: parseInt(document.getElementById('left-score').value),
        team2: findTeamIdByName(selectorRight.value),
        team2score: parseInt(document.getElementById('right-score').value),
        matchdate: document.getElementById("match-date").value,

        accepted: false,
        participations: participationJsonData,
    }

    //sending POST request to matches api
    fetch('../api/create_match', {
        method: 'POST',
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
    })
    .catch(error => {
        console.error('Error:', error);
    });

        
    })
})