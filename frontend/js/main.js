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
      togglePlayPause(button.id)
    })
  })
}

function togglePlayPause (buttonid) {
  let playpause = document.getElementById(buttonid + '_button')
  let video = document.getElementById(buttonid + '_video')

  if (video.paused || video.ended) {
    playpause.title = 'pause'
    playpause.src = 'img/pause.svg'
    if (video.play() !== undefined) {
      video.play().then(function () {
        video.play()
      }).catch(function (error) {
        console.log('shit')
        console.log(error)
      })
    }
  } else {
    playpause.title = 'play'
    playpause.src = 'img/play.svg'
    if (video.pause() !== undefined) {
      video.pause().then(function () {
        video.pause()
      }).catch(function (error) {
        console.log('shit')
        console.log(error)
      })
    }
  }
}
