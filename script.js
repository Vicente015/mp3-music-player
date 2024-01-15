let song
let audio

const songs = await (await fetch('./songs.json')).json()
async function init () {
  /**
   * @type {Object[]}
   */
  console.debug(songs)

  const random = Math.round(Math.random() * songs.length)
  playSong(random)
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

  const currentTime = audio.currentTime
  console.log(currentTime / 60)
}

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

document.getElementById('previous')
  .addEventListener('click', previous)

document.getElementById('play')
  .addEventListener('click', play)



init()

