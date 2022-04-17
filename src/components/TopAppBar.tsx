import React from 'react';
import { AppBar, Toolbar, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import { useStorageSettingState } from '../store/appState';
import { useRecoilState } from 'recoil';

export default function TopAppBar() {
  const [useStorageSettingValue, setUseStorageSetting] = useRecoilState(useStorageSettingState);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Bingo Builder</Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={useStorageSettingValue}
              onChange={ e => setUseStorageSetting(e.target.checked)}
              name="useStorageSetting"
            />
          }
          label="Use Storage"
        />
      </Toolbar>
    </AppBar>
  );
}