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
  tab().style.left = `${Math.min(Math.max(pageX - sliderBoundingRect().x - tabHalfWidth, minX), maxX)}px`
}

function stopDragSliderTab(e) {
  slider_state.dragOrigin = null
  e.target.releasePointerCapture(e.pointerId)
}

function sliderBackground() {
  return document.getElementById(`slider-${selectedFlow()}`)
}

function sliderBoundingRect() {
  return sliderBackground().getBoundingClientRect()
}

function tab() {
  return sliderBackground().getElementsByClassName('tab')[0]
}

function selectTab(num) {
  for (const slider of document.getElementsByClassName('bww')) {
    slider.style.display = 'none'
  }

  sliderBackground().style.display = 'block'

  const targetTab = sliderBackground().getElementsByClassName(`${selectedFlow()}${num}`)[0]
  const isSelected = targetTab.style.display == 'initial'

  for (const slider of sliderBackground().getElementsByClassName('slider')) {
    slider.style.display = 'none'
  }

  const tabToDisplay = isSelected
    ? sliderBackground().getElementsByClassName(`${selectedFlow()}0`)[0]
    : targetTab
  tabToDisplay.style.display = 'initial'
}

function displaySearch() {
  searchSButton().style.display = 'none'
  searchXButton().style.display = 'initial'
  searchMainArea().style.display = 'initial'
}

function hideSearch() {
  searchSButton().style.display = ''
  searchXButton().style.display = ''
  searchMainArea().style.display = ''
}

function searchSButton() {
  return sliderBackground().getElementsByClassName('button s')[0]
}

function searchXButton() {
  return sliderBackground().getElementsByClassName('button x')[0]
}

function searchMainArea() {
  return sliderBackground().getElementsByClassName('main')[0]
}
