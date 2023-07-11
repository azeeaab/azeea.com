setTimeout(() => setSelectedAvatar('A'), 10)

function setSelectedAvatar(id) {
  const video = document.getElementsByTagName('video')[0]
  video.loop = true
  video.play()

  const avatars = [...document.getElementsByClassName('avatar')]
    .filter(el => el.tagName.toLowerCase() === 'img')
  for (const avatar of avatars) avatar.style.display = ''

  document.getElementById(id).style.display = 'revert'

  console.log('travel...')
  travel()
}

setTimeout(up, 10)

function up() {
  document.getElementById('geo-pin__pin').className = 'up'
  document.getElementById('geo-pin__shadow').className = 'up'
  setTimeout(down, 1000)
}

function down() {
  document.getElementById('geo-pin__pin').className = 'down'
  document.getElementById('geo-pin__shadow').className = 'down'
  setTimeout(up, 1000)
}

async function travel() {
  const pin = document.getElementById('geo-pin')
  pin.className = 'far'
  pin.style.display = ''
  await delay(0)
  pin.className = 'near'
  await delay(2000)
  // pin.style.display = 'none'
}

function delay(millis) { return new Promise(resolve => { setTimeout(resolve, millis); }) }
