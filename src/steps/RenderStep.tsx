import React, { Fragment } from 'react';
import { Box } from '@material-ui/core'

type Props = {
  linesToRender: string[];
}

export default function RenderStep({linesToRender}: Props) {
  return (
    <Fragment>
      <Box className="intro">I am the render step</Box>
      <Box className="linesToRender">
        {linesToRender.map(line => <div>{line}</div>)}
      </Box>
    </Fragment>
  )
}