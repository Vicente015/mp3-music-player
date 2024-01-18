/**
 * @type {Object}
 */
let song
/**
 * @type {HTMLAudioElement}
 */
let audio

const songs = await(await fetch('./songs.json')).json()

function init () {
  console.debug(songs)

  const random = Math.round(Math.random() * songs.length)
  playSong(random)

  audioBars()
  progressBar()
  changeArtwork()
}

function playSong (newIndex) {
  const timeUpdateListener = () => {
    progressBar()
    audioBars()
  }

  if (audio) {
    audio.pause()
    audio.removeEventListener('timeupdate', timeUpdateListener)
  }

  console.debug('newIndex', newIndex)

  song = songs[newIndex]
  audio = new Audio(song.url)
  audio.play()

  const title = document.getElementById('title')
  const autor = document.getElementById("autor")

  // Reiniciar valores
  title.innerText = song.title
  autor.innerText = song.artist

  audio.addEventListener('timeupdate', timeUpdateListener)

  changeArtwork(song.image);

  console.log(song.image)
}


const audioBars = () => {
  const currentTime = audio.currentTime
  const duration = audio.duration
  const currentMinutes = Math.floor(currentTime / 60)
  const currentSeconds = Math.floor(currentTime % 60)
  const durationMinutes = Math.floor(duration / 60)
  const durationSeconds = Math.floor(duration % 60)
  const currentTimeFormatted = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`
  const durationFormatted = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`

  document.getElementById('currentTime').innerText = currentTimeFormatted
  document.getElementById('duration').innerText = durationFormatted
}


const progressBar = () => {
  const control_volumen = document.getElementById('control_volumen')
  const currentTime = audio.currentTime
  const duration = audio.duration
  const progress = Math.floor((currentTime * 100) / duration)

  control_volumen.value = progress
}

function previous () {
  const songIndex = songs.indexOf(song) - 1
  if (songIndex < 0) {
    playSong(songs.length - 1)
  } else {
    playSong(songIndex)
  }
}

const play = () => {
  const audioPausado = audio.paused === true
  audioPausado ? audio.play() : audio.pause()
  const playBtn = document.getElementById('playBtn')
  const pauseBtn = document.getElementById('pauseBtn')

  playBtn.classList.toggle('hidden')
  pauseBtn.classList.toggle('hidden')

  changeArtwork(song.image);

}

const next = () => {
  const songIndex = songs.indexOf(song) + 1
  if (songIndex >= songs.length) {
    playSong(0)
  } else {
    playSong(songIndex)
  }
}

const changeArtwork = (artworkUrl) => {
  const artwork = document.getElementById('art-box')
  artwork.src = artworkUrl
  artwork.style.background = `url(${artworkUrl})`
};

document.getElementById('previous')
  .addEventListener('click', previous)

document.getElementById('play')
  .addEventListener('click', play)

document.getElementById('next')
  .addEventListener('click', next)

init()

