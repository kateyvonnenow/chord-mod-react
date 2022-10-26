import SheetMusic from './components/SheetMusic'
import EditSheetMusic from './components/EditSheetMusic'
import ListOfSongs from './components/ListOfSongs'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home name="Kate"/>}></Route>
        <Route path="/songs" element={<ListOfSongs />}></Route>
      </Routes>
    </div>
  );
}

export default App;
