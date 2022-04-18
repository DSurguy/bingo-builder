import React, { useState } from 'react';
import { AppBar, Button, Divider, Toolbar, Typography, CircularProgress, useMediaQuery, IconButton } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useTheme } from '@material-ui/core/styles';
import { saveInProgressState } from '../store/appState';
import { useRecoilValue } from 'recoil';
import News from './News';

export default function TopAppBar() {
  const theme = useTheme();
  const saveInProgress = useRecoilValue(saveInProgressState);
  const [showNews, setShowNews] = useState(false);
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

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
        <NewsButton />
        <News open={showNews} onClose={() => setShowNews(false)} />
      </Toolbar>
    </AppBar>
  );
}