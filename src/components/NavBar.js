import AllRoutes from './AllRoutes'
import { useState } from 'react'
import './NavBar.scss'

import { BrowserRouter as Router, Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className="NavMenu">
      <nav>
        <Link to="/">Home</Link>
        <Link to="songs">Songs</Link>
        <Link to="/create">Add song</Link>
      </nav>
    </div>

  )
}

export default NavBar;