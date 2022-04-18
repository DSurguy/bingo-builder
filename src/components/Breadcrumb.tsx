import React, { Fragment } from 'react';
import { Box, Button, Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loadedProjectState } from '../store/project';
import { appStepState, saveInProgressState } from '../store/appState';
import { AppStep } from '../types';

export default function Breadcrumb() {
  const theme = useTheme();
  const [loadedProject, setLoadedProjectState] = useRecoilState(loadedProjectState);
  const [appStep, setAppStep] = useRecoilState(appStepState);
  const saveInProgress = useRecoilValue(saveInProgressState);
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('xs'));

  const onProjectsLinkClick = () => {
    if( saveInProgress ) return;
    if( appStep !== AppStep.projectList ) {
      setLoadedProjectState(null);
      setAppStep(AppStep.projectList);
    }
  }

  const onLoadedProjectClick = () => {
    if( saveInProgress ) return;
    setAppStep(AppStep.input)
  }

  const ProjectsLink = () => {
    return (
      <Button size="small" color="primary" onClick={onProjectsLinkClick}>Projects</Button>
    )
  }

  const LoadedProjectLink = () => {
    if( !loadedProject ) return null;
    const truncatedId = `${loadedProject.id.split('-')[0]}...`;
    const idContent = isExtraSmall ? truncatedId : loadedProject.id;
    return (
      <Fragment>
        <Typography style={{ marginRight: '0.5em', marginLeft: '0.5em', alignSelf: 'center' }}>/</Typography>
        <Button size="small" color="primary" onClick={onLoadedProjectClick} >{idContent}</Button>
      </Fragment>
    )
  }

  return loadedProject ? (
    <Box display="flex" style={{ margin: "0.5em" }}>
      <ProjectsLink />
      <LoadedProjectLink />
    </Box>
  ) : null;
}