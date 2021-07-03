import React, { Fragment } from 'react';
import { Box } from '@material-ui/core'

type Props = {
  linesToRender: string[];
}

export default function RenderStep({linesToRender}: Props) {
  
  const gridRows = linesToRender.reduce((rows, line, index) => {
    const rowIndex = index%5;
    if( !rows[rowIndex] ) rows[rowIndex] = [] as string[];
    rows[rowIndex].push(line);
    return rows;
  }, [] as string[][])

  //TODO: Pick a box size and default font
  // render each line into the box and shrink the font until it fits
  // store font size by line
  return (
    <Fragment>
      <Box className="intro">I am the render step</Box>
      <Box className="grid">
      {
        gridRows.map((row, rowIndex) => {
          return row.map((line, lineIndex) => {
            return <Box className="gridItem" key={rowIndex*5 + lineIndex}>{line}</Box>
          })
        })
      }
      </Box>
    </Fragment>
  )
}