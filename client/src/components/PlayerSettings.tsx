import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  top: -300px;
  z-index: 1;

  height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`

const NameEntryLabel = styled.label`
`

const NameEntryInput = styled.input`
  border-radius: 5px;
`

const ColorEntryLabel = styled.label`
`

const ColorEntryInput = styled.input`
  border-radius: 5px;
  background-color: rgb(161, 161, 161);
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
    <Container>
      {/* <NameEntryLabel>Name:</NameEntryLabel>
      <NameEntryInput
        type="text"
        value={playerName}
        onChange={handleChangePlayerName}
      /> */}

      <ColorEntryLabel>Color:</ColorEntryLabel>
      <ColorEntryInput
        type="color"
        value={playerColor}
        onChange={handleChangePlayerColor}
      />
    </Container>
  )
}

export default PlayerSettings;
