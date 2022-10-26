import { useState } from 'react'

function Home(props) {
  const [counter, setCounter] = useState(0)

  return (
    <div className="Home">
      <h1>Welcome {props.name} to ChordMod!</h1>
      <p>Counter: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Count</button>
    </div>
  )
}

export default Home