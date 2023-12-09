export const domExport = (value, variableName) => {
  window[variableName] = value
}

export class DOMElement {
  /** @type {Element} */ element

  constructor(element) {
    if (!element) throw new Error('element is null')
    this.element = element
    Object.freeze(this)
  }

  static single(selector) {
    return new DOMElement(document.querySelector(selector))
  }

  static all(selector) {
    return [...document.querySelectorAll(selector)]
      .map(el => new DOMElement(el))
  }

  hasClass(className) {
    return [...this.element.classList].includes(className)
  }

  addClass(className) {
    this.element.classList.add(className)
  }

  removeClass(className) {
    this.element.classList.remove(className)
  }

  setClass(className) {
    return this.element.className = className
  }

  child(selector) {
    var el = this.element.querySelector(selector)
    return el ? new DOMElement(el) : null
  }

  children(selector) {
    return [...this.element.querySelectorAll(selector)]
      .map(el => new DOMElement(el))
  }

  display(b = true) {
    if (this.isForcedHidden()) return;
    this.element.style.display = b ? 'block' : 'none'
  }

  hide() {
    this.display(false)
  }

  isDisplayed() {
    return getComputedStyle(this.element).display !== 'none'
  }

  isForcedHidden() {
    const isMobile = screen.width <= 480
    if (!isMobile) return false
    if (this.hasClass('avatar')) return true
    if (this.element.tagName.toLowerCase() == 'video') return true
    return false
  }
}

export class DOMMediaElement extends DOMElement {
  static single(selector) {
    return new DOMMediaElement(document.querySelector(selector))
  }

  playFromBeginning() {
    this.element.currentTime = 0
    this.element.play()
  }
}
