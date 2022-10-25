import { useState, useEffect } from 'react'
import './SheetMusic.scss'

function SheetMusic() {
  const [songTitle, SetSongTitle] = useState("Happy Birthday")
  const [songArtist, SetSongArtist] = useState("Generic")
  const [arrOfLines, SetArrOfLines] = useState([
    [`      `, `G`, `           `, `D`, `  `],
    "Happy birthday to you,",
    [`      `, `D7`, `          `, `G`, `  `],
    "Happy birthday to you,",
    [`      `, `C`, `           `, `G`, `  `],
    "Happy birthday, dear Jonathan,",
    [`      `, `D7`, `          `, `G`, `  `],
    "Happy birthday to you."])




  const getSongs = () => {
    fetch('/api/songs')
      .then(res => res.json())
      .then(res => console.log(res))
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