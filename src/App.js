import SheetMusic from './components/SheetMusic'
import EditSheetMusic from './components/EditSheetMusic'
import ListOfSongs from './components/ListOfSongs'
import Home from './components/Home'

import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link 
} from 'react-router-dom'


function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="songs">Songs</Link>
      </nav>

      <div className="App">
        <Routes>
          <Route path="/" element={<Home name="Kate"/>}></Route>
          <Route path="/songs/*" element={<ListOfSongs />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
