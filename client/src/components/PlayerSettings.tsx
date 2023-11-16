import styled from 'styled-components';

const NameEntryLabel = styled.label`
`

const NameEntryInput = styled.input`
`

const ColorEntryLabel = styled.label`
`

const ColorEntryInput = styled.input`
`

interface PlayerSettingsProps {
  playerName: string,
  setPlayerName: (input: string) => void,
  playerColor: string,
  setPlayerColor: (input: string) => void,
}

const PlayerSettings = (props: PlayerSettingsProps) => {
  const { playerName, setPlayerName, playerColor, setPlayerColor } = props;

  const handleChangePlayerName = (event: { target: { value: string; }; }) => {
    setPlayerName(event.target.value);
  };

  const handleChangePlayerColor = (event: { target: { value: string; }; }) => {
    setPlayerColor(event.target.value);
  };

  return (
    <>
      <NameEntryLabel>Name:</NameEntryLabel>
      <NameEntryInput
        type="text"
        value={playerName}
        onChange={handleChangePlayerName}
      />

      <ColorEntryLabel>Color:</ColorEntryLabel>
      <ColorEntryInput
        type="color"
        value={playerColor}
        onChange={handleChangePlayerColor}
      />
    </>
  )
}

export default PlayerSettings;
