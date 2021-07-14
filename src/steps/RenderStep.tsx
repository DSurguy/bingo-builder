import React, { useRef, useState, useEffect } from 'react';
import { Box, LinearProgress, Container, Backdrop, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { waitUntil } from '../utils/timeout';
import { gridStyles } from './styles';
import { BaseFontSize, SingleBoxSizePx } from '../utils/constants';
import { LineAndStyle } from '../types';

type Props = {
  linesToRender: string[];
  onComplete: (linesAndStyles: LineAndStyle[]) => void;
}

const useStyles = makeStyles({
  percent: {
    fontSize: '2rem',
    textAlign: 'center'
  }
})

export default function RenderStep({ linesToRender, onComplete }: Props) {
  const gridClasses = gridStyles();
  const [lineFontSizes, setLineFontSizes] = useState([] as number[]);
  const [progress, setProgress] = useState(0);
  const [renderState, updateRenderState] = useState({
    currentLine: 0,
    currentLineFontSize: BaseFontSize
  });
  const renderedTextSpan = useRef<HTMLSpanElement>(null);
  const styles = useStyles();

  useEffect(() => {
    (async () => {
      await waitUntil(() => renderedTextSpan.current!.innerText.trim() === linesToRender[renderState.currentLine]);
      if ((renderedTextSpan.current!.offsetHeight > SingleBoxSizePx.h || renderedTextSpan.current!.offsetWidth > SingleBoxSizePx.w) && renderState.currentLineFontSize > 6) {
        updateRenderState({
          currentLine: renderState.currentLine,
          currentLineFontSize: renderState.currentLineFontSize - 1
        })
      }
      else if (renderState.currentLine === linesToRender.length - 1) {
        //we're done
        const finalFontSizes = lineFontSizes.concat([renderState.currentLineFontSize]);
        setLineFontSizes(finalFontSizes);
        setProgress(100);
        setTimeout(() => {
          onComplete(
            linesToRender.map((line, index) => ({
              line,
              fontSize: finalFontSizes[index]
            }))
          )
        }, 1000)
      }
      else {
        setLineFontSizes(lineFontSizes.concat([renderState.currentLineFontSize]))
        setProgress(
          Math.floor((renderState.currentLine + 1) / linesToRender.length * 100)
        )
        updateRenderState({
          currentLine: renderState.currentLine + 1,
          currentLineFontSize: BaseFontSize
        })
      }
    })()
  }, [renderState]);

  return (
    <Container>
      {progress < 100 && <Box className="renderSandbox">
        <Box className={`${gridClasses.gridItem}`}>
          <span style={{
            fontSize: `${renderState.currentLineFontSize}px`
          }} ref={renderedTextSpan}>
            {linesToRender[renderState.currentLine]}
          </span>
        </Box>
      </Box>}
      <Backdrop open>
        <Paper elevation={1}>
          <Box margin={2}>
            <h2>Rendering</h2>
            <p>
              We're calculating an appropriate font size for each of your bingo lines, please wait a moment!
            </p>
            <p className={styles.percent}>
              {progress}%
            </p>
            <Box className="progress">
              <LinearProgress variant="determinate" value={progress} />
            </Box>
          </Box>
        </Paper>
      </Backdrop>
    </Container>
  )
}