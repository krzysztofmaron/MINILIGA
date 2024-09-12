const logo = document.querySelector(".header-logo-container");

logo.addEventListener("click", function () {
  location.href = "../";
});



const filterBtn = document.querySelector('.glass-panel-filter')
const klocek = document.querySelector('.filter-bar')
const filterIcon = document.querySelector('.glass-panel-filter__icon')
const glassPanel = document.querySelectorAll(".glass-panel-content")

let filterOnOff = false
filterBtn.addEventListener("click", function(){
  if(filterOnOff){
    filterIcon.classList.remove('rotated')
    klocek.classList.remove('shown')
    filterOnOff = false
  }else{
    filterIcon.classList.add('rotated')
    klocek.classList.add('shown')
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
  const league = parseInt(activeLeagueButton[0].id.slice(1))

  if (league){
    let html = ''
    for (const e of teamsData.filter((item) => item.league == league)) {
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
}