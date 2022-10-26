import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SheetMusic from './SheetMusic'
import './CreateSheetMusic.scss'

function CreateSheetMusic({ songId }) {

  const navigate = useNavigate();

  // state
  const [songTitle, SetSongTitle] = useState("")
  const [songArtist, SetSongArtist] = useState("")
  const [arrOfLines, SetArrOfLines] = useState([[], ""])
  const [uniqueSongId, SetSongId] = useState(songId)

  let updatedArrOfLines = [...arrOfLines]
  let indexTracker = updatedArrOfLines.length

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

  // Adding song to Backend
  const addSong = (event) => {
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
      fetch(`/api/songs/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, artist, lyrics, chords })
      })
        .then(res => res.json())
        .then(addSong => {
          console.log(addSong)
        })
    }

    navigate(`/songs`)
  }


  
  return (
    <div className="CreateSheetMusic">

      <form onSubmit={addSong} className="Edit-Lyrics-Chords">
        <input type="hidden" name="id" value="1"/>

        <section className="Edit-Title-Artist">
          <input type="text" name="song-title" id="EditSongTitle" placeholder="Song Title"/>

          <input type="text" name="song-artist" id="EditSongArtist" placeholder="Artist"/>
        </section>
        

        {arrOfLines.map((line, index) => {
          let lineName = index
          indexTracker = index
          // console.log(line)

          if (typeof line === "string") {
            lineName = `lyric-line-${index}`
            return (
              <input type="text" name={lineName} className="lyric-line" key={index} placeholder="Write the lyrics here!"/>
            )
          } else {
            lineName = `chord-line-${index}`
            return (
              <input type="text" name={lineName} className="chord-line" key={index} placeholder="Write the chords in the correct spot here!"/>
            )
          }
        })}

        <section className="controls">
          <span onClick={addNewLine} id="add">Add line</span>
          <span onClick={removeLine} id="delete">Delete line</span>
        </section>
        
        <p>Up to index {indexTracker + 1}</p>
        
        <button className="btn-primary">Add</button>
      </form>
    </div>
  )
}

export default CreateSheetMusic;