const frequency = 5000 // Actually 1 / frequency
const transitionDuration = 3000
var carouselId

swingCarouselTo(0)
setInterval(swingCarousel, frequency);

function swingCarousel() {
  const elements = [...document.getElementsByClassName('carousel')]
  swingCarouselTo((carouselId + 1) % elements.length)
}

async function swingCarouselTo(nextId) {
  const elements = [...document.getElementsByClassName('carousel')]
  const nextElement = elements.find(e => [...e.classList].includes(String(nextId)))

  const currentId = String(carouselId ?? 0)
  const currentElement = elements.find(e => [...e.classList].includes(currentId))

  carouselId = nextId

  for (const el of elements) el.style.zIndex = null
  nextElement.style.zIndex = 1

  nextElement.style.opacity = 0
  nextElement.style.opacity = 1
  await delay(transitionDuration)

  delete currentElement.style.opacity
  await delay(frequency)
  currentElement.style.opacity = 0
}

function delay(millis) { return new Promise(resolve => { setTimeout(resolve, millis) }) }
