import React, { Fragment, MouseEvent, useState } from 'react'
import { TextField, Button, Box, LinearProgress } from '@material-ui/core'
import lineSeedWords from '../lipsumSeed';
import { getRandomIntInclusive } from '../utils/random';

type Props = {
  onComplete: (linesToRender: string[]) => void;
}

export default function InputStep({ onComplete }: Props) {
  const lineSeed = new Array(25).fill("").map(() => {
    const numberOfWords = getRandomIntInclusive(1, 8);
    return new Array(numberOfWords).fill("").map(() => lineSeedWords[getRandomIntInclusive(0, lineSeedWords.length - 1)]).join(' ');
  }).join("\n");
  const [lines, setLines] = useState(lineSeed)

  const onBingoLinesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLines(e.target.value)
  }

  const onDoTheThingClick = (e: MouseEvent) => {
    onComplete(lines.split(/\n/g).map(line => line.trim()));
  }

  return (
    <Fragment>
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
    </Fragment>
  )
}