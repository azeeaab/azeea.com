const videoConfig = {
  'A': {
    endTime: 15,
    pinImage: 'SurfinBoard pin.png',
  },
  'B': {
    endTime: 15,
    pinImage: 'Tennis pin.png',
  },
  'C': {
    endTime: 28,
    pinImage: 'Basketball pin.png',
  },
}

setTimeout(() => {
  setSelectedAvatar('A')
  hideSearch()
}, 10)

function setSelectedAvatar(id) {
  selectFlow(id)
  selectTab(0)
  DOMElement.id('geo-pin').element.style.display = 'none'

  const videos = [ ...document.getElementsByTagName('video') ]
  for (const vid of videos) {
    vid.style.display = 'none'
    vid.pause()
  }

  const video = DOMElement.id(`video_${id}`).element
  video.style.display = ''
  playFromBeginning(video)

  const audio = DOMElement.id('audio').element
  audio.play()

  const avatars = [...DOMElement.className('avatar')]
    .map(el => el.element)
    .filter(el => el.tagName.toLowerCase() === 'img')
  for (const avatar of avatars) avatar.style.display = ''

  DOMElement.id(id).element.style.display = 'revert'
}

setTimeout(() => {
  for (const [vc, cfg] of Object.entries(videoConfig)) {
    const video = DOMElement.id(`video_${vc}`).element

    video.addEventListener('timeupdate', e => {
      if (video.currentTime > cfg.endTime) {
        const pin = DOMElement.id('geo-pin')
        pin.element.style.display = ''
        pin.element.className = vc
        video.pause()

        for (const friend of pin.children('friend')) {
          friend.element.style.display = 'none'
        }

        for (const friend of pin.children(`friend ${selectedFlow()}`)) {
          friend.element.style.display = ''
        }
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
  const pin = DOMElement.id('geo-pin__pin').element
  const shadow = DOMElement.id('geo-pin__shadow').element

  const direction = pin.className == 'down' ? 'up' : 'down'
  pin.className = direction
  shadow.className = direction
}, 1000)
