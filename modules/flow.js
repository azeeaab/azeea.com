import { DOMElement, DOMMediaElement } from './dom.js'
import { AvatarChanged } from './selected-avatar.js';

document.addEventListener(AvatarChanged, e => {
  const video = DOMMediaElement.single('video')
  video.element.src = `./${e.avatarName}/video/approach.mp4`
  video.playFromBeginning()

  DOMMediaElement.single('#audio').playFromBeginning()
  DOMElement.single('#avatar').element.src = `./${e.avatarName}/img/avatar.png`
  DOMElement.single('#avatar').element.className = `avatar ${e.id}`

  currentConfig = { videoConfig: e.config.videoConfig, id: e.id, avatarName: e.avatarName, pinStyle: e.config.pinStyle }
  DOMElement.single('#geo-pin').hide()
});

const video = document.querySelector('video')
video.addEventListener('timeupdate', () => {
  if (video.currentTime > currentConfig.videoConfig.endTime) {
    const pin = DOMElement.single('#geo-pin')
    pin.display()
    pin.setClass(currentConfig.id)
    video.pause()

    const img = document.querySelector('#geo-pin__pin img')
    img.src = `./${currentConfig.avatarName}/img/pin.png`
    img.style = ''
    for (const [k, v] of Object.entries(currentConfig.pinStyle))
      img.style[k] = v

    for (const friend of pin.children('.friend'))
      friend.display(friend.hasClass(currentConfig.id))
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
