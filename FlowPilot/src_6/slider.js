const minX = 24
const maxX = 473
const tabHalfWidth = 2.5

var lastMouseDownCoords

function startDragSliderTab(e) {
  const {pageX, pageY} = e
  lastMouseDownCoords = {pageX, pageY}
  e.target.setPointerCapture(e.pointerId)
}

function dragSliderTab(e) {
  if (!lastMouseDownCoords) return

  const {pageX} = e
  tab().style.left = `${Math.min(Math.max(pageX - sliderBoundingRect().x - tabHalfWidth, minX), maxX)}px`
}

function stopDragSliderTab(e) {
  lastMouseDownCoords = null
  e.target.releasePointerCapture(e.pointerId)
}

function sliderBackground() {
  return document.getElementById('slider')
}

function sliderBoundingRect() {
  return sliderBackground().getBoundingClientRect()
}

function tab() {
  return sliderBackground().getElementsByClassName('tab')[0]
}

// TODO: There should be 3 of each button and main area (A, B, C)
// TODO: Also: Switch all buttons/images when switching avatar
// TODO: Refactor where state is stored
// TODO: Does not work on Edge...? Replace <video> with an <img>?

function displaySearch() {
  searchSButton().style.display = 'none'
  searchXButton().style.display = 'initial'
  searchMainArea().style.display = 'initial'
}

function hideSearch() {
  searchSButton().style.display = 'initial'
  searchXButton().style.display = 'none'
  searchMainArea().style.display = 'none'
}

function searchSButton() {
  return document.getElementById('search-s')
}

function searchXButton() {
  return document.getElementById('search-x')
}

function searchMainArea() {
  return document.getElementById('search')
}
