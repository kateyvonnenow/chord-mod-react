import { useState, useEffect } from 'react'
import './SheetMusic.scss'

function SheetMusic() {
  const [songTitle, SetSongTitle] = useState("")
  const [songArtist, SetSongArtist] = useState("")
  const [arrOfLines, SetArrOfLines] = useState([[], ""])

  const getSongs = () => {
    fetch('/api/songs')
      .then(res => res.json())
      .then(res => {

        console.log(res)

        const arrOfChords = res[0].chords.split('|')
        console.log(arrOfChords)
        const arrOfLyrics = res[0].lyrics.split('|')
        console.log(arrOfLyrics)

        const arrOfLines = []
        for (let i=0; i<arrOfChords.length; i++) {
          arrOfLines.push(arrOfChords[i].split('-'))
          arrOfLines.push(arrOfLyrics[i])
        }

        SetSongTitle(res[0].title)
        SetSongArtist(res[0].artist)
        SetArrOfLines(arrOfLines)
      })
  }

  useEffect(getSongs, [])

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