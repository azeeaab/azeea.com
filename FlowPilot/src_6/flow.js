setTimeout(() => {
  setSelectedAvatar('A')
  selectTab(0)
  hideSearch()
}, 10)

function selectTab(num) {
  const targetTab = sliderBackground().getElementsByClassName(`${selectedFlow()}${num}`)[0]
  const isSelected = targetTab.style.display == 'initial'

  for (const slider of sliderBackground().getElementsByClassName('slider')) {
    slider.style.display = 'none'
  }

  const tabToDisplay = isSelected
    ? sliderBackground().getElementsByClassName(`${selectedFlow()}0`)[0]
    : targetTab
  tabToDisplay.style.display = 'initial'
}

function setSelectedAvatar(id) {
  selectFlow(id)
  document.getElementById('geo-pin').style.display = 'none'

  const videos = [ ...document.getElementsByTagName('video') ]
  for (const vid of videos) {
    vid.style.display = 'none'
    vid.pause()
  }

  const video = document.getElementById(`video_${id}`) // as HTMLVideoElement
  video.style.display = ''
  playFromBeginning(video)

  const audio = document.getElementById('audio') // as HTMLAudioElement
  audio.play()

  const avatars = [...document.getElementsByClassName('avatar')]
    .filter(el => el.tagName.toLowerCase() === 'img')
  for (const avatar of avatars) avatar.style.display = ''

  document.getElementById(id).style.display = 'revert'
}

setTimeout(() => {
  const videoConfig = {
    'A': {
      endTime: 15,
      pinImage: 'SurfinBoard pin.png'
    },
    'B': {
      endTime: 15,
      pinImage: 'Tennis pin.png'
    },
    'C': {
      endTime: 28,
      pinImage: 'Basketball pin.png'
    },
  }

  for (const [vc, cfg] of Object.entries(videoConfig)) {
    const video = document.getElementById(`video_${vc}`)

    video.addEventListener('timeupdate', e => {
      if (video.currentTime > cfg.endTime) {
        document.getElementById('geo-pin').style.display = ''
        document.getElementById('geo-pin').className = vc
        // document.getElementById('geo-pin__pin').src = cfg.pinImage
        video.pause()
      }
    }, false);
  }
}, 10)

/** @param {HTMLVideoElement} video */
function playFromBeginning(video) {
  video.currentTime = 0
  video.play()
}

function delay(millis) { return new Promise(resolve => { setTimeout(resolve, millis); }) }


setInterval(function bounce_pin() {
  const pin = document.getElementById('geo-pin__pin')
  const shadow = document.getElementById('geo-pin__shadow')

  const direction = pin.className == 'down' ? 'up' : 'down'
  pin.className = direction
  shadow.className = direction
}, 1000)
