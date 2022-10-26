// import SheetMusic from './components/SheetMusic'
// import EditSheetMusic from './components/EditSheetMusic'
// import ListOfSongs from './components/ListOfSongs'
// import Home from './components/Home'
import AllRoutes from './components/AllRoutes'
import { useState, useEffect } from 'react'

import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link 
} from 'react-router-dom'


function App() {

  const [allSongs, SetAllSongs] = useState([])
  const [currentSongId, SetCurrentSongId] = useState()
  const [currentSongTitle, SetCurrentSongTitle] = useState()

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="songs">Songs</Link>
      </nav>

      <div className="App">
        <AllRoutes 
          setAllSongs={SetAllSongs} 
          setCurrentSongId={SetCurrentSongId} 
          setCurrentSongTitle={SetCurrentSongTitle}

          allSongs={allSongs}
          currentSongId={currentSongId}
          currentSongTitle={currentSongTitle}
        />
      </div>
    </Router>
  );
}

export default App;
