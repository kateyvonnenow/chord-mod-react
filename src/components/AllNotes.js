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
import Piano from './Piano'

function AllNotes() {
  return (
    <Piano 
      A={A}
      Ab={Ab}
      B={B}
      Bb={Bb}
      C={C}
      D={Db}
      Db={Db}
      E={E}
      Eb={Eb}
      F={F}
      G={G}
      Gb={Gb}
    />
  )
}

export default AllNotes;