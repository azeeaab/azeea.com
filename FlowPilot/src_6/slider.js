const minX = 24
const maxX = 473
const tabHalfWidth = 2.5

const slider_state = {
  dragOrigin: null,
}

function startDragSliderTab(e) {
  const {pageX, pageY} = e
  slider_state.dragOrigin = {pageX, pageY}
  e.target.setPointerCapture(e.pointerId)
}

function dragSliderTab(e) {
  if (!slider_state.dragOrigin) return

  const {pageX} = e
  tab().element.style.left = `${Math.min(Math.max(pageX - sliderBoundingRect().x - tabHalfWidth, minX), maxX)}px`
}

function stopDragSliderTab(e) {
  slider_state.dragOrigin = null
  e.target.releasePointerCapture(e.pointerId)
}

function sliderBackground() {
  return DOMElement.id(`slider-${selectedFlow()}`)
}

function sliderBoundingRect() {
  return sliderBackground().element.getBoundingClientRect()
}

function tab() {
  return sliderBackground().child('tab')
}

function selectTab(num) {
  const bg = sliderBackground()
  const wasSelected = bg.hasClass(`_${num}`)

  bg.display()
  bg.setClass('search-panel')
  bg.addClass(!num || wasSelected ? '_0' : `_${num}`)
}

function displaySearch() {
  searchSButton().hide()
  searchXButton().display()
  searchMainArea().display()
}

function hideSearch() {
  searchSButton().display()
  searchXButton().hide()
  searchMainArea().hide()
}

function searchSButton() {
  return sliderBackground().child('button s')
}

function searchXButton() {
  return sliderBackground().child('button x')
}

function searchMainArea() {
  return sliderBackground().child('main')
}
