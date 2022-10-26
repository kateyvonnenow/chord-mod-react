import { useState, useEffect } from 'react'
import './SheetMusic.scss'

function SheetMusic({ songId }) {
  const [songTitle, SetSongTitle] = useState("")
  const [songArtist, SetSongArtist] = useState("")
  const [arrOfLines, SetArrOfLines] = useState([[], ""])

  const getSong = ( songId ) => {
    console.log('getSong is working' + songId)
    fetch(`/api/songs/${songId}`)
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

  useEffect(getSong(songId), [])

  return (
    <div className="SheetMusic">
      <header>
        <h1>{songTitle}</h1>
        <p>{songArtist}</p>
      </header>

      <section className="Lyrics-Chords">
        {arrOfLines.map((line, index) => {
          if (typeof line === "string") {
            return <pre className="lyric-line" key={index}>
              {line}
            </pre>
          } else {
            return <div className="chord-line" key={index}>
              {line.map((chord, index2) => {
                return <pre className={chord} key={index2}>{chord}</pre>
              })}
            </div>
          }
        })}
      </section>
    </div>
  )
}

export default SheetMusic;