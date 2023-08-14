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
  return DOMElement.id(`slider-${selectedFlow()}`)
}

function sliderBoundingRect() {
  return sliderBackground().element.getBoundingClientRect()
}

function tab() {
  return sliderBackground().children('tab')[0].element
}

function selectTab(num) {
  for (const slider of DOMElement.className('bww')) {
    slider.element.style.display = 'none'
  }

  sliderBackground().element.style.display = 'block'

  const targetTab = sliderBackground().children(`${selectedFlow()}${num}`)[0].element
  const isSelected = targetTab.style.display == 'initial'

  for (const slider of sliderBackground().children('slider')) {
    slider.element.style.display = 'none'
  }

  const tabToDisplay = isSelected
    ? sliderBackground().children(`${selectedFlow()}0`)[0].element
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
  return sliderBackground().children('button s')[0].element
}

function searchXButton() {
  return sliderBackground().children('button x')[0].element
}

function searchMainArea() {
  return sliderBackground().children('main')[0].element
}
