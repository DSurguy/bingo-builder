import React from 'react';
import { AppBar, Button, Divider, Toolbar, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import { appStepState, useStorageSettingState } from '../store/appState';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { AppStep } from '../types';
import { loadedProjectState } from '../store/project';

export default function TopAppBar() {
  const [useStorageSettingValue, setUseStorageSetting] = useRecoilState(useStorageSettingState);
  const [appStep, setAppStepState] = useRecoilState(appStepState);
  const setLoadedProjectState = useSetRecoilState(loadedProjectState);

  const onProjectsButtonClicked = () => {
    if( appStep !== AppStep.projectList ) {
      setLoadedProjectState(null);
      setAppStepState(AppStep.projectList);
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Bingo Builder</Typography>
        <Divider orientation="vertical" flexItem style={{ marginLeft: '1em', marginRight: '1em' }} />
        <Button onClick={onProjectsButtonClicked} color="inherit">Projects</Button>
        <FormControlLabel
          control={
            <Checkbox
              checked={useStorageSettingValue}
              onChange={ e => setUseStorageSetting(e.target.checked)}
              name="useStorageSetting"
            />
          }
          style={{
            marginLeft: 'auto'
          }}
          label="Use Storage"
        />
      </Toolbar>
    </AppBar>
  );
}