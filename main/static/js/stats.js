const logo = document.querySelector(".header-logo-container");

logo.addEventListener("click", function () {
  location.href = "../";
});


const tabs = document.querySelectorAll(".clear")
function color_remover(){
  tabs.forEach(e => {
    e.classList.remove("yellow-text")
  })
}

tabs.forEach(e => {
  e.addEventListener("click", function(){
    if(!e.classList.contains("yellow-text")){
      color_remover()
      e.classList.add("yellow-text")
    }
  })
})

let context = []
let mvpAsc = []              //działające posortowane tabele
let mvpDesc = []
let goalsAsc = []
let goalsDesc = []
let keeperPointsAsc = []
let keeperPointsDesc = []
let mvpMatchesAsc = []
let mvpMatchesDesc = []
let keeperMatchesAsc = []
let keeperMatchesDesc = []
let teamPointsAsc = []
let teamPointsDesc = []
let teamMatchesAsc = []
let teamMatchesDesc = []
let goalsMatchesAsc = []
let goalsMatchesDesc = []
let teamsJson = []


async function render_player_stats(url){
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
        // context = data

        mvpAsc = [...data].filter((item) => item.mvpPoints > 0).sort((a,b) => a.mvpPoints - b.mvpPoints)                  //działające posortowane tabele
        mvpDesc = [...mvpAsc].reverse()
        goalsAsc = [...data].filter((item) => item.goalsScored > 0).sort((a,b) => a.goalsScored - b.goalsScored)
        goalsDesc = [...goalsAsc].reverse()
        keeperPointsAsc = [...data].filter((item) => item.keeperPoints > 0).sort((a,b) => a.keeperPoints - b.keeperPoints)
        keeperPointsDesc = [...keeperPointsAsc].reverse()
        keeperMatchesAsc = [...data].filter((item) => item.keeperPoints > 0).sort((a,b) => a.matches - b.matches)
        keeperMatchesDesc = [...keeperMatchesAsc].reverse()
        mvpMatchesAsc = [...data].filter((item) => item.mvpPoints > 0).sort((a,b) => a.matches - b.matches)
        mvpMatchesDesc = [...mvpMatchesAsc].reverse()
        goalsMatchesAsc = [...data].filter((item) => item.goalsScored > 0).sort((a,b) => a.matches - b.matches)
        goalsMatchesDesc = [...goalsMatchesAsc].reverse()
        
        render_team_stats('/api/teams')
        
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });
}
async function render_team_stats(url){
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
        // context = data
        teamsJson = data
        teamPointsAsc = [...data].sort((a,b) => a.points - b.points || (a.goalsScored-a.goalsLost) - (b.goalsScored-b.goalsLost))
        teamPointsDesc = [...teamPointsAsc].reverse()
        teamMatchesAsc = [...data].sort((a,b) => a.matches - b.matches)
        teamMatchesDesc = [...teamMatchesAsc].reverse()
        render_page()
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });
}
render_player_stats('/api/players')


const filterbuttons = document.querySelectorAll(".sortbutton")
const arrow1 = document.getElementById("arrow1")
const arrow2 = document.getElementById("arrow2")
const sort1 = document.getElementById("sort1")

function color_remover2(){                      // YELLOW COLOR REMOVER
  filterbuttons.forEach(e => {
    e.classList.remove("yellow-text")
  })
}

filterbuttons.forEach(e => {                    // ZMIANA KOLORU PRZYCISKU FILTRU I KIERUNKU STRZAŁKI
  e.addEventListener("click", function(){
    if(e.classList.contains("yellow-text")){
      if(e.id == "sort1"){
        arrow1.classList.toggle("reversed")
      }else if(e.id == "sort2"){
        arrow2.classList.toggle("reversed")
      }
    }else if(!e.classList.contains("yellow-text")){
      if(e.id == "sort1"){
        color_remover2()
        e.classList.add("yellow-text")
        arrow1.classList.add("reversed")
      }else if(e.id == "sort2"){
        color_remover2()
        e.classList.add("yellow-text")
        arrow2.classList.add("reversed")
      }
    }
  })
})

tabs.forEach(e => {                             // ZMIANA TEKSTU PRZYCISKU FILTRU ZALEŻNIE OD ZAKŁADKI
  e.addEventListener("click", function(){
    if(e.innerHTML == "MVP"){
      sort1.innerHTML = "MVP"
    }else if(e.innerHTML == "STRZELCY"){
      sort1.innerHTML = "BRAMKI"
    }else if(e.innerHTML == "BRAMKARZE"){
      sort1.innerHTML = "ŚR.PKT."
    }else if(e.innerHTML == "TABELA"){
      sort1.innerHTML = "PUNKTY"
    }
  })
})



