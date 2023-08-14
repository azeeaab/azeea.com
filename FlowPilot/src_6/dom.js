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

  /** @param {DisplayMode} state */
  isDisplay(state) {
    return this.element.style.display == state.value
  }

  /** @param {DisplayMode} state */
  setDisplay(state) {
    this.element.style.display = state.value
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

class DisplayMode {
  static unset = new DisplayMode('')
  static block = new DisplayMode('block')
  static initial = new DisplayMode('initial')
  static none = new DisplayMode('none')

  constructor(value) {
    this.value = value
    Object.freeze(this)
  }
}
