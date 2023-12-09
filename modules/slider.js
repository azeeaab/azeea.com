import { DOMElement, domExport } from './dom.js'
import { searchPercentage, searchValue, setSearchValue, tabId } from './search.js'

const minX = 24
const maxX = 473
const tabHalfWidth = 5

const slider_state = {
  dragOrigin: null,
}

let currentConfig

document.addEventListener('avatar-changed', e => {
  currentConfig = e.config.sliderImages
  injectSlider(DOMElement.single('#slider'))
  selectTab(0)
})

document.addEventListener('DOMContentLoaded', () => {
  hideSearch()
})

document.addEventListener('search-changed', ({ state, value, percentage }) => {
  const bg = sliderBackground()
  const valueLabel = bg.child(`.value.${tabId(state)}`)
  if (valueLabel) valueLabel.element.innerText = value
  mess().element.innerText = value
  placeSliderTab(percentage)
})

function placeSliderTab(loc) {
  const x = loc * (maxX - minX) + minX
  tab().element.style.left = `${x}px`
  curtain().element.style.width = `${Math.max(0, x - minX - 2)}px`
}

domExport(e => {
  const {pageX, pageY} = e
  slider_state.dragOrigin = {pageX, pageY}
  e.target.setPointerCapture(e.pointerId)
}, 'startDragSliderTab')

domExport(e => {
  if (!slider_state.dragOrigin) return

  const {pageX} = e
  const elementX = pageX - sliderBoundingRect().x - tabHalfWidth

  const clampedX = Math.min(Math.max(elementX, minX), maxX)
  const value = (clampedX - minX) / (maxX - minX)
  setSearchValue(value, document.querySelector('#slider').classList[1])
}, 'dragSliderTab')

domExport(e => {
  slider_state.dragOrigin = null
  e.target.releasePointerCapture(e.pointerId)
}, 'stopDragSliderTab')

function sliderBackground() {
  return DOMElement.single('#slider')
}

function sliderBoundingRect() {
  return sliderBackground().element.getBoundingClientRect()
}

function tab() {
  return sliderBackground().child('.tab')
}

function curtain() {
  return sliderBackground().child('.curtain')
}

function selectTab(num) {
  const clickedTabId = `_${num}`
  const bg = sliderBackground()
  const wasSelected = bg.hasClass(clickedTabId)

  bg.display()
  bg.setClass('search-panel')

  const tabId = !num || wasSelected ? '_0' : clickedTabId
  bg.addClass(tabId)

  placeSliderTab(searchPercentage(tabId))
  mess().element.innerText = searchValue(tabId)
}
domExport(selectTab, 'selectTab')

domExport(() => {
  searchSButton().hide()
  searchXButton().display()
  searchMainArea().display()
}, 'displaySearch')

domExport(() => {
  searchSButton().display()
  searchXButton().hide()
  searchMainArea().hide()
}, 'hideSearch')

function searchSButton() {
  return sliderBackground().child('.button.s')
}

function searchXButton() {
  return sliderBackground().child('.button.x')
}

function searchMainArea() {
  return sliderBackground().child('.main')
}

function mess() {
  return sliderBackground().child('.mess')
}

const html = `
<img class="slider toggle _0">
<img class="slider toggle _1">
<img class="slider toggle _2">
<img class="slider toggle _3">
<div class="tab" onpointerdown="startDragSliderTab(event)" onpointerup="stopDragSliderTab(event)" onpointermove="dragSliderTab(event)">
  <div class="value mess">50%</div>
</div>
<div class="curtain"></div>

<div class="value _1">100km</div>
<div class="value _2">50%</div>
<div class="value _3">50%</div>

<button onclick="selectTab(1)" class="_1"></button>
<button onclick="selectTab(2)" class="_2"></button>
<button onclick="selectTab(3)" class="_3"></button>

<img class="search button s" onclick="displaySearch()">
<img class="search button x" onclick="hideSearch()">
<img class="search main">

<form onsubmit="addSearchTerm(this.querySelectorAll('input')[0].value); return false">
  <input>
</form>
<div class="pill-container"></div>
`

function injectSlider(parent) {
  parent.element.innerHTML = html

  for (let i = 0; i < 4; i++)
    parent.child(`.toggle._${i}`).element.src = currentConfig.sliders[i]
  parent.child('.search.s').element.src = currentConfig.s
  parent.child('.search.x').element.src = currentConfig.x
  parent.child('.search.main').element.src = currentConfig.main
}

domExport(term => {
  const element = document.createElement('div')
  element.innerText = term
  element.className = 'search-term'
  element.onclick = () => {
    element.onclick = null
    element.remove()
  }
  sliderBackground().child('.pill-container').element.appendChild(element)
}, 'addSearchTerm')
