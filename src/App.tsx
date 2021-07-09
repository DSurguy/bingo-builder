import React, { useState } from 'react'
import InputStep from './steps/InputStep'
import RenderStep from './steps/RenderStep'
import OutputStep from './steps/OutputStep'
import './App.css'
import { LineAndStyle } from './types'

enum Step {
  input,
  render,
  output
}

function App() {
  const [step, setStep] = useState(Step.input);
  const [linesToRender, setLinesToRender] = useState([] as string[]);
  const [linesAndStyles, setLinesAndStyles] = useState([] as LineAndStyle[]);

  const onInputStepComplete = (linesToRender: string[]) => {
    setLinesToRender(linesToRender);
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
      return <OutputStep linesAndStyles={linesAndStyles} />
    }
    default: return <div></div>
  }
}

export default App
