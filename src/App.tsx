import React, { useState } from 'react'
import { TextField, Container, Button, Box } from '@material-ui/core'
import './App.css'

function App() {
  const [lines, setLines] = useState("")

  const onBingoLinesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLines(e.target.value)
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
        ></TextField>
      </Box>
      <Box className="actions" marginTop={2}>
        <Button variant="contained" color="primary">Do the thing</Button>
      </Box>
    </Container>
  )
}

export default App
