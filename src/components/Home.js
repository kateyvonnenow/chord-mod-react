import { useState } from 'react'

function Home(props) {
  return (
    <div className="Home">
      <h1>Welcome {props.name} to ChordMod!</h1>
    </div>
  )
}

export default Home