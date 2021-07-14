import React, { Fragment, FormEvent, useState, useEffect } from 'react';
import { Box, TextField, Button, Container } from '@material-ui/core';
import { gridStyles } from './styles';
import jsPDF from 'jspdf';
import { LineAndStyle } from '../types';
import { PaperSizeMillis, SingleBoxSizeMilli } from '../utils/constants';
import { pxFontToPt } from '../utils/conversions';
import { FreeSpaceSetting } from './types';
import { getRandomIntInclusive } from '../utils/random';

type Props = {
  linesAndStyles: LineAndStyle[];
  freeSpaceSetting: FreeSpaceSetting;
}

export default function OutputStep({ linesAndStyles, freeSpaceSetting }: Props) {
  const [numGrids, setNumGrids] = useState('4');
  const [numGridsError, setNumGridsError] = useState("");
  const [grids, setGrids] = useState([] as Props['linesAndStyles'][][])
  const gridClasses = gridStyles();
  const [gridScale, setGridScale] = useState(1);

  const linesToGrid = (lines: Props['linesAndStyles']) => {
    let freeSpaceIndex: number;
    switch(freeSpaceSetting) {
      case FreeSpaceSetting.center: freeSpaceIndex = Math.floor( lines.length / 2); break;
      case FreeSpaceSetting.random: freeSpaceIndex = getRandomIntInclusive(0, lines.length-1); break;
      default: freeSpaceIndex = -1;
    }
    return lines.reduce((rows, lineAndStyle, index) => {
      const rowIndex = Math.floor(index / 5);
      if (!rows[rowIndex]) rows[rowIndex] = [];
      if( freeSpaceSetting !== FreeSpaceSetting.none && index === freeSpaceIndex ) rows[rowIndex].push({line: "", fontSize: 16})
      else rows[rowIndex].push(lineAndStyle);
      return rows;
    }, [] as Props['linesAndStyles'][]);
  };

  const onNumGridsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(e.target.value);
    if( isNaN(parsedValue) ) {
      setNumGridsError("Value must be a number");
    }
    else {
      setNumGridsError("");
    }
    setNumGrids(e.target.value)
  }

  const renderSheets = () => {
    const parsedNumGrids = parseInt(numGrids.toString());
    if( isNaN(parsedNumGrids) ) {
      return;
    }

    const grids: Props['linesAndStyles'][][] = [];
    const randomSort = () => {
      const gen = Math.random();
      return gen > 0.5 ? 1 : gen < 0.5 ? -1 : 0;
    }

    for( let i=0; i<parsedNumGrids; i++ ){
      grids.push(
        linesToGrid(linesAndStyles.slice(0).sort(randomSort).slice(0, 25))
      );
    }

    setGrids(grids);
  }

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    renderSheets();
    onWindowResize();
  }

  const generatePdf = () => {
    const grid = grids[0];
    if( !grid ) return;
    const pdf = new jsPDF({
      format: 'letter'
    });
    pdf.setDrawColor('#333333');
    let currentPage = 0;
    grids.forEach((grid, gridIndex) => {
      //currently, we assume 4 grids per page.
      const pageOffset = Math.floor(gridIndex/4);
      if( pageOffset !== currentPage ){
        pdf.addPage();
        currentPage = pageOffset;
      }
      // =[]=[] or =[]
      const xOffset = gridIndex % 2 === 0 ? PaperSizeMillis.w*0.2/3 : PaperSizeMillis.w*0.4/3 + PaperSizeMillis.w*0.4;
      // This is basically the row it's in
      const yOffset = gridIndex % 4 < 2 ? PaperSizeMillis.h*0.2/3 : PaperSizeMillis.h*0.4/3 + PaperSizeMillis.h*0.4;
      const gridOffset = {
        x: xOffset,
        y: yOffset
      };
      grid.forEach((row, rowIndex) => {
        row.forEach((box, boxIndex) => {
          try {
            pdf.rect(
              gridOffset.x + boxIndex * SingleBoxSizeMilli.w, //x
              gridOffset.y + rowIndex * SingleBoxSizeMilli.h, //y
              SingleBoxSizeMilli.w, //w
              SingleBoxSizeMilli.h, //h
              'S'
            );
            pdf.setFontSize(pxFontToPt(box.fontSize))
            pdf.text(
              box.line,
              gridOffset.x + boxIndex * SingleBoxSizeMilli.w + SingleBoxSizeMilli.w/2, //x
              gridOffset.y + rowIndex * SingleBoxSizeMilli.h, //y,
              {
                align: 'center',
                maxWidth: SingleBoxSizeMilli.w,
                baseline: 'top'
              }
            )
          } catch (e) {
            console.error(e);
          }
        })
      })
    })
    pdf.save('bingoSheets.pdf');
  }

  const onWindowResize = () => setGridScale(
    window.innerWidth * 0.85 < 400
    ? window.innerWidth * 0.85 / 400
    : 1
  );

  useEffect(() => {
    window.addEventListener('resize', onWindowResize)
    onWindowResize();
    return () => window.removeEventListener('resize', onWindowResize);
  }, [])

  const renderGrid = () => {
    return (
      <Box marginBottom={2} className={gridScale !== 1 ? gridClasses.gridContainer : undefined}>
        <Box>
          <h2>Sample Output</h2>
        </Box>
        <div className={gridClasses.grid} style={{
          transform: `scale(${gridScale.toFixed(2)})`,
          transformOrigin: 'top left'
        }}>
          {grids[0].map((row, rowIndex) => {
            return (<Box className={gridClasses.gridRow} key={rowIndex}>
              {row.map((lineAndStyle, lineIndex) => {
                return <Box 
                  className={`${gridClasses.gridItem}`}
                  style={{
                    fontSize: `${lineAndStyle.fontSize}px`
                  }}
                  key={`${rowIndex}.${lineIndex}`}
                >{lineAndStyle.line}</Box>
              })}
            </Box>)
          })}
        </div>
      </Box>
    )
  }

  return (
    <Fragment>
      <Container>
        <Box marginTop={2} marginBottom={2}>
          <Box>
            <h1>Output</h1>
            <p>
              Please enter the number of bingo sheets you would like to generate. At this time, 4 sheets will be printed per page.
            </p>
            <p>
              The page size is assumed to be a standard American letter size (8.5in x 11in) (216mm x 279mm).
            </p>
          </Box>
          <form onSubmit={onFormSubmit}>
            <Box marginTop={2}>
              <TextField
                label="Number of Bingo Sheets"
                error={!!numGridsError}
                helperText={numGridsError}
                onChange={onNumGridsChange}
                value={numGrids}
                type="number"
              />
            </Box>
            <Box marginTop={2}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!!numGridsError}
              >
                Generate Sheets
              </Button>
              <Box component="span" marginLeft={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={generatePdf}
                  disabled={!grids || !grids[0]}
                >
                  Create PDF
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
        { grids[0] && gridScale === 1 && renderGrid()}
      </Container>
      { grids[0] && gridScale !== 1 && renderGrid()}
    </Fragment>
  )
}