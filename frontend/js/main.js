
const buttons = document.querySelectorAll('.control_button')
const approaches = document.querySelectorAll('.approach')

adjustApproachHeights()

window.addEventListener('resize', () => {
  adjustApproachHeights()
})

function adjustApproachHeights () {
  if (approaches && approaches.length > 0) {
    if (window.innerWidth >= 960) {
      approaches.forEach((approach) => {
        const approachOffset = Math.round(window.pageYOffset + approach.getBoundingClientRect().top)
        approach.style.height = `${window.innerHeight - (2 * (approachOffset))}px`
      })
    } else {
      approaches.forEach((approach) => {
        approach.style.height = 'auto'
      })
    }
  }
}
if (buttons && buttons.length > 0) {
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault()
      togglePlayPause(button.id, button)
    })
  })
}

function togglePlayPause (buttonid, button) {
  console.log(button)
  const playButton = button.querySelector('.play-button')
  const pauseButton = button.querySelector('.pause-button')
  const audio = document.getElementById(buttonid + '_audio')

  if (playButton && pauseButton) {
    console.log(playButton, pauseButton)
    if (audio.paused || audio.ended) {
      playButton.classList.remove('visible')
      pauseButton.classList.add('visible')
      if (audio.play() !== undefined) {
        audio.play().then(function () {
          audio.play()
        }).catch(function (error) {
          console.log('shit')
          console.log(error)
        })
      }
    } else {
      playButton.classList.add('visible')
      pauseButton.classList.remove('visible')
      if (audio.pause() !== undefined) {
        audio.pause().then(function () {
          audio.pause()
        }).catch(function (error) {
          console.log('shit')
          console.log(error)
        })
      }
    }
  }
}