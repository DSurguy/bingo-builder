import React, { Fragment } from 'react';
import { Box } from '@material-ui/core';
import { fontSizes, gridStyles } from './styles';

type Props = {
  linesAndStyles: {
    line: string;
    style: number;
  }[];
}

export default function OutputStep({ linesAndStyles }: Props) {
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

  const gridRows = linesAndStyles.reduce((rows, lineAndStyle, index) => {
    const rowIndex = Math.floor(index / 5);
    if (!rows[rowIndex]) rows[rowIndex] = [] as string[];
    rows[rowIndex].push(lineAndStyle.line);
    return rows;
  }, [] as string[][]);

  return (
    <Fragment>
      <Box className="intro">
        <h2>I am the output step</h2>
      </Box>
      <Box className="grid">
        {
          gridRows.map((row, rowIndex) => {
            return (<Box className={gridClasses.gridRow} key={rowIndex}>
              {row.map((line, lineIndex) => {
                const actualLineIndex = rowIndex * 5 + lineIndex;
                return <Box 
                  className={`${gridClasses.gridItem} ${fontStyleArray[linesAndStyles[actualLineIndex].style]}`}
                  key={`${rowIndex}.${lineIndex}`}
                >{line}</Box>
              })}
            </Box>)
          })
        }
      </Box>
    </Fragment>
  )
}