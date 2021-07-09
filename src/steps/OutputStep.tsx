import React, { FormEvent, useEffect, useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { gridStyles } from './styles';
import jsPDF from 'jspdf';
import { LineAndStyle } from '../types';
import { PaperSizeMillis, SingleBoxSizeMilli } from '../utils/constants';
import { pxFontToPt } from '../utils/conversions';

const useStyles = makeStyles({
  gridLayout: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
})

type Props = {
  linesAndStyles: LineAndStyle[];
}

export default function OutputStep({ linesAndStyles }: Props) {
  const [numGrids, setNumGrids] = useState('4');
  const [numGridsError, setNumGridsError] = useState("");
  const [grids, setGrids] = useState([] as Props['linesAndStyles'][][])
  const gridClasses = gridStyles();
  const styles = useStyles();

  const linesToGrid = (lines: Props['linesAndStyles']) => lines.reduce((rows, lineAndStyle, index) => {
    const rowIndex = Math.floor(index / 5);
    if (!rows[rowIndex]) rows[rowIndex] = [];
    rows[rowIndex].push(lineAndStyle);
    return rows;
  }, [] as Props['linesAndStyles'][]);

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
        linesToGrid(linesAndStyles.slice(0).sort(randomSort))
      );
    }

    setGrids(grids);
  }

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    renderSheets();
  }

  const generatePdf = () => {
    const grid = grids[0];
    if( !grid ) return;
    const pdf = new jsPDF();
    pdf.setDrawColor('#333333');
    const GridOffset = {
      x: PaperSizeMillis.w*0.2/3,
      y: PaperSizeMillis.h*0.2/3
    }
    grid.forEach((row, rowIndex) => {
      row.forEach((box, boxIndex) => {
        try {
          pdf.rect(
            GridOffset.x + boxIndex * SingleBoxSizeMilli.w, //x
            GridOffset.y + rowIndex * SingleBoxSizeMilli.h, //y
            SingleBoxSizeMilli.w, //w
            SingleBoxSizeMilli.h, //h
            'S'
          );
          pdf.setFontSize(pxFontToPt(box.fontSize))
          pdf.text(
            box.line,
            GridOffset.x + boxIndex * SingleBoxSizeMilli.w + SingleBoxSizeMilli.w/2, //x
            GridOffset.y + rowIndex * SingleBoxSizeMilli.h, //y,
            {
              align: 'center',
              maxWidth: SingleBoxSizeMilli.w,
              baseline: 'top'
            }
          )
        } catch (e) {
          console.error(e);
          console.log(box);
        }
      })
    })
    pdf.save('testo.pdf');
  }

  return (
    <div>
      <Box>
        <form onSubmit={onFormSubmit}>
          <Box marginTop={2}>
            <TextField
              label="How many grids?"
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
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={generatePdf}
            >
              Create PDF
            </Button>
          </Box>
        </form>
      </Box>
      <Box className={styles.gridLayout} marginTop={2}>
        <Box>
          {grids[0] && grids[0].map((row, rowIndex) => {
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
        </Box>
      </Box>
    </div>
  )
}