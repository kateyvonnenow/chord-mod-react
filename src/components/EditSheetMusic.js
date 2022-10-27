import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SheetMusic from './SheetMusic'
import './EditSheetMusic.scss'
import NavBar from './NavBar'

function EditSheetMusic({ currentSongId }) {

  const navigate = useNavigate();
  const localStorageSongId = localStorage.getItem('currentSongId')
  console.log(localStorageSongId)

  if (currentSongId == "") {
    currentSongId = localStorageSongId
  }

  // state
  const [songTitle, SetSongTitle] = useState("")
  const [songArtist, SetSongArtist] = useState("")
  const [arrOfLines, SetArrOfLines] = useState([[], ""])
  const [uniqueSongId, SetSongId] = useState(currentSongId)

  let updatedArrOfLines = [...arrOfLines]
  let indexTracker = updatedArrOfLines.length

  const getSong = () => {
    console.log('getSong is working' + uniqueSongId)
    fetch(`/api/songs/${uniqueSongId}/edit`)
      .then(res => res.json())
      .then(res => {

        // console.log(res)

        const arrOfChords = res.chords.split('|')
        // console.log(arrOfChords)
        const arrOfLyrics = res.lyrics.split('|')
        // console.log(arrOfLyrics)

        const arrOfLines = []
        for (let i=0; i<arrOfChords.length; i++) {
          arrOfLines.push(arrOfChords[i].split('-'))
          arrOfLines.push(arrOfLyrics[i])
        }

        SetSongTitle(res.title)
        SetSongArtist(res.artist)
        SetArrOfLines(arrOfLines)
      })
  }

  useEffect(getSong, [])

  const addNewLine = () => {
    updatedArrOfLines.push([])
    updatedArrOfLines.push("")
    SetArrOfLines(updatedArrOfLines)
  }

  const removeLine = () => {
    updatedArrOfLines.pop()
    updatedArrOfLines.pop()
    SetArrOfLines(updatedArrOfLines)
  }


  // Sending Song update to Backend
  const editSongs = (event) => {
    event.preventDefault()
    const form = event.target
    const data = Object.fromEntries(new FormData(form))

    const arrSongObjectKeys = Object.keys(data)
    const title = data['song-title']
    const artist = data['song-artist']
    const lyrics = arrSongObjectKeys
      .filter(lyricsKey => {
        return lyricsKey.includes("lyric")
      })
      .map(lyricsKey => {
        return data[lyricsKey]
      })
      .join('|')

    const chords = arrSongObjectKeys
      .filter(chordsKey => {
        return chordsKey.includes("chord")
      })
      .map(chordKey => {
        return data[chordKey]
      })
      .join('|')

    if (arrOfLines !== null) {
      fetch(`/api/songs/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, artist, lyrics, chords })
      })
        .then(res => res.json())
        .then(updatedSong => {
          console.log(updatedSong)
        })
    }

    navigate(`/chords`)
  }

  const deleteSong = (event) => {
    event.preventDefault()
    fetch(`/api/songs/${uniqueSongId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(message => {
        console.log(message)
      })

    navigate(`/songs`)
  }

  const navigateBack = () => {
    navigate(`/chords`)
  }

  return (
    <div className="EditSheetMusic">

      <section className="SheetNavBar">
        <NavBar />
      </section>
      <header>
        <h1>{songTitle}</h1>
        <div className="controls">
          <p> by {songArtist}</p>
          <span onClick={navigateBack} className="material-symbols-outlined">close</span>
        </div>
      </header>

      <div className="background"></div>

      <form onSubmit={editSongs} className="Edit-Lyrics-Chords">
        <input type="hidden" name="id" value={uniqueSongId}/>

        <section className="Edit-Title-Artist">
          <input type="text" name="song-title" id="EditSongTitle" placeholder="Song Title" defaultValue={songTitle} />

          <input type="text" name="song-artist" id="EditSongArtist" placeholder="Artist" defaultValue={songArtist} />
        </section>
        

        {arrOfLines.map((line, index) => {
          let lineName = index
          indexTracker = index
          // console.log(line)

          if (typeof line === "string") {
            lineName = `lyric-line-${index}`
            return (
              <input type="text" name={lineName} className="lyric-line" key={index} placeholder={line} defaultValue={line}/>
            )
          } else {
            lineName = `chord-line-${index}`
            let defaultValue = line.join('')
            return (
              <input type="text" name={lineName} className="chord-line" key={index} placeholder={line.join('')} defaultValue={defaultValue}/>
            )
          }
        })}

        <section className="controls">
          <span onClick={addNewLine} id="add" className="material-symbols-outlined" >add_circle</span>
          <span onClick={removeLine} id="delete" className="material-symbols-outlined">remove</span>
        </section>
        
        {/* <p>Up to index {indexTracker + 1}</p> */}
        
        <button className="material-symbols-outlined md-48 save">done</button>
      </form>
      <i onClick={deleteSong} className="material-symbols-outlined md-36 delete">delete</i>
    </div>
  )
}

export default EditSheetMusic;