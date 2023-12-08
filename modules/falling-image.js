import { randomInt } from "./rain.js"

const IMAGE_POSITION_TIME = 2000

export class FallingImageElement {
  element
  isDismissed = false

  constructor(element) {
    this.element = element
  }

  positionAtTop() {
    if (this.isDismissed) return

    this.element.style.top = '-2vh'
    this.element.style.left = `${600 + randomInt(innerWidth - 850)}px`
    this.element.style.opacity = '0'
  }

  async positionInCenter() {
    if (this.isDismissed) return

    this.element.style.top = '47vh'
    this.element.style.opacity = '1'
    await delay(IMAGE_POSITION_TIME)
  }

  async positionAsSelected() {
    this.element.style.top = '75vh'
    this.element.style.left = '15vw'
    await delay(IMAGE_POSITION_TIME)
  }

  async dismiss() {
    this.isDismissed = true
    this.element.onmousedown = null
    this.element.style.top = '150vh'
    this.element.style.opacity = '0'
    await delay(IMAGE_POSITION_TIME)
    this.element.remove()
  }
}

function delay(millis) { return new Promise(resolve => { setTimeout(resolve, millis) }) }
