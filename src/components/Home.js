import { useState } from 'react'
import './Home.scss'
import NavBar from './NavBar'

import Piano from './Piano'
function Home(props) {
  return (
    <div className="Home">
      <section className="HomeNavBar">
        <NavBar />
      </section>
      <h1>Welcome to ChordMod.</h1>

      <Piano />
    </div>
  )
}

export default Home