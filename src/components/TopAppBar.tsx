import React, { useState } from 'react';
import { AppBar, Button, Divider, Toolbar, Typography, CircularProgress, useMediaQuery, IconButton } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useTheme } from '@material-ui/core/styles';
import { appStepState, saveInProgressState } from '../store/appState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AppStep } from '../types';
import { loadedProjectState } from '../store/project';
import News from './News';

export default function TopAppBar() {
  const theme = useTheme();
  const [appStep, setAppStepState] = useRecoilState(appStepState);
  const [loadedProject, setLoadedProjectState] = useRecoilState(loadedProjectState);
  const saveInProgress = useRecoilValue(saveInProgressState);
  const [showNews, setShowNews] = useState(false);
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const onProjectsButtonClicked = () => {
    if( appStep !== AppStep.projectList ) {
      setLoadedProjectState(null);
      setAppStepState(AppStep.projectList);
    }
  }

  const LoadedProjectLink = () => {
    if( !loadedProject ) return null;
    return (
      <Button
        disabled={saveInProgress}
        onClick={() => setAppStepState(AppStep.input)}
        color="inherit"
        style={{
          backgroundColor: theme.palette.primary.dark
        }}
      >
        {loadedProject.id}
      </Button>
    )
  }

  const NewsButton = () => {
    if( isSmall )
      return <IconButton color="inherit" style={{marginLeft: "auto" }} onClick={() => setShowNews(true)}><HelpOutlineIcon /></IconButton>
    else
      return <Button color="inherit" style={{marginLeft: "auto" }} onClick={() => setShowNews(true)}>What's new <HelpOutlineIcon style={{marginLeft: '0.5em' }}/></Button>
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Bingo Builder</Typography>
        <Divider orientation="vertical" flexItem style={{ marginLeft: '1em', marginRight: '1em' }} />
        { saveInProgress ? <CircularProgress size="1em" color="inherit" /> : null}
        <Button 
          disabled={saveInProgress} 
          onClick={onProjectsButtonClicked} 
          color="inherit"
          style={{
            backgroundColor: appStep === AppStep.projectList ? theme.palette.primary.dark : undefined
          }}
        >Projects</Button>
        {loadedProject ? <Typography style={{ marginLeft: '0.5em', marginRight: '0.5em' }}>/</Typography> : null}
        <LoadedProjectLink />
        <NewsButton />
        <News open={showNews} onClose={() => setShowNews(false)} />
      </Toolbar>
    </AppBar>
  );
}