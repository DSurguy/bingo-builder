import React, { useRef, useState, useEffect } from 'react';
import { Box, LinearProgress, Container } from '@material-ui/core'
import { waitUntil } from '../utils/timeout';
import { gridStyles } from './styles';
import { BaseFontSize, SingleBoxSizePx } from '../utils/constants';
import { LineAndStyle } from '../types';

type Props = {
  linesToRender: string[];
  onComplete: (linesAndStyles: LineAndStyle[]) => void;
}

export default function RenderStep({ linesToRender, onComplete }: Props) {
  const gridClasses = gridStyles();
  const [lineFontSizes, setLineFontSizes] = useState([] as number[]);
  const [progress, setProgress] = useState(0);
  const [renderState, updateRenderState] = useState({
    currentLine: 0,
    currentLineFontSize: BaseFontSize
  });
  const renderedTextSpan = useRef<HTMLSpanElement>(null);

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
        onComplete(
          linesToRender.map((line, index) => ({
            line,
            fontSize: finalFontSizes[index]
          }))
        )
      }
      else {
        setLineFontSizes(lineFontSizes.concat([renderState.currentLineFontSize]))
        setProgress(Math.floor((renderState.currentLine + 1) / linesToRender.length))
        updateRenderState({
          currentLine: renderState.currentLine + 1,
          currentLineFontSize: BaseFontSize
        })
      }
    })()
  }, [renderState]);

  return (
    <Container>
      <Box className="intro">
        <h2>I am the render step</h2>
      </Box>
      {progress < 100 && <Box className="renderSandbox">
        <Box className={`${gridClasses.gridItem}`}>
          <span style={{
            fontSize: `${renderState.currentLineFontSize}px`
          }} ref={renderedTextSpan}>
            {linesToRender[renderState.currentLine]}
          </span>
        </Box>
      </Box>}
      <Box className="progress">
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </Container>
  )
}