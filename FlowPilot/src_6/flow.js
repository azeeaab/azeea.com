setTimeout(() => setSelectedAvatar('A'), 10)

function setSelectedAvatar(id) {
  document.getElementById('geo-pin').style.display = 'none'

  const videos = [ ...document.getElementsByTagName('video') ]
  for (const vid of videos) {
    vid.style.display = 'none'
    vid.pause()
  }

  const video = document.getElementById(`video_${id}`) // as HTMLVideoElement
  video.style.display = ''
  playFromBeginning(video)

  const avatars = [...document.getElementsByClassName('avatar')]
    .filter(el => el.tagName.toLowerCase() === 'img')
  for (const avatar of avatars) avatar.style.display = ''

  document.getElementById(id).style.display = 'revert'
}

setTimeout(() => {
  const videoConfig = {
    'A': { endTime: 15 },
    'B': { endTime: 15 },
    'C': { endTime: 28 },
  }

  for (const [vc, cfg] of Object.entries(videoConfig)) {
    const video = document.getElementById(`video_${vc}`)

    video.addEventListener('timeupdate', e => {
      if (video.currentTime > cfg.endTime) {
        document.getElementById('geo-pin').style.display = ''
        video.pause()
        setTimeout(up, 1)
      }
    }, false);
  }
}, 10)

/** @param {HTMLVideoElement} video */
function playFromBeginning(video) {
  video.currentTime = 0
  video.play()
}

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

function delay(millis) { return new Promise(resolve => { setTimeout(resolve, millis); }) }
