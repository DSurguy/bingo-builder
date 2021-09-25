import React, { useRef, useState, useEffect } from 'react';
import { Box, LinearProgress, Container, Backdrop, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { waitUntil } from '../utils/timeout';
import { gridStyles } from './styles';
import { BaseFontSize, SingleBoxSizePx } from '../utils/constants';
import { LinesByDifficulty, LineAndStyle, LineAndStyleByDifficulty, DifficultyKey } from '../types';

type Props = {
  linesToRender: LinesByDifficulty,
  onComplete: (linesAndStyles: LineAndStyleByDifficulty) => void;
}

const useStyles = makeStyles({
  percent: {
    fontSize: '2rem',
    textAlign: 'center'
  }
})

export default function RenderStep({ linesToRender, onComplete }: Props) {
  const gridClasses = gridStyles();
  const [lineFontSizes, setLineFontSizes] = useState({
    easy: [] as number[],
    medium: [] as number[],
    hard: [] as number[]
  });
  const [progress, setProgress] = useState(0);
  const [renderState, updateRenderState] = useState({
    currentLine: 0,
    currentDifficulty: 'easy' as DifficultyKey,
    currentLineFontSize: BaseFontSize
  });
  const renderedTextSpan = useRef<HTMLSpanElement>(null);
  const styles = useStyles();
  const [openBackdrop, setOpenBackdrop] = useState(true);
  const incrementalProgress = 100 / (linesToRender.easy.length + linesToRender.medium.length + linesToRender.hard.length);

  useEffect(() => {
    (async () => {
      await waitUntil(() => renderedTextSpan.current!.innerText.trim() === linesToRender[renderState.currentDifficulty][renderState.currentLine]);
      if ((renderedTextSpan.current!.offsetHeight > SingleBoxSizePx.h * .95 || renderedTextSpan.current!.offsetWidth > SingleBoxSizePx.w * .95) && renderState.currentLineFontSize > 6) {
        updateRenderState({
          ...renderState,
          currentLineFontSize: renderState.currentLineFontSize - 1
        })
      }
      else if (renderState.currentLine === linesToRender[renderState.currentDifficulty].length - 1) {
        if( renderState.currentDifficulty !== "hard" ) {
          setLineFontSizes({
            ...lineFontSizes,
            [renderState.currentDifficulty]: lineFontSizes[renderState.currentDifficulty].concat([renderState.currentLineFontSize])
          })
          updateRenderState({
            currentLine: 0,
            currentDifficulty: renderState.currentDifficulty === 'easy' ? 'medium' : 'hard',
            currentLineFontSize: BaseFontSize
          })
        }
        else {
          //we're done
          const finalFontSizes = {
            ...lineFontSizes,
            [renderState.currentDifficulty]: lineFontSizes[renderState.currentDifficulty].concat([renderState.currentLineFontSize])
          }
          setLineFontSizes(finalFontSizes);
          setProgress(100);
          const toLineAndStyles = (lines: string[], difficulty: DifficultyKey): LineAndStyle[] => lines.map((line, index) => ({
            line,
            fontSize: finalFontSizes[difficulty][index]
          }))
          setTimeout(() => {
            setOpenBackdrop(false);
            setTimeout(() => {
              onComplete({
                easy: toLineAndStyles(linesToRender.easy, 'easy'),
                medium: toLineAndStyles(linesToRender.medium, 'medium'),
                hard: toLineAndStyles(linesToRender.hard, 'hard')
              })
            }, 200);
          }, 500)
        }
      }
      else {
        setLineFontSizes({
          ...lineFontSizes,
          [renderState.currentDifficulty]: lineFontSizes[renderState.currentDifficulty].concat([renderState.currentLineFontSize])
        })
        setProgress(progress + incrementalProgress)
        updateRenderState({
          ...renderState,
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
            {linesToRender[renderState.currentDifficulty][renderState.currentLine]}
          </span>
        </Box>
      </Box>}
      <Backdrop open={openBackdrop}>
        <Paper elevation={1}>
          <Box margin={2}>
            <h2>Rendering</h2>
            <p>
              We're calculating an appropriate font size for each of your bingo lines, please wait a moment!
            </p>
            <p className={styles.percent}>
              {progress.toFixed(2)}%
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