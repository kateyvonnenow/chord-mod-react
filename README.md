# ChordMod

## :guitar: [Browse](https://murmuring-cove-11425.herokuapp.com/) ChordMod now! :musical_keyboard:

## :book: About ChordMod + How to Use

Need to read or write some songs? Come browse through ChordMod's Library of songs to read chords and lyrics, and even write your own! (Think of this app as a smaller version of Ultimate Guitar). You can even play along on the spot with the online piano while reading songs!

:cake: FEATURES :cake:
- Interactive online piano while reading songs
- Read + Write Songs
- Edit current songs

## :pencil2: Planning & problem Solving

- Determining MVP: The app's MVP is to serve as a neat little platform/library to read + write songs/chords from. The main aim was for users to be able to create, read, update and delete songs.

- Planning for special features: In hopes of implementing extra features in the future, consideration of how code was written from the beginning was significant. A specific feature I plan to include is the ability for users to play audio of chords upon clicking on the chords themselves. My approach to this problem was separating each published chord as its own div. To implement the chord audio, I now have to determine if I am to produce each chord based on the individual note audio files I already have within the root folder. Originally, I was planning to use Web Audio API, but in the timeframe I had to initially complete this project, I had to reconsider my approach and decided to use Web Audio API after the project.

## :rocket: Cool tech

- React + JavaScript + HTML + SCSS + Express + PostgreSQL

## :scream: bugs to fix :shit:

- ~~Refreshing page doesn't keep user on same page~~
- ~~Couldn't render SheetMusic component upon onCLick from button~~
- ~~Replay button showing below the background~~
- Piano audio volume immensely multiplies when interacting using keyboard (pLays normal when only clicking) :rage:
- White is cut off at the top of 'Browse' page causing songs to appear at when scrolling down.

## :sob: Lessons learnt

What I would do differently if I could wind back the clock...

- Make good practice.
- Do not ever put express on the same working folder as react. 
- I would make more animations,

## :white_check_mark: Future features

- Chord Audio preview
- Keyboard interaction with online piano
- Fetch song lyrics/chords from third party API
- Login features
