import AllRoutes from './components/AllRoutes'
import { useState } from 'react'
import NavBar from './components/NavBar'

import { BrowserRouter as Router, Link } from 'react-router-dom'


function App() {

  const [allSongs, SetAllSongs] = useState([])
  const [currentSongId, SetCurrentSongId] = useState()
  const [currentSongTitle, SetCurrentSongTitle] = useState()

  return (
    <Router>
      <NavBar />

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
