import React, { MouseEvent, useState, useEffect } from 'react'
import { TextField, Button, Box, Container, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import lineSeedWords from '../lipsumSeed';
import { getRandomIntInclusive } from '../utils/random';
import { FreeSpaceSetting, InputStepOutput } from './types';

type Props = {
  onComplete: (output: InputStepOutput) => void;
}

export default function InputStep({ onComplete }: Props) {
  const lineSeed = new Array(25).fill("").map(() => {
    const numberOfWords = getRandomIntInclusive(1, 8);
    return new Array(numberOfWords).fill("").map(() => lineSeedWords[getRandomIntInclusive(0, lineSeedWords.length - 1)]).join(' ');
  }).join("\n");
  const [lines, setLines] = useState(lineSeed)
  const [numLines, setNumLines] = useState(25)
  const [freeSpaceSetting, setFreeSpaceSetting] = useState(FreeSpaceSetting.none)

  const onBingoLinesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLines(e.target.value)
  }

  const onNextClick = (e: MouseEvent) => {
    const paddedLines = lines.split(/[\n\r]/g).map(line => line.trim()).filter(l => l);
    while(paddedLines.length < 25) paddedLines.push("");

    onComplete({
      lines: paddedLines,
      freeSpaceSetting
    });
  }

  useEffect(() => {
    setNumLines(lines.split(/[\n\r]/g).map(line => line.trim()).filter(l => l).length)
  }, [lines])

  return (
    <Container>
      <Box className="intro" marginTop={2}>
        <h1>Bingo Builder</h1>
        <Box>
          <h2>Instructions</h2>
          <p>
            Please enter as many bingo square entries as you like below, one per line. Empty lines will be ignored.
          </p>
          <p>
            At this time, the bingo board is limited to 5x5 (25) squares. Each board will use a random selection of 
            25 of the lines below. If fewer than 25 lines are provided, empty spaces will be used to fill the rest
            of the squares.
          </p>
        </Box>
      </Box>
      <Box marginTop={2}>
        <TextField
          id="bingoLines"
          label={`Bingo Lines (${numLines})`}
          multiline
          value={lines}
          onChange={onBingoLinesChange}
          fullWidth
          InputProps={{
            fullWidth: true
          }}
          variant="outlined"
        ></TextField>
      </Box>
      <Box marginTop={2}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Free Space Position</FormLabel>
          <RadioGroup aria-label="Free Space Position" name="freeSpacePosition" value={freeSpaceSetting} onChange={e => setFreeSpaceSetting(e.target.value as FreeSpaceSetting)}>
            <FormControlLabel value={FreeSpaceSetting.none} control={<Radio />} label="None" />
            <FormControlLabel value={FreeSpaceSetting.center} control={<Radio />} label="Center" />
            <FormControlLabel value={FreeSpaceSetting.random} control={<Radio />} label="Random" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box className="actions" marginTop={2} marginBottom={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={onNextClick}
        >
          Next
        </Button>
      </Box>
    </Container>
  )
}