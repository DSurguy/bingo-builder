import React, { Fragment, useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { LineAndStyle, LineAndStyleByDifficulty, LinesByDifficulty } from './types'
import { FreeSpaceSetting, InputStepOutput, Settings } from './types'
import InputStep from './steps/InputStep'
import RenderStep from './steps/RenderStep'
import OutputStep from './steps/OutputStep'
import packageJson from '../package.json'
import './App.css'

enum Step {
  input,
  render,
  output
}

function App() {
  const [step, setStep] = useState(Step.input);
  const [linesToRender, setLinesToRender] = useState({
    easy: [],
    medium: [],
    hard: []
  } as LinesByDifficulty);
  const [settings, setSettings] = useState({
    freeSpace: FreeSpaceSetting.none,
    easy: 0,
    medium: 0,
    hard: 0
  } as Settings);
  const [linesAndStyles, setLinesAndStyles] = useState({
    easy: [],
    medium: [],
    hard: []
  } as LineAndStyleByDifficulty);

  const onInputStepComplete = (output: InputStepOutput) => {
    setLinesToRender(output.lines);
    setSettings(output.settings);
    setStep(Step.render);
  }

  const onRenderStepComplete = (linesAndStyles: {
    easy: LineAndStyle[],
    medium: LineAndStyle[],
    hard: LineAndStyle[]
  }) => {
    setLinesAndStyles(linesAndStyles)
    setStep(Step.output);
  }

  const getStepContent = () => {
    switch(step) {
      case Step.input: {
        return <InputStep onComplete={onInputStepComplete} />;
      }
      case Step.render: {
        return <RenderStep linesToRender={linesToRender} onComplete={onRenderStepComplete} />
      }
      case Step.output: {
        return <OutputStep linesAndStyles={linesAndStyles} settings={settings} />
      }
      default: return null
    }
  }

  useEffect(() => {
    document.title = `Bingo Builder v${packageJson.version}`;
  }, [])

  return (<Fragment>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Bingo Builder</Typography>
      </Toolbar>
    </AppBar>
    {getStepContent()}
  </Fragment>)
}

export default App
