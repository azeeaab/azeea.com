import { hideSearch, selectTab } from './slider.js'
import { selectFlow, selectedFlow } from './rain.js'
import { DOMElement, DOMMediaElement } from './dom.js'

setSelectedAvatar('A')
hideSearch()

export function setSelectedAvatar(id) {
  selectFlow(id)
  selectTab(0)
  DOMElement.single('#geo-pin').hide()

  const videos = DOMElement.all('video')
  for (const vid of videos) {
    vid.hide()
    vid.element.pause()
  }

  const video = DOMMediaElement.single(`#video_${id}`)
  video.display()
  video.playFromBeginning()

  DOMMediaElement.single('#audio').playFromBeginning()

  for (const avatar of DOMElement.all('img.avatar'))
    avatar.hide()

  DOMElement.single(`#${id}`).display()
}

for (const [vc, cfg] of Object.entries(videoConfig)) {
  const video = DOMMediaElement.single(`#video_${vc}`)

  video.element.addEventListener('timeupdate', e => {
    if (video.element.currentTime > cfg.endTime) {
      const pin = DOMElement.single('#geo-pin')
      pin.display()
      pin.setClass(vc)
      video.element.pause()

      for (const friend of pin.children('.friend'))
        friend.display(friend.hasClass(selectedFlow()))
    }
  }, false);
}

setInterval(function bounce_pin() {
  const pin = DOMElement.single('#geo-pin__pin')
  const shadow = DOMElement.single('#geo-pin__shadow')

  const direction = pin.hasClass('down') ? 'up' : 'down'
  pin.setClass(direction)
  shadow.setClass(direction)
}, 1000)
