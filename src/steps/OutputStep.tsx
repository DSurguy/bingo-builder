import React, { FormEvent, Fragment, useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { fontSizes, gridStyles } from './styles';

type Props = {
  linesAndStyles: {
    line: string;
    style: number;
  }[];
}

export default function OutputStep({ linesAndStyles }: Props) {
  const [numGrids, setNumGrids] = useState(4 as number|string);
  const [numGridsError, setNumGridsError] = useState("");
  const [grids, setGrids] = useState([] as Props['linesAndStyles'][][])
  const gridClasses = gridStyles();
  const fontStyles = fontSizes();

  const fontStyleArray = [
    fontStyles.font0,
    fontStyles.font1,
    fontStyles.font2,
    fontStyles.font3,
    fontStyles.font4,
    fontStyles.font5,
    fontStyles.font6
  ];

  const linesToGrid = (lines: Props['linesAndStyles']) => lines.reduce((rows, lineAndStyle, index) => {
    const rowIndex = Math.floor(index / 5);
    if (!rows[rowIndex]) rows[rowIndex] = [];
    rows[rowIndex].push(lineAndStyle);
    return rows;
  }, [] as Props['linesAndStyles'][]);

  const onNumGridsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(e.target.value);
    if( isNaN(parsedValue) ) {
      setNumGrids(e.target.value)
      setNumGridsError("Value must be a number");
    }
    else {
      setNumGridsError("");
      setNumGrids(parseInt(e.target.value))
    }
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

  return (
    <Fragment>
      <Box className="intro">
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
          </Box>
        </form>
      </Box>
      <Box className="grids" marginTop={2}>
        {grids.map((grid, gridIndex) => {
          return (<Box className="grid" key={gridIndex} marginTop={4}>
            {grid.map((row, rowIndex) => {
              return (<Box className={gridClasses.gridRow} key={rowIndex}>
                {row.map((lineAndStyle, lineIndex) => {
                  return <Box 
                    className={`${gridClasses.gridItem} ${fontStyleArray[lineAndStyle.style]}`}
                    key={`${rowIndex}.${lineIndex}`}
                  >{lineAndStyle.line}</Box>
                })}
              </Box>)
            })}
          </Box>)
        })}
      </Box>
    </Fragment>
  )
}