import React from 'react';
import { Box, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

type Props = {
  onChange: (lines: string[]) => void,
  lines: string[],
  label: string
}

const useTextFieldStyles = makeStyles({
  input: {
    whiteSpace: 'pre',
    wordWrap: 'normal',
    overflowX: 'auto'
  }
})

export default function BingoInput({
  onChange,
  lines,
  label
}: Props) {
  const textFieldStyles = useTextFieldStyles();

  const getNumLines = () => lines.map(line => line.trim()).length
  const getNumLinesTrimmed = () => lines.map(line => line.trim()).filter(l => l).length

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.split(/[\n\r]/g));
  }

  return (
    <Box marginTop={2}>
      <TextField
        label={`${label} Bingo Lines (${getNumLinesTrimmed()})`}
        multiline
        minRows={getNumLines()}
        value={lines.join('\r')}
        onChange={handleOnChange}
        fullWidth
        InputProps={{
          fullWidth: true,
          classes: textFieldStyles
        }}
        variant="outlined"
      ></TextField>
    </Box>
  )
}