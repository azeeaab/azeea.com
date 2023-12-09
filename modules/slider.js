import { selectedFlow } from "./rain.js"
import { DOMElement } from './dom.js'
import { sliderImages as slidersA } from "../aqua_dude/config.js"
import { sliderImages as slidersB } from "../tennis_queen/config.js"
import { sliderImages as slidersC } from "../basket_jr/config.js"

const minX = 24
const maxX = 473
const tabHalfWidth = 5

const slider_state = {
  dragOrigin: null,
}

function placeSliderTab(loc) {
  const x = loc * (maxX - minX) + minX
  tab().element.style.left = `${x}px`
  curtain().element.style.width = `${x - minX - 2}px`
}

export function startDragSliderTab(e) {
  const {pageX, pageY} = e
  slider_state.dragOrigin = {pageX, pageY}
  e.target.setPointerCapture(e.pointerId)
}

export function dragSliderTab(e) {
  if (!slider_state.dragOrigin) return

  const {pageX} = e
  const elementX = pageX - sliderBoundingRect().x - tabHalfWidth

  const clampedX = Math.min(Math.max(elementX, minX), maxX)
  tab().element.style.left = `${clampedX}px`
  curtain().element.style.width = `${clampedX - minX - 2}px`

  document.body.dispatchEvent(
    new SliderEvent((clampedX - minX) / (maxX - minX))
  )
}

class SliderEvent extends Event {
  constructor(value) {
    super('slider')
    this.value = value
  }
}

export function stopDragSliderTab(e) {
  slider_state.dragOrigin = null
  e.target.releasePointerCapture(e.pointerId)
}

function sliderBackground() {
  return DOMElement.single(`#slider-${selectedFlow()}`)
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

export function selectTab(num) {
  for (const slider of DOMElement.all('.search-panel')) {
    slider.hide()
  }

  const tabId = `_${num}`
  const bg = sliderBackground()
  const wasSelected = bg.hasClass(tabId)

  bg.display()
  bg.setClass('search-panel')
  bg.addClass(!num || wasSelected ? '_0' : tabId)

  const label = bg.child(`.value._${num}`)
  if (label) {
    placeSliderTab(currentDisplay().tabPercentage(label.element.innerText))
    mess().element.innerText = label.element.innerText
  }
}

document.body.addEventListener('slider', ({value}) => {
  const bg = sliderBackground()
  const tabId = bg.element.classList[1]
  const valueLabel = bg.child(`.value.${tabId}`)
  const percentage = Math.round(value * 100)

  const text = currentDisplay().labelText(percentage)
  mess().element.innerText = text
  if (valueLabel) valueLabel.element.innerText = text
})

export function displaySearch() {
  searchSButton().hide()
  searchXButton().display()
  searchMainArea().display()
}

export function hideSearch() {
  searchSButton().display()
  searchXButton().hide()
  searchMainArea().hide()
}

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

injectSlider(DOMElement.single('#slider-A'), slidersA)
injectSlider(DOMElement.single('#slider-B'), slidersB)
injectSlider(DOMElement.single('#slider-C'), slidersC)

function injectSlider(parent, config) {
  parent.element.innerHTML = html

  for (let i = 0; i < 4; i++)
    parent.child(`.toggle._${i}`).element.src = config.sliders[i]
  parent.child('.search.s').element.src = config.s
  parent.child('.search.x').element.src = config.x
  parent.child('.search.main').element.src = config.main
}


function currentDisplay() {
  const bg = sliderBackground()
  const tabId = bg.element.classList[1]
  return tabId == '_1' ? DISPLAY.location : DISPLAY.default
}

const DISPLAY = {
  location: {
    labelText: function (percentage) {
      return percentage <= 20 ? '1km' :
        percentage <= 40 ? '10km' :
        percentage <= 60 ? '100km' :
        percentage <= 80 ? '500km' :
              'anywhere'
    },

    tabPercentage: function (innerText) {
      switch (innerText) {
        case '1km': return 0.20
        case '10km': return 0.40
        case '100km': return 0.60
        case '500km': return 0.80
        default: return 1.00
      }
    }
  },
  default: {
    labelText: function (percentage) {
      return `${percentage}%`
    },

    tabPercentage: function (innerText) {
      return innerText.substring(0, innerText.length - 1) / 100
    }
  }
}

export function addSearchTerm(term) {
  const element = document.createElement('div')
  element.innerText = term
  element.className = 'search-term'
  element.onclick = () => {
    element.onclick = null
    element.remove()
  }
  sliderBackground().child('.pill-container').element.appendChild(element)
}
