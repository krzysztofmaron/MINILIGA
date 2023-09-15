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

        mvpAsc = [...data].sort((a,b) => a.mvpPoints - b.mvpPoints)                  //działające posortowane tabele
        mvpDesc = [...mvpAsc].reverse()
        goalsAsc = [...data].sort((a,b) => a.goalsScored - b.goalsScored)
        goalsDesc = [...goalsAsc].reverse()
        keeperPointsAsc = [...data].filter((item) => item.role === "BRAMKARZ").sort((a,b) => a.keeperPoints - b.keeperPoints)
        keeperPointsDesc = [...keeperPointsAsc].reverse()
        keeperMatchesAsc = [...data].filter((item) => item.role === "BRAMKARZ").sort((a,b) => a.matches - b.matches)
        keeperMatchesDesc = [...keeperMatchesAsc].reverse()
        mvpMatchesAsc = [...data].sort((a,b) => a.matches - b.matches)
        mvpMatchesDesc = [...mvpMatchesAsc].reverse()

        render_page()
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
        teamPointsAsc = [...data].sort((a,b) => a.points - b.points)
        teamPointsDesc = [...teamPointsAsc].reverse()
        teamMatchesAsc = [...data].sort((a,b) => a.matches - b.matches)
        teamMatchesDesc = [...teamMatchesAsc].reverse()
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });
}
render_player_stats('/api/players')
render_team_stats('/api/teams')

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
      sort1.innerHTML = "PKT.BR."
    }else if(e.innerHTML == "DRUŻYNY"){
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
  console.log(activeLeagueButton[0])

  if(activeLeagueButton[0].id == "f1"){
    if(activePage[0].innerHTML == "MVP"){
      if(activeFilterButton[0].innerHTML == "MVP"){
        if(arrow1.classList.contains("reversed")){
          console.log(mvpDesc)
          let html = ''
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
            html += html2
            console.log(html2)
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of mvpAsc.filter((item) => item.league == 1)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.mvpPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }else if(activeFilterButton[0].innerHTML == "MECZE"){
        if(arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of mvpMatchesDesc.filter((item) => item.league == 1)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.mvpPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of mvpMatchesAsc.filter((item) => item.league == 1)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.mvpPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }
    }else if(activePage[0].innerHTML == "STRZELCY"){
      if(activeFilterButton[0].innerHTML == "BRAMKI"){
        if(arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of goalsDesc.filter((item) => item.league == 1)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.goalsScored}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of goalsAsc.filter((item) => item.league == 1)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.goalsScored}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }else if(activeFilterButton[0].innerHTML == "MECZE"){
        if(arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of mvpMatchesDesc.filter((item) => item.league == 1)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.goalsScored}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of mvpMatchesAsc.filter((item) => item.league == 1)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.goalsScored}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }
    }else if(activePage[0].innerHTML == "BRAMKARZE"){
      if(activeFilterButton[0].innerHTML == "PKT.BR."){
        if(arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of keeperPointsDesc.filter((item) => item.league == 1)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.keeperPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of keeperPointsAsc.filter((item) => item.league == 1)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.keeperPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }else if(activeFilterButton[0].innerHTML == "MECZE"){
        if(arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of keeperMatchesDesc.filter((item) => item.league == 1)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.keeperPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of keeperMatchesAsc.filter((item) => item.league == 1)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.keeperPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }
    }else if(activePage[0].innerHTML == "DRUŻYNY"){
      if(activeFilterButton[0].innerHTML == "PUNKTY"){
        if(arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of teamPointsDesc.filter((item) => item.league == 1)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name}</div>
                <div class="stats-value-container">
                      <span>${e.points}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of teamPointsAsc.filter((item) => item.league == 1)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name}</div>
                <div class="stats-value-container">
                      <span>${e.points}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }else if(activeFilterButton[0].innerHTML == "MECZE"){
        if(arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of teamMatchesDesc.filter((item) => item.league == 1)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name}</div>
                <div class="stats-value-container">
                      <span>${e.points}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of teamMatchesAsc.filter((item) => item.league == 1)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name}</div>
                <div class="stats-value-container">
                      <span>${e.points}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }
    }
  }else if(activeLeagueButton[0].id == "f2"){
    if(activePage[0].innerHTML == "MVP"){
      if(activeFilterButton[0].innerHTML == "MVP"){
        if(arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of mvpDesc.filter((item) => item.league == 2)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.mvpPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of mvpAsc.filter((item) => item.league == 2)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.mvpPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }else if(activeFilterButton[0].innerHTML == "MECZE"){
        if(arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of mvpMatchesDesc.filter((item) => item.league == 2)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.mvpPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of mvpMatchesAsc.filter((item) => item.league == 2)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.mvpPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }
    }else if(activePage[0].innerHTML == "STRZELCY"){
      if(activeFilterButton[0].innerHTML == "BRAMKI"){
        if(arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of goalsDesc.filter((item) => item.league == 2)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.goalsScored}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of goalsAsc.filter((item) => item.league == 2)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.goalsScored}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }else if(activeFilterButton[0].innerHTML == "MECZE"){
        if(arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of mvpMatchesDesc.filter((item) => item.league == 2)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.goalsScored}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of mvpMatchesAsc.filter((item) => item.league == 2)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.goalsScored}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }
    }else if(activePage[0].innerHTML == "BRAMKARZE"){
      if(activeFilterButton[0].innerHTML == "PKT.BR."){
        if(arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of keeperPointsDesc.filter((item) => item.league == 2)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.keeperPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of keeperPointsAsc.filter((item) => item.league == 2)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.keeperPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }else if(activeFilterButton[0].innerHTML == "MECZE"){
        if(arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of keeperMatchesDesc.filter((item) => item.league == 2)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.keeperPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of keeperMatchesAsc.filter((item) => item.league == 2)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.keeperPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }
    }else if(activePage[0].innerHTML == "DRUŻYNY"){
      if(activeFilterButton[0].innerHTML == "PUNKTY"){
        if(arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of teamPointsDesc.filter((item) => item.league == 2)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name}</div>
                <div class="stats-value-container">
                      <span>${e.points}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of teamPointsAsc.filter((item) => item.league == 2)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name}</div>
                <div class="stats-value-container">
                      <span>${e.points}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }else if(activeFilterButton[0].innerHTML == "MECZE"){
        if(arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of teamMatchesDesc.filter((item) => item.league == 2)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name}</div>
                <div class="stats-value-container">
                      <span>${e.points}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of teamMatchesAsc.filter((item) => item.league == 2)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name}</div>
                <div class="stats-value-container">
                      <span>${e.points}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }
    }
  }else if(activeLeagueButton[0].id == "f3"){
    if(activePage[0].innerHTML == "MVP"){
      if(activeFilterButton[0].innerHTML == "MVP"){
        if(arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of mvpDesc.filter((item) => item.league == 3)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.mvpPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of mvpAsc.filter((item) => item.league == 3)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.mvpPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }else if(activeFilterButton[0].innerHTML == "MECZE"){
        if(arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of mvpMatchesDesc.filter((item) => item.league == 3)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.mvpPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of mvpMatchesAsc.filter((item) => item.league == 3)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.mvpPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }
    }else if(activePage[0].innerHTML == "STRZELCY"){
      if(activeFilterButton[0].innerHTML == "BRAMKI"){
        if(arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of goalsDesc.filter((item) => item.league == 3)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.goalsScored}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of goalsAsc.filter((item) => item.league == 3)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.goalsScored}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }else if(activeFilterButton[0].innerHTML == "MECZE"){
        if(arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of mvpMatchesDesc.filter((item) => item.league == 3)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.goalsScored}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of mvpMatchesAsc.filter((item) => item.league == 3)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.goalsScored}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }
    }else if(activePage[0].innerHTML == "BRAMKARZE"){
      if(activeFilterButton[0].innerHTML == "PKT.BR."){
        if(arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of keeperPointsDesc.filter((item) => item.league == 3)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.keeperPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of keeperPointsAsc.filter((item) => item.league == 3)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.keeperPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }else if(activeFilterButton[0].innerHTML == "MECZE"){
        if(arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of keeperMatchesDesc.filter((item) => item.league == 3)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.keeperPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of keeperMatchesAsc.filter((item) => item.league == 3)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.keeperPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }
    }else if(activePage[0].innerHTML == "DRUŻYNY"){
      if(activeFilterButton[0].innerHTML == "PUNKTY"){
        if(arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of teamPointsDesc.filter((item) => item.league == 3)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name}</div>
                <div class="stats-value-container">
                      <span>${e.points}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of teamPointsAsc.filter((item) => item.league == 3)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name}</div>
                <div class="stats-value-container">
                      <span>${e.points}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }else if(activeFilterButton[0].innerHTML == "MECZE"){
        if(arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of teamMatchesDesc.filter((item) => item.league == 3)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name}</div>
                <div class="stats-value-container">
                      <span>${e.points}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of teamMatchesAsc.filter((item) => item.league == 3)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name}</div>
                <div class="stats-value-container">
                      <span>${e.points}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }
    }
  }else if(activeLeagueButton[0].id == "f4"){
    if(activePage[0].innerHTML == "MVP"){
      if(activeFilterButton[0].innerHTML == "MVP"){
        if(arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of mvpDesc.filter((item) => item.league == 4)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.mvpPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of mvpAsc.filter((item) => item.league == 4)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.mvpPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }else if(activeFilterButton[0].innerHTML == "MECZE"){
        if(arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of mvpMatchesDesc.filter((item) => item.league == 4)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.mvpPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of mvpMatchesAsc.filter((item) => item.league == 4)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.mvpPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }
    }else if(activePage[0].innerHTML == "STRZELCY"){
      if(activeFilterButton[0].innerHTML == "BRAMKI"){
        if(arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of goalsDesc.filter((item) => item.league == 4)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.goalsScored}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of goalsAsc.filter((item) => item.league == 4)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.goalsScored}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }else if(activeFilterButton[0].innerHTML == "MECZE"){
        if(arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of mvpMatchesDesc.filter((item) => item.league == 4)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.goalsScored}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of mvpMatchesAsc.filter((item) => item.league == 4)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.goalsScored}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }
    }else if(activePage[0].innerHTML == "BRAMKARZE"){
      if(activeFilterButton[0].innerHTML == "PKT.BR."){
        if(arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of keeperPointsDesc.filter((item) => item.league == 4)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.keeperPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of keeperPointsAsc.filter((item) => item.league == 4)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.keeperPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }else if(activeFilterButton[0].innerHTML == "MECZE"){
        if(arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of keeperMatchesDesc.filter((item) => item.league == 4)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.keeperPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of keeperMatchesAsc.filter((item) => item.league == 4)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name} ${e.surname}</div>
                <div class="stats-value-container">
                      <span>${e.keeperPoints}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }
    }else if(activePage[0].innerHTML == "DRUŻYNY"){
      if(activeFilterButton[0].innerHTML == "PUNKTY"){
        if(arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of teamPointsDesc.filter((item) => item.league == 4)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name}</div>
                <div class="stats-value-container">
                      <span>${e.points}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow1.classList.contains("reversed")){
          let html = ''
          for (const e of teamPointsAsc.filter((item) => item.league == 4)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name}</div>
                <div class="stats-value-container">
                      <span>${e.points}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
      }else if(activeFilterButton[0].innerHTML == "MECZE"){
        if(arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of teamMatchesDesc.filter((item) => item.league == 4)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name}</div>
                <div class="stats-value-container">
                      <span>${e.points}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }else if(!arrow2.classList.contains("reversed")){
          let html = ''
          for (const e of teamMatchesAsc.filter((item) => item.league == 4)) {
            const html2 = `
              <div class="values-container stats-values">
                <div class="stats-value__teamname">${e.name}</div>
                <div class="stats-value-container">
                      <span>${e.points}</span>
                      <span>${e.matches}</span>
                </div>
              </div>
              `
            html += html2
            }
          glassPanel[0].innerHTML = html
        }
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
