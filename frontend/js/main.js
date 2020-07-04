const buttons = document.querySelectorAll('.control_button')

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
