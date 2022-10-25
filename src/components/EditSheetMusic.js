import { useState, useEffect } from 'react'
import './EditSheetMusic.scss'

function EditSheetMusic() {
  // state
  const [songTitle, SetSongTitle] = useState("")
  const [songArtist, SetSongArtist] = useState("")
  const [arrOfLines, SetArrOfLines] = useState([[], ""])

  let updatedArrOfLines = [...arrOfLines]
  let indexTracker = updatedArrOfLines.length

  const getSongs = () => {
    fetch('/api/songs')
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

  const addNewLine = () => {
    updatedArrOfLines.push([])
    updatedArrOfLines.push("")
    SetArrOfLines(updatedArrOfLines)
  }

  const editSongs = (event) => {
    event.preventDefault()
    const form = event.target
    const data = Object.fromEntries(new FormData(form))

    console.log(data)
    // if (arrOfLines !== null) {
    //   fetch(`/api/songs/${data.id}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ arrOfLines })
    //   })
    //     .then(res => res.json())
    //     .then(updatedSong => {
    //       console.log(updatedSong)
    //     })
    // }
  }

  useEffect(getSongs, [])
  
  return (
    <div className="EditSheetMusic">
      <header>
        <h1> Edit {songTitle}</h1>
        <p>{songArtist}</p>
      </header>

      <form onSubmit={editSongs} className="Edit-Lyrics-Chords">
        <input type="hidden" name="id" value="1"/>

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

        <span onClick={addNewLine}>Add new line</span>
        <p>Up to index {indexTracker}</p>


        <button className="btn-primary">Save</button>
      </form>
    </div>
  )
}

export default EditSheetMusic;