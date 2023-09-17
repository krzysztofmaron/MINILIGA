const filterBtn = document.querySelector('.glass-panel-filter')
const klocek = document.querySelector('.filter-bar')
const filterIcon = document.querySelector('.glass-panel-filter__icon')
const glassPanel = document.querySelectorAll(".glass-panel-content")

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

let teamsData = []
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
          teamsData = data

          render_page()
      })
      .catch((error) => {
          console.error('Fetch error:', error);
      });
  }
render_team_stats('/api/teams')


function render_page(){
    const activeLeagueButton = document.querySelectorAll(".filter-active")
    if(activeLeagueButton[0].id == "f1"){
        let html = ''
        for (const e of teamsData.filter((item) => item.league == 1)) {
            const html2 = `
                <div class="values-container">
                    <img class="value-team-league__icon" src="static/img/${e.league}.png" />
                    <a href="teams/${e.id}" class="value-team-name" target="_blank">${e.name}</a>
                </div>
              `
            html += html2
            }
        glassPanel[0].innerHTML = html
    }else if(activeLeagueButton[0].id == "f2"){
        let html = ''
        for (const e of teamsData.filter((item) => item.league == 2)) {
            const html2 = `
                <div class="values-container">
                    <img class="value-team-league__icon" src="static/img/${e.league}.png" />
                    <a href="teams/${e.id}" class="value-team-name" target="_blank">${e.name}</a>
                </div>
              `
            html += html2
            }
        glassPanel[0].innerHTML = html
    }else if(activeLeagueButton[0].id == "f3"){
        let html = ''
        for (const e of teamsData.filter((item) => item.league == 3)) {
            const html2 = `
                <div class="values-container">
                    <img class="value-team-league__icon" src="static/img/${e.league}.png" />
                    <a href="teams/${e.id}" class="value-team-name" target="_blank">${e.name}</a>
                </div>
              `
            html += html2
            }
        glassPanel[0].innerHTML = html
    }else if(activeLeagueButton[0].id == "f4"){
        let html = ''
        for (const e of teamsData.filter((item) => item.league == 4)) {
            const html2 = `
                <div class="values-container">
                    <img class="value-team-league__icon" src="static/img/${e.league}.png" />
                    <a href="teams/${e.id}" class="value-team-name" target="_blank">${e.name}</a>
                </div>
              `
            html += html2
            }
        glassPanel[0].innerHTML = html

    }
}

const filterLeagues = document.querySelectorAll(".filter")
filterLeagues.forEach(e => {
    e.addEventListener("click", function(){
      filterLeagues.forEach(e => {
        e.classList.remove("filter-active")
      })
      e.classList.add("filter-active")
    })
  })
filterLeagues.forEach(e => {
e.addEventListener("click", function(){
    render_page()
})
}) 