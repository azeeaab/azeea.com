class DOMElement {
  /** @type {Element} */ element

  constructor(element) {
    if (!element) throw new Error('element is null')
    this.element = element
    Object.freeze(this)
  }

  static id(id) {
    return new DOMElement(document.getElementById(id))
  }

  static tagName(tagName) {
    return [...document.getElementsByTagName(tagName)]
      .map(el => new DOMElement(el))
  }

  static className(className) {
    return [...document.getElementsByClassName(className)]
      .map(el => new DOMElement(el))
  }

  child(className) {
    const children = this.element.getElementsByClassName(className)
    return new DOMElement(children[0])
  }

  children(className) {
    return [...this.element.getElementsByClassName(className)]
      .map(el => new DOMElement(el))
  }

  display() {
    this.element.style.display = 'block'
  }

  hide() {
    this.element.style.display = 'none'
  }

  isDisplayed() {
    return getComputedStyle(this.element).display !== 'none'
  }
}

class DOMMediaElement extends DOMElement {
  static id(id) {
    return new DOMMediaElement(document.getElementById(id))
  }

  playFromBeginning() {
    this.element.currentTime = 0
    this.element.play()
  }
}
