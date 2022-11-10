import React from 'react';
import { Box, TextField } from '@mui/material';

type Props = {
  onChange: (lines: string[]) => void,
  lines: string[],
  label: string
}

export default function BingoInput({
  onChange,
  lines,
  label
}: Props) {

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
          sx: {
            whiteSpace: 'pre',
            wordWrap: 'normal',
            overflowX: 'auto'
          }
        }}
        variant="outlined"
      ></TextField>
    </Box>
  )
}