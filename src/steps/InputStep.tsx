import React, { MouseEvent, useState } from 'react'
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
  const [freeSpaceSetting, setFreeSpaceSetting] = useState(FreeSpaceSetting.none)

  const onBingoLinesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLines(e.target.value)
  }

  const onNextClick = (e: MouseEvent) => {
    onComplete({
      lines: lines.split(/\n/g).map(line => line.trim()),
      freeSpaceSetting
    });
  }

  return (
    <Container>
      <Box className="intro" marginTop={2}>
        <h2>I am the input step</h2>
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
          variant="outlined"
        ></TextField>
        <FormControl component="fieldset">
          <FormLabel component="legend">Free Space Position</FormLabel>
          <RadioGroup aria-label="Free Space Position" name="freeSpacePosition" value={freeSpaceSetting} onChange={e => setFreeSpaceSetting(e.target.value as FreeSpaceSetting)}>
            <FormControlLabel value={FreeSpaceSetting.none} control={<Radio />} label="None" />
            <FormControlLabel value={FreeSpaceSetting.center} control={<Radio />} label="Center" />
            <FormControlLabel value={FreeSpaceSetting.random} control={<Radio />} label="Random" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box className="actions" marginTop={2}>
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