import './Piano.scss'
import AllNotes from './AllNotes'
import A from '../notes/A.mp3'
import Ab from '../notes/Ab.mp3'
import B from '../notes/B.mp3'
import Bb from '../notes/Bb.mp3'
import C from '../notes/C.mp3'
import D from '../notes/D.mp3'
import Db from '../notes/Db.mp3'
import E from '../notes/E.mp3'
import Eb from '../notes/Eb.mp3'
import F from '../notes/F.mp3'
import G from '../notes/G.mp3'
import Gb from '../notes/Gb.mp3'

// { A, Ab, B, Bb, C, D, Db, E, Eb, F, G, Gb }

function Piano() {
  document.addEventListener('keypress', buttonKey => {
    console.log(buttonKey.key)
    if (buttonKey.repeat) return
    if (buttonKey.key === 'z') { 
      playNote(C) 
    } else if (buttonKey.key === 'x') { 
      playNote(D) 
    } else if (buttonKey.key === 'c') { 
      playNote(E) 
    } else if (buttonKey.key === 'v') { 
      playNote(F) 
    } else if (buttonKey.key === 'b') { 
      playNote(G) 
    } else if (buttonKey.key === 'n') { 
      playNote(A) 
    } else if (buttonKey.key === 'm') { 
      playNote(B) 
    } else if (buttonKey.key === 's') { 
      playNote(Db) 
    } else if (buttonKey.key === 'd') { 
      playNote(Eb) 
    } else if (buttonKey.key === 'g') { 
      playNote(Gb) 
    } else if (buttonKey.key === 'h') { 
      playNote(Ab) 
    } else if (buttonKey.key === 'j') { 
      playNote(Bb) 
    } 
  })

  const playNote = (key) => {
    const noteAudio = new Audio(key)
    noteAudio.currentTime = 0
    noteAudio.play()

    const pianoKeyId = `${key}`
  }
return (
  <div className="PianoSpace">
    <div className="piano">
      <div onClick={() => playNote(C)} id="C" className="key white"></div>
      <div onClick={() => playNote(Db)} id="Db" className="key black"></div>
      <div onClick={() => playNote(D)} id="D" className="key white"></div>
      <div onClick={() => playNote(Eb)} id="Eb" className="key black"></div>
      <div onClick={() => playNote(E)} id="E" className="key white"></div>
      <div onClick={() => playNote(F)} id="F" className="key white"></div>
      <div onClick={() => playNote(Gb)} id="Gb" className="key black"></div>
      <div onClick={() => playNote(G)} id="G" className="key white"></div>
      <div onClick={() => playNote(Ab)} id="Ab" className="key black"></div>
      <div onClick={() => playNote(A)} id="A" className="key white"></div>
      <div onClick={() => playNote(Bb)} id="Bb" className="key black"></div>
      <div onClick={() => playNote(B)} id="B" className="key white"></div>
    </div>
  </div>
)
}

export default Piano;