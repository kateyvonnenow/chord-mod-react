import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import SheetMusic from './SheetMusic'
import EditSheetMusic from './EditSheetMusic'
import CreateSheetMusic from './CreateSheetMusic'
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
      <Route path="/" element={<Home name="Stranger,"/>}></Route>
      <Route path="/songs/" element={<ListOfSongs 
        setAllSongs={setAllSongs} 
        setCurrentSongId={setCurrentSongId} 
        setCurrentSongTitle={setCurrentSongTitle}

        allSongs={allSongs}
        currentSongId={currentSongId}
        currentSongTitle={currentSongTitle}
        />}>  
      </Route>
      <Route path={`/chords`} element={<SheetMusic 
        currentSongId={currentSongId}
        currentSongTitle={currentSongTitle}
        />}>
      </Route>
      <Route path={`/edit`} element={<EditSheetMusic 
        currentSongId={currentSongId} 
        currentSongTitle={currentSongTitle}/>}>
      </Route>
      <Route path={`/create`} element={<CreateSheetMusic />}>

      </Route>
    </Routes>
  )
}

export default AllRoutes;