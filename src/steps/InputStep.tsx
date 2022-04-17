import React, { MouseEvent, useEffect, useState, useRef } from 'react'
import { Button, Box, Container, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles';
import { getSeedLines } from '../lipsumSeed';

import { FreeSpaceSetting, InputStepOutput, Project } from '../types';
import BingoInput from '../components/BingoInput';
import { useRecoilState } from 'recoil';
import { loadedProjectState, saveProject as apiSaveProject } from '../store/project';

type Props = {
  onComplete: (output: InputStepOutput) => void;
}

export default function InputStep({ onComplete }: Props) {
  const isMount = useRef(true);
  const [loadedProject, setLoadedProject] = useRecoilState(loadedProjectState);
  const theme = useTheme();
  const [easyLines, setEasyLines] = useState(loadedProject?.lines.easy || [])
  const [mediumLines, setMediumLines] = useState(loadedProject?.lines.medium || [])
  const [hardLines, setHardLines] = useState(loadedProject?.lines.hard || [])
  const [numEasyLinesSetting, setNumEasyLinesSetting] = useState(loadedProject?.settings.easy || 0)
  const [numMediumLinesSetting, setNumMediumLinesSetting] = useState(loadedProject?.settings.medium || 0)
  const [numHardLinesSetting, setNumHardLinesSetting] = useState(loadedProject?.settings.hard || 0)
  const [numEasyLinesError, setNumEasyLinesError] = useState("")
  const [numMediumLinesError, setNumMediumLinesError] = useState("")
  const [numHardLinesError, setNumHardLinesError] = useState("")
  const [freeSpaceSetting, setFreeSpaceSetting] = useState(FreeSpaceSetting.center)
  const [currentTimeoutId, setCurrentTimeoutId] = useState<number>(0);

  const getCleanedLines = (rawLines: string[]) => rawLines.map(line => line.trim()).filter(l => l);
  const cleanedEasyLines = getCleanedLines(easyLines);
  const cleanedMediumLines = getCleanedLines(mediumLines);
  const cleanedHardLines = getCleanedLines(hardLines);

  const onNextClick = (e: MouseEvent) => {    
    const getPaddedLines = (cleanLines: string[], numSetting: number) => 
      cleanLines.length < numSetting
      ? cleanLines.concat(new Array(numSetting - cleanLines.length).fill(""))
      : cleanLines;

    onComplete({
      lines: {
        easy: getPaddedLines(cleanedEasyLines, numEasyLinesSetting),
        medium: getPaddedLines(cleanedMediumLines, numMediumLinesSetting),
        hard: getPaddedLines(cleanedHardLines, numHardLinesSetting)
      },
      settings: {
        freeSpace: freeSpaceSetting,
        easy: numEasyLinesSetting,
        medium: numMediumLinesSetting,
        hard: numHardLinesSetting
      }
    });
  }

  const onNumLinesSettingChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, settingFunction: (input: number) => void, settingErrorFunction: (input: string) => void) => {
    const parsedValue = parseInt(e.target.value);
    if( isNaN(parsedValue) ) {
      settingErrorFunction("Value must be a number");
    }
    else {
      settingErrorFunction("");
    }
    settingFunction(parsedValue)
  }

  const saveProject = async () => {
    if( !loadedProject ) return;
    const updatedProject: Project = {
      id: loadedProject.id,
      name: loadedProject.name,
      lines: {
        easy: easyLines,
        medium: mediumLines,
        hard: hardLines
      },
      settings: {
        freeSpace: freeSpaceSetting,
        easy: numEasyLinesSetting,
        medium: numMediumLinesSetting,
        hard: numHardLinesSetting
      }
    }

    try {
      await apiSaveProject(updatedProject);
    } catch (e) {
      console.error("Error saving updated project", e);
    }
  }
  
  const saveProjectDebounced = () => {
    if( currentTimeoutId ) clearTimeout(currentTimeoutId);
    const newTimeoutId = setTimeout(() => {
      saveProject();
    }, 1000);
    setCurrentTimeoutId(newTimeoutId);
  }

  useEffect(() => {
    if( !isMount.current ) {
      saveProjectDebounced();
    }
    else isMount.current = false;
    return () => {
      clearTimeout(currentTimeoutId);
    }
  }, [
    easyLines,
    mediumLines,
    hardLines
  ])

  const fewerLinesThanRequired = 
    cleanedEasyLines.length < numEasyLinesSetting ||
    cleanedMediumLines.length < numMediumLinesSetting ||
    cleanedHardLines.length < numHardLinesSetting;
  const totalSettingsCount = numEasyLinesSetting + numMediumLinesSetting + numHardLinesSetting + (freeSpaceSetting === FreeSpaceSetting.none ? 0 : 1);

  return (
    <Container>
      <Box className="intro" marginTop={2}>
        <h2>Instructions</h2>
        <p>
          Please enter as many bingo square entries as you like below, one per line. Empty lines will be ignored.
        </p>
        <p>
          At this time, the bingo board is limited to 5x5 (25) squares. Each board will use a random selection of 
          25 of the lines below. If fewer than 25 lines are provided, empty spaces will be used to fill the rest
          of the squares.
        </p>
      </Box>
      <h2>Input Lines</h2>
      <BingoInput label="Easy" onChange={(lines: string[]) => setEasyLines(lines)} lines={easyLines} />
      <BingoInput label="Medium" onChange={(lines: string[]) => setMediumLines(lines)} lines={mediumLines} />
      <BingoInput label="Hard" onChange={(lines: string[]) => setHardLines(lines)} lines={hardLines} />
      <h2>Settings</h2>
      <Box marginTop={2}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Free Space Position</FormLabel>
          <RadioGroup aria-label="Free Space Position" name="freeSpacePosition" value={freeSpaceSetting} onChange={e => setFreeSpaceSetting(e.target.value as FreeSpaceSetting)}>
            <FormControlLabel value={FreeSpaceSetting.none} control={<Radio />} label="None" />
            <FormControlLabel value={FreeSpaceSetting.center} control={<Radio />} label="Center" />
            <FormControlLabel value={FreeSpaceSetting.random} control={<Radio />} label="Random" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box marginTop={2}>
        <Box marginTop={1}>
          <TextField
            label="Easy Lines Per Sheet"
            error={!!numEasyLinesError}
            helperText={numEasyLinesError}
            onChange={e => onNumLinesSettingChange(e, setNumEasyLinesSetting, setNumEasyLinesError)}
            value={numEasyLinesSetting}
            type="number"
          />
        </Box>
        <Box marginTop={1}>
          <TextField
            label="Medium Lines Per Sheet"
            error={!!numMediumLinesError}
            helperText={numMediumLinesError}
            onChange={e => onNumLinesSettingChange(e, setNumMediumLinesSetting, setNumMediumLinesError)}
            value={numMediumLinesSetting}
            type="number"
          />
        </Box>
        <Box marginTop={1}>
          <TextField
            label="Hard Lines Per Sheet"
            error={!!numHardLinesError}
            helperText={numHardLinesError}
            onChange={e => onNumLinesSettingChange(e, setNumHardLinesSetting, setNumHardLinesError)}
            value={numHardLinesSetting}
            type="number"
          />
        </Box>
      </Box>
      <Box margin-top={2}>
        { totalSettingsCount !== 25 && <p style={{color: theme.palette.error.main }}><b>Error</b>: You must provide settings for 25 boxes per sheet.</p> }
        { fewerLinesThanRequired && <p style={{color: theme.palette.warning.main }}><b>Note</b>: There are not enough lines to fulfill these requirements, so the rest will be filled with blanks.</p> }
      </Box>
      <Box className="actions" marginTop={2} marginBottom={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={onNextClick}
          disabled={totalSettingsCount !== 25}
        >
          Next
        </Button>
      </Box>
    </Container>
  )
}