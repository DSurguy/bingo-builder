import React, { MouseEvent, useState } from 'react'
import { TextField, Container, Button, Box, LinearProgress } from '@material-ui/core'
import lineSeedWords from './lipsumSeed';
import { getRandomIntInclusive } from './utils/random';
import './App.css'

function App() {
  const lineSeed = new Array(25).fill("").map(stub => {
    const numberOfWords = getRandomIntInclusive(1, 8);
    return new Array(numberOfWords).fill("").map(innerStub => lineSeedWords[getRandomIntInclusive(0, lineSeedWords.length - 1)]).join(' ');
  }).join("\n");
  const [lines, setLines] = useState(lineSeed)
  const [progress, setProgress] = useState(0)
  const [inProgress, setInProgress] = useState(false);

  const onBingoLinesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLines(e.target.value)
  }

  const onDoTheThingClick = (e: MouseEvent) => {
    setInProgress(true);
    setProgress(0);
  }

  return (
    <Container className="app">
      <Box className="intro" marginTop={2}>
        <h2>Hello</h2>
      </Box>
      <Box marginTop={2}>
        <TextField
          id="bingoLines"
          label="Bingo Lines"
          multiline
          value={lines}
          onChange={onBingoLinesChange}
          helperText="Enter one bingo action per line"
          fullWidth
          InputProps={{
            fullWidth: true
          }}
        ></TextField>
      </Box>
      <Box className="actions" marginTop={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={onDoTheThingClick}
        >
          Do the thing
        </Button>
      </Box>
      {inProgress && (<Box className="progress" marginTop={2}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>)}
    </Container>
  )
}

export default App
