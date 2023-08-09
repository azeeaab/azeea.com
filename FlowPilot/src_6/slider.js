const minX = 7
const maxX = 490
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
  console.log('stopDragSliderTab', e)
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
