import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SheetMusic from './SheetMusic'
import './EditSheetMusic.scss'

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

  return (
    <div className="EditSheetMusic">

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
          <span onClick={addNewLine} id="add">Add line</span>
          <span onClick={removeLine} id="delete">Delete line</span>
        </section>
        
        <p>Up to index {indexTracker + 1}</p>
        
        <button className="btn-primary save">Save</button>
      </form>
      <span onClick={deleteSong}className="btn-primary delete">Delete</span>
    </div>
  )
}

export default EditSheetMusic;