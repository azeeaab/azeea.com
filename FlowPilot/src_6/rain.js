const images = [
  {
    src: '../DummyGraphics/Beachen.png',
    width: 2865,
    height: 1852,
  }, {
    src: '../DummyGraphics/Bycycle.png',
    width: 2987,
    height: 1920,
  }, {
    src: '../DummyGraphics/Canoeing1.png',
    width: 3985,
    height: 2533,
  }, {
    src: '../DummyGraphics/Canoeing2.png',
    width: 4213,
    height: 2556,
  }, {
    src: '../DummyGraphics/Divers.png',
    width: 4103,
    height: 2517,
  }, {
    src: '../DummyGraphics/Havslandskap.png',
    width: 3299,
    height: 1414,
  }, {
    src: '../DummyGraphics/Kayaking.png',
    width: 3625,
    height: 1637,
  }, {
    src: '../DummyGraphics/Sailboat.png',
    width: 4173,
    height: 1946,
  }, {
    src: '../DummyGraphics/Skatare.png',
    width: 3433,
    height: 1949,
  }, {
    src: '../DummyGraphics/Snorkeling1.png',
    width: 3496,
    height: 2480,
  }, {
    src: '../DummyGraphics/Snorkeling2.png',
    width: 3044,
    height: 1979,
  }, {
    src: '../DummyGraphics/StandPaddel.png',
    width: 2215,
    height: 2052,
  }, {
    src: '../DummyGraphics/Surfare.png',
    width: 2538,
    height: 3935,
  }, {
    src: '../DummyGraphics/WaveSurfer.png',
    width: 4189,
    height: 2542,
  }
]
const NUM_IMAGES = images.length

let selectedImage = null
const fallingImages = []
setTimeout(displayNextImage, 10)

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
  const imgElement = createImgElement()
  imgElement.src = image.src
  imgElement.className = image.width < image.height ? 'rain portrait hidden' : 'rain landscape hidden'

  const h1Element = document.createElement('h1')
  h1Element.textContent = 'Bondi Beach'

  const element = document.createElement('div')
  element.className = 'img'
  element.appendChild(imgElement)
  element.appendChild(h1Element)
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

function createImgElement() { return document.createElement('img') }
function randomImage() { return images[randomInt(NUM_IMAGES)] }
function randomInt(max) { return Math.floor(Math.random() * max) }
function delay(millis) { return new Promise(resolve => { setTimeout(resolve, millis); }) }
