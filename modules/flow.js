import { selectTab } from './slider.js'
import { selectFlow, selectedFlow } from './rain.js'
import { DOMElement, DOMMediaElement } from './dom.js'

document.addEventListener('avatar-changed', e => {
  const video = DOMMediaElement.single('video')
  video.element.src = `./${e.avatarName}/video/approach.mp4`
  video.playFromBeginning()

  DOMMediaElement.single('#audio').playFromBeginning()
  DOMElement.single('#avatar').element.src = `./${e.avatarName}/img/avatar.png`
  DOMElement.single('#avatar').element.className = `avatar ${e.id}`

  currentConfig = { ...e.config.videoConfig, id: e.id }

  selectFlow(e.id)
  selectTab(0)
  DOMElement.single('#geo-pin').hide()
});

const video = document.querySelector('video')
video.addEventListener('timeupdate', () => {
  if (video.currentTime > currentConfig.endTime) {
    const pin = DOMElement.single('#geo-pin')
    pin.display()
    pin.setClass(currentConfig.id)
    video.pause()

    for (const friend of pin.children('.friend'))
      friend.display(friend.hasClass(selectedFlow()))
  }
}, false);

setInterval(function bounce_pin() {
  const pin = DOMElement.single('#geo-pin__pin')
  const shadow = DOMElement.single('#geo-pin__shadow')

  const direction = pin.hasClass('down') ? 'up' : 'down'
  pin.setClass(direction)
  shadow.setClass(direction)
}, 1000)

let currentConfig
