import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import SheetMusic from './SheetMusic'
import EditSheetMusic from './EditSheetMusic'
import ListOfSongs from './ListOfSongs'
import Home from './Home'

function AllRoutes({ 
  setAllSongs, 
  setCurrentSongId, 
  setCurrentSongTitle,
  allSongs,
  currentSongId,
  currentSongTitle
}) {
  return (
    <Routes>
      <Route path="/" element={<Home name="Kate"/>}></Route>
      <Route path="/songs/*" element={<ListOfSongs 
        setAllSongs={setAllSongs} 
        setCurrentSongId={setCurrentSongId} 
        setCurrentSongTitle={setCurrentSongTitle}

        allSongs={allSongs}
        currentSongId={currentSongId}
        currentSongTitle={currentSongTitle}
        />}>  
      </Route>
      <Route path={`/chords/${currentSongTitle}`} element={<SheetMusic 
        songId={currentSongId}
        currentSongTitle={currentSongTitle}
        />}>
      </Route>
      <Route path={`/edit/${currentSongTitle}`} element={<EditSheetMusic 
        songId={currentSongId} 
        currentSongTitle={currentSongTitle}/>}>
      </Route>
    </Routes>
  )
}

export default AllRoutes;