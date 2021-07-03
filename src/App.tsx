import React, { useState } from 'react'
import { Container } from '@material-ui/core'
import InputStep from './steps/InputStep'
import RenderStep from './steps/RenderStep'
import './App.css'

enum Step {
  input,
  render
}

function App() {
  const [step, setStep] = useState(Step.input);
  const [linesToRender, setLinesToRender] = useState([] as string[]);

  const onInputStepComplete = (linesToRender: string[]) => {
    setLinesToRender(linesToRender);
    setStep(Step.render);
  }

  const getStepComponent = () => {
    switch(step) {
      case Step.input: {
        return <InputStep onComplete={onInputStepComplete} />;
      }
      case Step.render: {
        return <RenderStep linesToRender={linesToRender} />
      }
    }
  }

  return (<Container className="app">
    {getStepComponent()}
  </Container>)
}

export default App
