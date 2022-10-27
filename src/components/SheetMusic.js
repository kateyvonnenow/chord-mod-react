import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './SheetMusic.scss'
import Piano from './Piano'

function SheetMusic({ songId, currentSongTitle }) {

  const navigate = useNavigate();

  const [songTitle, SetSongTitle] = useState("")
  const [songArtist, SetSongArtist] = useState("")
  const [arrOfLines, SetArrOfLines] = useState([[], ""])
  const [uniqueSongId, SetSongId] = useState(songId)

  const getSong = () => {
    console.log('getSong is working' + uniqueSongId)
    fetch(`/api/songs/${uniqueSongId}`)
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

  const navigateToEditSheetMusic = ( songId, songTitle ) => {
    console.log(songTitle)
    console.log(songId)

    navigate(`/edit/${songTitle}`)
  }

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
      <span onClick={() => navigateToEditSheetMusic(uniqueSongId, currentSongTitle)}>Edit</span>
      <Piano />
    </div>
  )
}

export default SheetMusic;