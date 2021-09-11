import React, { useState } from 'react'
import InputStep from './steps/InputStep'
import RenderStep from './steps/RenderStep'
import OutputStep from './steps/OutputStep'
import './App.css'
import { LineAndStyle, LineAndStyleByDifficulty, LinesByDifficulty } from './types'
import { FreeSpaceSetting, InputStepOutput, Settings } from './types'

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
    default: return <div></div>
  }
}

export default App
