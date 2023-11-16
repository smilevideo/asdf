import { useState } from 'react'
import './App.css'
import PlayerSettings from './components/PlayerSettings';
import Game from './components/Game';

function App() {
  const [playerName, setPlayerName] = useState("");
  const [playerColor, setPlayerColor] = useState("#000000");

  return (
    <>
      <PlayerSettings
        playerName={playerName}
        setPlayerName={setPlayerName}
        playerColor={playerColor}
        setPlayerColor={setPlayerColor}
      />

      <Game
        playerName={playerName}
        playerColor={playerColor}
      />
    </>
  )
}

export default App
