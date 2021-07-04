import React, { useRef, Fragment, useState, useEffect } from 'react';
import { Box, LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { waitUntil } from '../utils/timeout';
import { fontSizes, gridStyles } from './styles';

type Props = {
  linesToRender: string[];
  onComplete: (linesAndStyles: {
    line: string;
    style: number;
  }[]) => void;
}

export default function RenderStep({ linesToRender, onComplete }: Props) {
  const gridClasses = gridStyles();
  const fontStyles = fontSizes();
  const [lineStyles, setLineStyles] = useState([] as number[]);
  const [progress, setProgress] = useState(0);
  const [renderState, updateRenderState] = useState({
    currentLine: 0,
    currentLineStyle: 0
  });
  const renderedTextSpan = useRef<HTMLSpanElement>(null);

  const fontStyleArray = [
    fontStyles.font0,
    fontStyles.font1,
    fontStyles.font2,
    fontStyles.font3,
    fontStyles.font4,
    fontStyles.font5,
    fontStyles.font6
  ];

  useEffect(() => {
    (async () => {
      await waitUntil(() => renderedTextSpan.current!.innerText.trim() === linesToRender[renderState.currentLine]);
      if( (renderedTextSpan.current!.offsetHeight > 100 || renderedTextSpan.current!.offsetWidth > 80) && renderState.currentLineStyle < 6 ){
        updateRenderState({
          currentLine: renderState.currentLine,
          currentLineStyle: renderState.currentLineStyle+1
        })
      }
      else if( renderState.currentLine === linesToRender.length -1 ){
        //we're done
        setLineStyles(lineStyles.concat([renderState.currentLineStyle]));
        onComplete(
          linesToRender.map((line, index) => ({
            line,
            style: lineStyles[index]
          }))
        )
      }
      else {
        setLineStyles(lineStyles.concat([renderState.currentLineStyle]))
        setProgress(Math.floor((renderState.currentLine+1)/linesToRender.length))
        updateRenderState({
          currentLine: renderState.currentLine+1,
          currentLineStyle: 0
        })
      }
    })()
  }, [renderState]);

  return (
    <Fragment>
      <Box className="intro">
        <h2>I am the render step</h2>
      </Box>
      {progress < 100 && <Box className="renderSandbox">
        <Box className={`${gridClasses.gridItem}`}>
          <span className={fontStyleArray[renderState.currentLineStyle]} ref={renderedTextSpan}>
            {linesToRender[renderState.currentLine]}
          </span>
        </Box>
      </Box>}
      <Box className="progress">
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </Fragment>
  )
}