const arrows = document.querySelectorAll(".arrow")
const glassPanel = document.querySelectorAll(".glass-panel-content")
const filterLeagues = document.querySelectorAll(".filter")

filterLeagues.forEach(e => {
  e.addEventListener("click", function(){
    filterLeagues.forEach(e => {
      e.classList.remove("filter-active")
    })
    e.classList.add("filter-active")
  })
})


let innerhtml = ''
for (const e of mvpDesc.filter((item) => item.league == 1)) {
  const html2 = `
    <div class="values-container stats-values">
      <div class="stats-value__teamname">${e.name} ${e.surname}</div>
      <div class="stats-value-container">
            <span>${e.mvpPoints}</span>
            <span>${e.matches}</span>
      </div>
    </div>
    `
  innerhtml += html2
  }
glassPanel[0].innerHTML = innerhtml


function render_page(){
  const activePage = document.querySelectorAll(".clear.yellow-text")
  const activeFilterButton = document.querySelectorAll(".sortbutton.yellow-text")
  const activeLeagueButton = document.querySelectorAll(".filter-active")

  function generateTeamStatsHtml(data, reversed, league){
    let html = ''
    const filter = reversed ? data.filter((item) => item.league == league) : data.filter((item) => item.league == league)

    for (const e of filter) {
      const html2 = `
        <div class="values-container stats-values">
          <a href="../teams/${e.id}" class="stats-value__teamname" target="_blank">${e.name}</a>
          <div class="stats-value-container">
            <span>${e.points}</span>
            <span>${e.matches}</span>
          </div>
        </div>
      `;
      html += html2;
    }

    return html
  }

  function generatePlayerStatsHtml(data, reversed, league, type, matches){
    let html = ''

    const teams = teamsJson.filter((item) => item.league == league)
    let players = []
    for (const e of teams) {
      const filter = reversed ? data.filter((item) => item.team == e.id) : data.filter((item) => item.team == e.id)

      for (const player of filter) {
        console.log(player)
        if(type == "mvp"){
          const p = {
            id: player.id,
            name: player.name,
            surname: player.surname,
            role: player.role,
            mvpPoints: player.mvpPoints,
            matches: player.matches,
            team: player.team,
          }
          players.push(p)
        }else if(type == "goals"){
          const p = {
            id: player.id,
            name: player.name,
            surname: player.surname,
            role: player.role,
            goalsScored: player.goalsScored,
            matches: player.matches,
            team: player.team,
          }
          players.push(p)
        }else if(type == "kprs"){
          const p = {
            id: player.id,
            name: player.name,
            surname: player.surname,
            role: player.role,
            keeperPoints: (player.keeperPoints / player.matches).toFixed(1),
            matches: player.matches,
            team: player.team,
          }
          players.push(p)
        }
      }
    }
    let playersData = []
    if(type=="mvp"){
      if(matches){
        playersData = [...players].sort((a,b) => (reversed ? b.matches - a.matches : a.matches - b.matches))
      }else{
        playersData = [...players].sort((a,b) => (reversed ? b.mvpPoints - a.mvpPoints : a.mvpPoints - b.mvpPoints))
      }
    }else if(type=="goals"){
      if(matches){
        playersData = [...players].sort((a,b) => (reversed ? b.matches - a.matches : a.matches - b.matches))
      }else{
        playersData = [...players].sort((a,b) => (reversed ? b.goalsScored - a.goalsScored : a.goalsScored - b.goalsScored))
      }
    }else if(type=="kprs"){
      if(matches){
        playersData = [...players].sort((a,b) => (reversed ? b.matches - a.matches : a.matches - b.matches))
      }else{
        playersData = [...players].sort((a,b) => (reversed ? b.keeperPoints - a.keeperPoints : a.keeperPoints - b.keeperPoints))
      }
    }

    for (const e of playersData) {
      const html2 = `
        <div class="values-container stats-values">
          <div class="stats-value__teamname">${e.name} ${e.surname}</div>
          <div class="stats-value-container">
            <span>${e.mvpPoints || e.goalsScored || e.keeperPoints}</span>
            <span>${e.matches}</span>
          </div>
        </div>
      `;
      html += html2;
    }

    return html
  }

  if (activeLeagueButton[0].id == "f1") {
    if (activePage[0].innerHTML == "MVP") {
      if (activeFilterButton[0].innerHTML == "MVP") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow1.classList.contains("reversed") ? mvpDesc : mvpAsc, arrow1.classList.contains("reversed"), 1, "mvp");
      } else if (activeFilterButton[0].innerHTML == "MECZE") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow2.classList.contains("reversed") ? mvpMatchesDesc : mvpMatchesAsc, arrow2.classList.contains("reversed"), 1, "mvp", true);
      }
    } else if (activePage[0].innerHTML == "STRZELCY") {
      if (activeFilterButton[0].innerHTML == "BRAMKI") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow1.classList.contains("reversed") ? goalsDesc : goalsAsc, arrow1.classList.contains("reversed"), 1, "goals");
      } else if (activeFilterButton[0].innerHTML == "MECZE") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow2.classList.contains("reversed") ? goalsMatchesDesc : goalsMatchesAsc, arrow2.classList.contains("reversed"), 1, "goals", true);
      }
    } else if (activePage[0].innerHTML == "BRAMKARZE") {
      if (activeFilterButton[0].innerHTML == "ŚR.PKT.") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow1.classList.contains("reversed") ? keeperPointsDesc : keeperPointsAsc, arrow1.classList.contains("reversed"), 1, "kprs");
      } else if (activeFilterButton[0].innerHTML == "MECZE") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow2.classList.contains("reversed") ? keeperMatchesDesc : keeperMatchesAsc, arrow2.classList.contains("reversed"), 1, "kprs", true);
      }
    } else if (activePage[0].innerHTML == "TABELA") {
      if (activeFilterButton[0].innerHTML == "PUNKTY") {
        glassPanel[0].innerHTML = generateTeamStatsHtml(arrow1.classList.contains("reversed") ? teamPointsDesc : teamPointsAsc, arrow1.classList.contains("reversed"), 1);
      } else if (activeFilterButton[0].innerHTML == "MECZE") {
        glassPanel[0].innerHTML = generateTeamStatsHtml(arrow2.classList.contains("reversed") ? teamMatchesDesc : teamMatchesAsc, arrow2.classList.contains("reversed"), 1);
      }
    }
  }else if (activeLeagueButton[0].id == "f2") {
    if (activePage[0].innerHTML == "MVP") {
      if (activeFilterButton[0].innerHTML == "MVP") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow1.classList.contains("reversed") ? mvpDesc : mvpAsc, arrow1.classList.contains("reversed"), 2, "mvp");
      } else if (activeFilterButton[0].innerHTML == "MECZE") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow2.classList.contains("reversed") ? mvpMatchesDesc : mvpMatchesAsc, arrow2.classList.contains("reversed"), 2, "mvp", true);
      }
    } else if (activePage[0].innerHTML == "STRZELCY") {
      if (activeFilterButton[0].innerHTML == "BRAMKI") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow1.classList.contains("reversed") ? goalsDesc : goalsAsc, arrow1.classList.contains("reversed"), 2, "goals");
      } else if (activeFilterButton[0].innerHTML == "MECZE") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow2.classList.contains("reversed") ? goalsMatchesDesc : goalsMatchesAsc, arrow2.classList.contains("reversed"), 2, "goals", true);
      }
    } else if (activePage[0].innerHTML == "BRAMKARZE") {
      if (activeFilterButton[0].innerHTML == "ŚR.PKT.") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow1.classList.contains("reversed") ? keeperPointsDesc : keeperPointsAsc, arrow1.classList.contains("reversed"), 2, "kprs");
      } else if (activeFilterButton[0].innerHTML == "MECZE") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow2.classList.contains("reversed") ? keeperMatchesDesc : keeperMatchesAsc, arrow2.classList.contains("reversed"), 2, "kprs", true);
      }
    } else if (activePage[0].innerHTML == "TABELA") {
      if (activeFilterButton[0].innerHTML == "PUNKTY") {
        glassPanel[0].innerHTML = generateTeamStatsHtml(arrow1.classList.contains("reversed") ? teamPointsDesc : teamPointsAsc, arrow1.classList.contains("reversed"), 2);
      } else if (activeFilterButton[0].innerHTML == "MECZE") {
        glassPanel[0].innerHTML = generateTeamStatsHtml(arrow2.classList.contains("reversed") ? teamMatchesDesc : teamMatchesAsc, arrow2.classList.contains("reversed"), 2);
      }
    }
  }else if (activeLeagueButton[0].id == "f3") {
    if (activePage[0].innerHTML == "MVP") {
      if (activeFilterButton[0].innerHTML == "MVP") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow1.classList.contains("reversed") ? mvpDesc : mvpAsc, arrow1.classList.contains("reversed"), 3, "mvp");
      } else if (activeFilterButton[0].innerHTML == "MECZE") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow2.classList.contains("reversed") ? mvpMatchesDesc : mvpMatchesAsc, arrow2.classList.contains("reversed"), 3, "mvp", true);
      }
    } else if (activePage[0].innerHTML == "STRZELCY") {
      if (activeFilterButton[0].innerHTML == "BRAMKI") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow1.classList.contains("reversed") ? goalsDesc : goalsAsc, arrow1.classList.contains("reversed"), 3, "goals");
      } else if (activeFilterButton[0].innerHTML == "MECZE") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow2.classList.contains("reversed") ? goalsMatchesDesc : goalsMatchesAsc, arrow2.classList.contains("reversed"), 3, "goals", true);
      }
    } else if (activePage[0].innerHTML == "BRAMKARZE") {
      if (activeFilterButton[0].innerHTML == "ŚR.PKT.") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow1.classList.contains("reversed") ? keeperPointsDesc : keeperPointsAsc, arrow1.classList.contains("reversed"), 3, "kprs");
      } else if (activeFilterButton[0].innerHTML == "MECZE") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow2.classList.contains("reversed") ? keeperMatchesDesc : keeperMatchesAsc, arrow2.classList.contains("reversed"), 3, "kprs", true);
      }
    } else if (activePage[0].innerHTML == "TABELA") {
      if (activeFilterButton[0].innerHTML == "PUNKTY") {
        glassPanel[0].innerHTML = generateTeamStatsHtml(arrow1.classList.contains("reversed") ? teamPointsDesc : teamPointsAsc, arrow1.classList.contains("reversed"), 3);
      } else if (activeFilterButton[0].innerHTML == "MECZE") {
        glassPanel[0].innerHTML = generateTeamStatsHtml(arrow2.classList.contains("reversed") ? teamMatchesDesc : teamMatchesAsc, arrow2.classList.contains("reversed"), 3);
      }
    }
  }else if (activeLeagueButton[0].id == "f4") {
    if (activePage[0].innerHTML == "MVP") {
      if (activeFilterButton[0].innerHTML == "MVP") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow1.classList.contains("reversed") ? mvpDesc : mvpAsc, arrow1.classList.contains("reversed"), 4, "mvp");
      } else if (activeFilterButton[0].innerHTML == "MECZE") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow2.classList.contains("reversed") ? mvpMatchesDesc : mvpMatchesAsc, arrow2.classList.contains("reversed"), 4, "mvp", true);
      }
    } else if (activePage[0].innerHTML == "STRZELCY") {
      if (activeFilterButton[0].innerHTML == "BRAMKI") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow1.classList.contains("reversed") ? goalsDesc : goalsAsc, arrow1.classList.contains("reversed"), 4, "goals");
      } else if (activeFilterButton[0].innerHTML == "MECZE") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow2.classList.contains("reversed") ? goalsMatchesDesc : goalsMatchesAsc, arrow2.classList.contains("reversed"), 4, "goals", true);
      }
    } else if (activePage[0].innerHTML == "BRAMKARZE") {
      if (activeFilterButton[0].innerHTML == "ŚR.PKT.") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow1.classList.contains("reversed") ? keeperPointsDesc : keeperPointsAsc, arrow1.classList.contains("reversed"), 4, "kprs");
      } else if (activeFilterButton[0].innerHTML == "MECZE") {
        glassPanel[0].innerHTML = generatePlayerStatsHtml(arrow2.classList.contains("reversed") ? keeperMatchesDesc : keeperMatchesAsc, arrow2.classList.contains("reversed"), 4, "kprs", true);
      }
    } else if (activePage[0].innerHTML == "TABELA") {
      if (activeFilterButton[0].innerHTML == "PUNKTY") {
        glassPanel[0].innerHTML = generateTeamStatsHtml(arrow1.classList.contains("reversed") ? teamPointsDesc : teamPointsAsc, arrow1.classList.contains("reversed"), 4);
      } else if (activeFilterButton[0].innerHTML == "MECZE") {
        glassPanel[0].innerHTML = generateTeamStatsHtml(arrow2.classList.contains("reversed") ? teamMatchesDesc : teamMatchesAsc, arrow2.classList.contains("reversed"), 4);
      }
    }
  }
}
tabs.forEach(e => {
  e.addEventListener("click", function(){
    render_page()
  })
})
filterbuttons.forEach(e => {
  e.addEventListener("click", function(){
    render_page()
  })
})
filterLeagues.forEach(e => {
  e.addEventListener("click", function(){
    render_page()
  })
})


const filterBtn = document.querySelector('.glass-panel-filter')
const klocek = document.querySelector('.filter-bar')
const filterIcon = document.querySelector('.glass-panel-filter__icon')
let filterOnOff = false
filterBtn.addEventListener("click", function(){
  if(filterOnOff){
    filterIcon.classList.remove('rotated')
    klocek.style.display = 'none'
    filterOnOff = false
  }else{
    filterIcon.classList.add('rotated')
    klocek.style.display = 'flex'
    filterOnOff = true
  }
})

