import { AvatarChanged } from './selected-avatar.js';

document.addEventListener(AvatarChanged, e => {
  const video = document.querySelector('video')
  video.src = `./${e.avatarName}/video/approach.mp4`
  video.currentTime = 0
  video.play()

  document.querySelector('#audio').play()
  document.querySelector('#avatar').src = `./${e.avatarName}/img/avatar.png`
  document.querySelector('#avatar').className = `avatar ${e.id}`

  currentConfig = { videoConfig: e.config.videoConfig, id: e.id, avatarName: e.avatarName, pinStyle: e.config.pinStyle }
  document.querySelector('#geo-pin').style.display = 'none'
});

const video = document.querySelector('video')
video.addEventListener('timeupdate', () => {
  if (video.currentTime > currentConfig.videoConfig.endTime) {
    const pin = document.querySelector('#geo-pin')
    pin.style.display = ''
    pin.className = currentConfig.id
    video.pause()

    const img = document.querySelector('#geo-pin__pin img')
    img.src = `./${currentConfig.avatarName}/img/pin.png`
    img.style = ''
    for (const [k, v] of Object.entries(currentConfig.pinStyle))
      img.style[k] = v

    for (const friend of pin.querySelectorAll('.friend'))
      friend.style.display = friend.classList.contains(currentConfig.id) ? '' : 'none'
  }
}, false);

setInterval(function bounce_pin() {
  const pin = document.querySelector('#geo-pin__pin')
  const direction = pin.classList.contains('down') ? 'up' : 'down'
  pin.className = direction

  const shadow = document.querySelector('#geo-pin__shadow')
  shadow.className = direction
}, 1000)

let currentConfig
