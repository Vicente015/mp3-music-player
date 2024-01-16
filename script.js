let song
let audio

const songs = await(await fetch('./songs.json')).json()

function init () {
  /**
   * @type {Object[]}
   */
  console.debug(songs)

  const random = Math.round(Math.random() * songs.length)
  playSong(random)

  audioBars()
  progressBar()
}

function playSong (newIndex) {
  if (audio) audio.pause()
  song = songs[newIndex]
  audio = new Audio(song.url)
  audio.play()


  const title = document.getElementById('title')
  const autor = document.getElementById("autor")

  title.innerText = song.title
  autor.innerText = song.artist

  console.log(song.image)

}


const audioBars = () => {
  audio.addEventListener('timeupdate', () => {
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

  })
}

const progressBar = () => {

  audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime
    const duration = audio.duration

    const progress = Math.round((currentTime * 100) / duration)

    const control_volumen = document.getElementById('control_volumen')
    control_volumen.value = progress

    console.log(progress)

  });
}

// const artboxInage = () => {
//   const artboxInage = song.image
//   document.getElementById('.art-box').style.backgroundImage = `url(${artboxInage})`
// }

function previous () {
  const songIndex = songs.indexOf(song)
  if (songIndex <= 0) {
    playSong(songs.length - 1)
  } else {
    playSong(songIndex - 1)
  }
}

const play = () => {
  audio.paused == true ? audio.play() : audio.pause()
}

const next = () => {
  const songIndex = songs.indexOf(song)
  if (songIndex >= songs.length) {
    playSong(0)
  } else {
    playSong(songIndex + 1)
  }
}

document.getElementById('previous')
  .addEventListener('click', previous)

document.getElementById('play')
  .addEventListener('click', play)

document.getElementById('next')
  .addEventListener('click', next)



init()

