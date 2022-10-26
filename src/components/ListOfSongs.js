import SheetMusic from './SheetMusic'
import { useState, useEffect } from 'react'
import './ListOfSongs.scss'

function ListOfSongs() {

  const [allSongs, SetAllSongs] = useState([])

  const getAllSongs = () => {
    fetch('/api/songs')
      .then(res => res.json())
      .then(res => {
        SetAllSongs(res)
        console.log(res)
      })
  }

  useEffect(getAllSongs, [])

  return (
    <div className="AllSongs">
      <h1>List of Songs</h1>
      <section className="List-Of-Songs">
        {allSongs.map((song, index) => {
          return (
            <div onClick={() => SheetMusic(song.id)} className="song-list" key={index}>
              <h3 key={index}>{song.title}</h3>
            </div>
          )
        })}
      </section>
    </div>

  )
}

export default ListOfSongs;