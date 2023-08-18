let selectedImage = null
const fallingImages = []
setTimeout(displayNextImage, 10)

var flowName
function selectedFlow() { return flowName }
function selectFlow(name) { flowName = name }

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
  document.body.appendChild(element)

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

async function dismissImage(element) {
  element.onmousedown = null
  element.style.top = '150vh'
  element.style.opacity = '0'
  await delay(IMAGE_POSITION_TIME)
  if (selectedImage.element !== element)
    element.remove()
}

function randomImage() {
  const flow = (flowName && flows[flowName]) ?? images
  return flow[randomInt(flow.length)]
}

function createImgElement() { return document.createElement('img') }
function randomInt(max) { return Math.floor(Math.random() * max) }
function delay(millis) { return new Promise(resolve => { setTimeout(resolve, millis); }) }
