const IMAGE_POSITION_TIME = 2000

class FallingImageElement {
  element
  isDismissed = false

  constructor(element) {
    this.element = element
  }

  positionAtTop() {
    if (this.isDismissed) return

    this.element.className = 'img top'
    this.element.style.left = `${600 + randomInt(innerWidth - 850)}px`
  }

  async positionInCenter() {
    if (this.isDismissed) return

    this.element.className = 'img center'
    this.element.style.left = '15vw'
    await delay(IMAGE_POSITION_TIME)
  }
  
  async positionAsSelected() {
    this.element.className = 'img selected'
    await delay(IMAGE_POSITION_TIME)
  }
  
  async dismiss() {
    this.isDismissed = true
    this.element.className = 'img dismissed'
    this.element.onmousedown = null
    await delay(IMAGE_POSITION_TIME)
    this.element.remove()
  }
}
