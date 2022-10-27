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
  const [searchResults, SetSearchResults] = useState(allSongs)

  const getAllSongs = () => {
    fetch('/api/songs')
      .then(res => res.json())
      .then(res => {
        setAllSongs(res)
        SetSearchResults(res)
        console.log(res)

      })
  }

  useEffect(getAllSongs, [setAllSongs, SetSearchResults])
  useEffect(() => {
    localStorage.setItem('currentSongId', currentSongId);
  }, [currentSongId])

  const navigateToSheetMusic = ( songId, songTitleNoSpace ) => {
    setCurrentSongId(songId)
    localStorage.setItem('currentSongId', songId)
    setCurrentSongTitle(songTitleNoSpace)
    localStorage.setItem('currentSongTitle', songTitleNoSpace)

    // navigate(`/chords/${songTitleNoSpace}`)
    navigate(`/chords`)
  }

  const searchSong = () => {
    const searchItem = document.querySelector('.search-input').value

    const newSearchResults = allSongs.filter(song => {
      return song.title.toLowerCase().includes(searchItem.toLowerCase())
    })

    SetSearchResults(newSearchResults)
  }

  const navigateToAddASong = () => {
    navigate(`/create`)
  }

  return (
    <div className="AllSongs">
      <div className="fixed-browse-top">
        <section className="ListNavBar">
          <NavBar />
        </section>
        <h1>Browse all Chords + Lyrics</h1>

        <div className="container">
          <input type="text" className="search-input" placeholder="Search Song"/> 
          <a onClick={searchSong} className="material-symbols-outlined">search</a>
        </div>

        <img src="/images/FadeToTop.png" alt="" className="faded-white"/>
      </div>

      <span onClick={navigateToAddASong} className="material-symbols-outlined md-60 add-song">Add</span>
      
      <section className="List-Of-Songs">
        {console.log(searchResults)}
        {searchResults.map((song, index) => {
          let songTitleNoSpace = song.title.replace(/\s/g, '')
          return (
            <div onClick={() => navigateToSheetMusic(song.id, songTitleNoSpace)}className="song-list" key={index}>
              <div>
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