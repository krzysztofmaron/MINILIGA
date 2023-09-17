const left = document.querySelector(".team-details-container");
const right = document.querySelector(".player-list-container");
const logo = document.querySelector(".header-logo-container");
const teams = document.querySelectorAll(".value-team-name");
if (window.screen.width < 1200) {
  right.style.transform = "translate(80%)";
  right.addEventListener("click", function () {
    right.style.transform = "translate(0)";
    left.style.transform = "translate(-80%)";
    left.classList.remove("shown");
    right.classList.add("shown");
  });
  left.addEventListener("click", function () {
    left.style.transform = "translate(0%)";
    right.style.transform = "translate(80%)";
    right.classList.remove("shown");
    left.classList.add("shown");
  });
}
logo.addEventListener("click", function () {
  location.href = "../";
});

let teamRawData = []
let teamMatchData = []

async function render_team_stats(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        teamRawData = [...data].sort((a, b) => a.league - b.league);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
async function render_match_stats(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        teamMatchData = [...data].sort((a, b) => a.matchdate - b.matchdate).reverse();
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

async function ranking() {
    const yellowSubtext = document.querySelector(".yellow.sub")
    const league = document.getElementById("team_league").innerHTML
    const teamname = document.getElementById("teamname").innerHTML
    
    if (teamRawData.length === 0) {
        await render_team_stats('/api/teams');
    }

    let teamData = teamRawData.filter((item) => item.league == league).sort((a,b) => a.points - b.points).reverse()
    const index = teamData.findIndex((element) => element.name == teamname)
    const rankingPosition = index + 1

    yellowSubtext.innerHTML = '(#'+rankingPosition+')'
}

ranking()




async function streak() {
   
    if (teamMatchData.length === 0) {
        await render_match_stats('/api/matches');
    }

    const teamname = document.getElementById("teamname").innerHTML
    const streakfield = document.getElementById("streak")
    let html = ''
    let count = 0
    for (const e of teamMatchData){
        if(e.team1_name === teamname){
            count++
            if(count > 5){
                break
            }
            if(e.team1score > e.team2score){
                const html2 = '<li class="streak__win">W</li>'
                html += html2
            }else if(e.team1score < e.team2score){
                const html2 = '<li class="streak__lose">L</li>'
                html += html2
            }else if(e.team1score == e.team2score){
                const html2 = '<li class="streak__draw">D</li>'
                html += html2
            }
        }else if(e.team2_name === teamname){
            count++
            if(count > 5){
                break
            }
            if(e.team2score > e.team1score){
                const html2 = '<li class="streak__win">W</li>'
                html += html2
            }else if(e.team2score < e.team1score){
                const html2 = '<li class="streak__lose">L</li>'
                html += html2
            }else if(e.team2score == e.team1score){
                const html2 = '<li class="streak__draw">D</li>'
                html += html2
            }
        }
        streakfield.innerHTML = html
    }
}

streak()