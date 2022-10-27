import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './ListOfSongs.scss'
import NavBar from './NavBar'

function ListOfSongs({ 
  setAllSongs, 
  setCurrentSongId, 
  setCurrentSongTitle,
  allSongs,
  currentSongId,
  currentSongTitle
}) {
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

  const playHoverSoundEffect = () => {

  }

  return (
    <div className="AllSongs">
      <section className="ListNavBar">
        <NavBar />
      </section>
      <h1>Browse all Chords + Lyrics</h1>

      <section className="List-Of-Songs">
        {allSongs.map((song, index) => {
          console.log(song)
          let songTitleNoSpace = song.title.replace(/\s/g, '')
          return (
            <div className="song-list" key={index}>
              <div onClick={() => navigateToSheetMusic(song.id, songTitleNoSpace)}>
                <h3>{song.title}</h3>
                <p> by {song.artist}</p>
              </div>
            </div>
          )
        })}
      </section>
    </div>

  )
}

export default ListOfSongs;