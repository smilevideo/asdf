import styled from 'styled-components';

const NameEntryLabel = styled.label`
`

const NameEntryInput = styled.input`
`

const PlayerSettings = (props) => {
  const { playerName, setPlayerName } = props;

  const handleChangePlayerName = (event) => {
    setPlayerName(event.target.value);
  };

  return (
    <>
      <NameEntryLabel>Name:</NameEntryLabel>
      <NameEntryInput
        type="text"
        value={playerName}
        onChange={handleChangePlayerName}
      ></NameEntryInput>
    </>
  )
}

export default PlayerSettings;
