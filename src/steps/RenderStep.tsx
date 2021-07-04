import React, { useRef, Fragment, useState, useEffect } from 'react';
import { Box, LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { timeout, waitUntil } from '../utils/timeout';

const useStyles = makeStyles({
  gridRow: {
    display: 'flex',
    alignItems: 'center'
  },
  gridItem: {
    border: '1px solid #444',
    width: '80px',
    height: '100px',
    textAlign: 'center'
  },
  font0: {
    fontSize: '16px'
  },
  font1: {
    fontSize: '15px'
  },
  font2: {
    fontSize: '14px'
  },
  font3: {
    fontSize: '13px'
  },
  font4: {
    fontSize: '12px'
  },
  font5: {
    fontSize: '11px'
  },
  font6: {
    fontSize: '10px'
  }
})

type Props = {
  linesToRender: string[];
}

export default function RenderStep({ linesToRender }: Props) {
  const classes = useStyles();
  const [lineStyles, setLineStyles] = useState([] as number[]);
  const [progress, setProgress] = useState(0);
  const [renderState, updateRenderState] = useState({
    currentLine: 0,
    currentLineStyle: 0
  });
  const renderedTextSpan = useRef<HTMLSpanElement>(null);

  const fontStyleArray = [
    classes.font0,
    classes.font1,
    classes.font2,
    classes.font3,
    classes.font4,
    classes.font5,
    classes.font6
  ];

  const gridRows = linesToRender.reduce((rows, line, index) => {
    const rowIndex = Math.floor(index / 5);
    if (!rows[rowIndex]) rows[rowIndex] = [] as string[];
    rows[rowIndex].push(line);
    return rows;
  }, [] as string[][]);

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
        setProgress(100);
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

  //TODO: Pick a box size and default font
  // render each line into the box and shrink the font until it fits
  // store font size by line
  return (
    <Fragment>
      <Box className="intro">
        <h2>I am the render step</h2>
      </Box>
      {progress < 100 && <Box className="renderSandbox">
        <Box className={`${classes.gridItem}`}>
          <span className={fontStyleArray[renderState.currentLineStyle]} ref={renderedTextSpan}>
            {linesToRender[renderState.currentLine]}
          </span>
        </Box>
      </Box>}
      {progress < 100 && <Box className="progress">
        <LinearProgress variant="determinate" value={progress} />
      </Box>}
      {progress === 100 && <Box className="grid">
        {
          gridRows.map((row, rowIndex) => {
            return (<Box className={classes.gridRow} key={rowIndex}>
              {row.map((line, lineIndex) => {
                const actualLineIndex = rowIndex * 5 + lineIndex;
                return <Box 
                  className={`${classes.gridItem} ${fontStyleArray[lineStyles[actualLineIndex]]}`}
                  key={`${rowIndex}.${lineIndex}`}
                >{line}</Box>
              })}
            </Box>)
          })
        }
      </Box>}
    </Fragment>
  )
}