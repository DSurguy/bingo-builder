import React, { useState } from 'react'
import InputStep from './steps/InputStep'
import RenderStep from './steps/RenderStep'
import OutputStep from './steps/OutputStep'
import './App.css'
import { LineAndStyle } from './types'
import { FreeSpaceSetting, InputStepOutput } from './steps/types'

enum Step {
  input,
  render,
  output
}

function App() {
  const [step, setStep] = useState(Step.input);
  const [linesToRender, setLinesToRender] = useState([] as string[]);
  const [freeSpaceSetting, setFreeSpaceSetting] = useState("" as FreeSpaceSetting);
  const [linesAndStyles, setLinesAndStyles] = useState([] as LineAndStyle[]);

  const onInputStepComplete = (output: InputStepOutput) => {
    setLinesToRender(output.lines);
    setFreeSpaceSetting(output.freeSpaceSetting);
    setStep(Step.render);
  }

  const onRenderStepComplete = (linesAndStyles: LineAndStyle[]) => {
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
      return <OutputStep linesAndStyles={linesAndStyles} freeSpaceSetting={freeSpaceSetting} />
    }
    default: return <div></div>
  }
}

export default App
