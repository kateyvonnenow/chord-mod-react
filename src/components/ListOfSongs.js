import SheetMusic from './SheetMusic'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import AllRoutes from './AllRoutes'
import './ListOfSongs.scss'

function ListOfSongs({ 
  setAllSongs, 
  setCurrentSongId, 
  setCurrentSongTitle,
  allSongs,
  currentSongId,
  currentSongTitle
}) {

  // const [allSongs, SetAllSongs] = useState([])
  // const [currentSongId, SetCurrentSongId] = useState()
  // const [currentSongTitle, SetCurrentSongTitle] = useState()
  const navigate = useNavigate();

  const getAllSongs = () => {
    fetch('/api/songs')
      .then(res => res.json())
      .then(res => {
        setAllSongs(res)
        console.log(res)
      })
  }

  useEffect(getAllSongs, [setAllSongs])

  const navigateToSheetMusic = ( songId, songTitleNoSpace ) => {
    console.log(songTitleNoSpace)
    console.log(songId)

    setCurrentSongId(songId)
    setCurrentSongTitle(songTitleNoSpace)

    navigate(`/chords/${songTitleNoSpace}`)
  }

  // useEffect(navigateToSheetMusic, [setCurrentSongId, setCurrentSongTitle])

  return (
    <div className="AllSongs">
      <h1>List of Songs</h1>
      <section className="List-Of-Songs">
        {allSongs.map((song, index) => {
          console.log(song)
          let songTitleNoSpace = song.title.replace(/\s/g, '')
          return (
            <div className="song-list" key={index}>
              <div onClick={() => navigateToSheetMusic(song.id, songTitleNoSpace)}>
                <h3>{song.title}</h3>
              </div>
            </div>
          )
        })}
      </section>
    </div>

  )
}

export default ListOfSongs;