class DOMElement {
  /** {Element} */ element

  constructor(element) {
    this.element = element
    Object.freeze(this)
  }

  static id(id) {
    return new DOMElement(document.getElementById(id))
  }

  static className(className) {
    return [...document.getElementsByClassName(className)]
      .map(el => new DOMElement(el))
  }

  children(className) {
    return [...this.element.getElementsByClassName(className)]
      .map(el => new DOMElement(el))
  }
}
