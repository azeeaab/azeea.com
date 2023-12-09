import { FallingImageElement } from "./falling-image.js"
import { selectedAvatar } from "./selected-avatar.js"

export const start = () => {
  displayNextImage()
}

let flowImages = []

document.addEventListener('avatar-changed', e => {
  flowImages = e.config.flowImages
})

let selectedImage = null
const fallingImages = []

async function displayNextImage() {
  // Calling itself in a setTimeout works sort-of like
  // setInterval except the timing might drift.
  // On the positive side this is more flexible when it
  // needs to be turned on and off.
  setTimeout(() => {
    if (!selectedImage) displayNextImage()
  }, 1500)

  const element = appendImageElement()
  const image = new FallingImageElement(element)
  fallingImages.push(image)
  element.onmousedown = function () {
    if (selectedImage?.element === element) {
      selectedImage = null
      image.dismiss()
      displayNextImage()
    } else {
      selectedImage = image
      image.positionAsSelected()

      for (const img of fallingImages.filter(i => i !== image))
        img.dismiss()

      fallingImages.splice(0)
    }
  }

  image.positionAtTop()
  const pin = document.getElementById('geo-pin')
  pin.parentNode.insertBefore(element, pin.nextSibling)

  await delay(100)
  await image.positionInCenter()

  if (selectedImage?.element !== element)
    await image.dismiss()
}

function appendImageElement() {
  const image = randomImage()
  return createElement(image)
}

function createElement(image) {
  let element = createImgElement()
  element.src = image.src
  element.className = image.width < image.height ? 'rain portrait hidden' : 'rain landscape hidden'
  return element
}

function randomImage() {
  return flowImages[randomInt(flowImages.length)]
}

function createImgElement() { return document.createElement('img') }
export function randomInt(max) { return Math.floor(Math.random() * max) }
function delay(millis) { return new Promise(resolve => { setTimeout(resolve, millis); }) }
