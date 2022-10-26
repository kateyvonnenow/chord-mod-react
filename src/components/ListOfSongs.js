import SheetMusic from './SheetMusic'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './ListOfSongs.scss'

function ListOfSongs() {

  const [allSongs, SetAllSongs] = useState([])
  const navigate = useNavigate();

  const getAllSongs = () => {
    fetch('/api/songs')
      .then(res => res.json())
      .then(res => {
        SetAllSongs(res)
        console.log(res)
      })
  }

  useEffect(getAllSongs, [])

  const navigateToSheetMusic = ( songTitle ) => {
    console.log(songTitle)
    navigate(`/songs/${songTitle}`)
  }

  return (
    <div className="AllSongs">
      <h1>List of Songs</h1>
      <section className="List-Of-Songs">
        {allSongs.map((song, index) => {
          let songTitleNoSpace = song.title.replace(/\s/g, '')

          return (
            <div className="song-list" key={index}>
              <div onClick={() => navigateToSheetMusic(songTitleNoSpace)}>
                <h3>{song.title}</h3>
              </div>
              <Routes>
                <Route path={`/${songTitleNoSpace}`} element={<SheetMusic songId={song.id}/>}></Route>
              </Routes>
            </div>
          )
        })}
      </section>
    </div>

  )
}

export default ListOfSongs;