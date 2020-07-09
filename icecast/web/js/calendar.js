/* global axios */

const calendar = document.querySelector('.program-container')
const noEventURL = '#'
const noEvent = `<a href="${noEventURL}" target="_blank" class="row p-2 mb-3 program"><div class="col col-12">no upcoming program? join us and add one! (COMING SOON!) &rarr;</div></a>`

document.addEventListener('DOMContentLoaded', () => {
  axios.get('https://radio-cal.gaengeviertel.tk').then((response) => {
    calendar.innerHTML = ''

    if (response.data && response.data.length > 0) {
      response.data.forEach((entry) => {
        if (entry.link) {
          const htmlString = `<a class="row p-2 mb-3 program" href="${entry.link}" target="_blank" target="_blank">
          <div class="col col-2">
            ${entry.date}
          </div>
          <div class="col col-4">
          ${entry.time}
          </div>
          <div class="col col-6">
          ${entry.description}
          </div>
          </a>`
          calendar.innerHTML += htmlString
        } else {
          const htmlString = `<div class="row p-2 mb-3 program nohover" target="_blank" target="_blank">
          <div class="col col-2">
            ${entry.date}
          </div>
          <div class="col col-4">
          ${entry.time}
          </div>
          <div class="col col-6">
          ${entry.description}
          </div>
          </div>`
          calendar.innerHTML += htmlString
        }
      })
    } else {
      calendar.innerHTML = noEvent
    }
  }).catch((err) => {
    console.log(err.message)
    calendar.innerHTML = noEvent
  })
})
