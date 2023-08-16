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
  DOMElement.id('geo-pin').hide()

  const videos = DOMElement.tagName('video')
  for (const vid of videos) {
    vid.hide()
    vid.element.pause()
  }

  const video = DOMMediaElement.id(`video_${id}`)
  video.display()
  video.playFromBeginning()

  DOMMediaElement.id('audio').playFromBeginning()

  const avatars = DOMElement.className('avatar')
    .filter(el => el.element.tagName.toLowerCase() === 'img')
  for (const avatar of avatars) avatar.hide()

  DOMElement.id(id).display()
}

setTimeout(() => {
  for (const [vc, cfg] of Object.entries(videoConfig)) {
    const video = DOMMediaElement.id(`video_${vc}`)

    video.element.addEventListener('timeupdate', e => {
      if (video.element.currentTime > cfg.endTime) {
        const pin = DOMElement.id('geo-pin')
        pin.display()
        pin.setClass(vc)
        video.element.pause()

        for (const friend of pin.children('friend'))
          friend.display(friend.hasClass(selectedFlow()))
      }
    }, false);
  }
}, 10)

function delay(millis) { return new Promise(resolve => { setTimeout(resolve, millis); }) }

setInterval(function bounce_pin() {
  const pin = DOMElement.id('geo-pin__pin')
  const shadow = DOMElement.id('geo-pin__shadow')

  const direction = pin.hasClass('down') ? 'up' : 'down'
  pin.setClass(direction)
  shadow.setClass(direction)
}, 1000)
