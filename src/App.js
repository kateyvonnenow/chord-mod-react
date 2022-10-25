import SheetMusic from './components/SheetMusic'
import EditSheetMusic from './components/EditSheetMusic'
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <SheetMusic />
      <EditSheetMusic />
    </div>
  );
}

export default App;
