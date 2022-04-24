import React, { Fragment, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import { LineAndStyle, LineAndStyleByDifficulty, FreeSpaceSetting, Settings, AppStep } from './types'
import InputStep from './steps/InputStep'
import RenderStep from './steps/RenderStep'
import OutputStep from './steps/OutputStep'
import TopAppBar from './components/TopAppBar';
import packageJson from '../package.json'
import ProjectList from './steps/ProjectList'
import { appStepState } from './store/appState';
import Breadcrumb from './components/Breadcrumb'
import { authenticatedUserState } from './store/auth'

let cachedUser: any;

function App() {
  const user = useRecoilValueLoadable(authenticatedUserState);
  const [step, setStep] = useRecoilState(appStepState);
  const [settings] = useState({
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

  const onRenderStepComplete = (linesAndStyles: {
    easy: LineAndStyle[],
    medium: LineAndStyle[],
    hard: LineAndStyle[]
  }) => {
    setLinesAndStyles(linesAndStyles)
    setStep(AppStep.output);
  }

  const getStepContent = () => {
    switch(step) {
      case AppStep.projectList: {
        return <ProjectList />
      }
      case AppStep.input: {
        return <InputStep />;
      }
      case AppStep.render: {
        return <RenderStep onComplete={onRenderStepComplete} />
      }
      case AppStep.output: {
        return <OutputStep linesAndStyles={linesAndStyles} settings={settings} />
      }
      default: return null
    }
  }

  useEffect(() => {
    document.title = `Bingo Builder v${packageJson.version}`;
  }, [])

  useEffect(() => {
    console.log(cachedUser === user);
    if( user.state === "hasValue" ){
      console.log("User", user.contents);
    }
    cachedUser = user;
  }, [user])

  return (<Fragment>
    <TopAppBar />
    <Breadcrumb />
    {getStepContent()}
  </Fragment>)
}

export default App
