import React, { useState } from 'react';
import { AppBar, Button, Divider, Toolbar, Typography, CircularProgress, useMediaQuery, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useTheme } from '@mui/material/styles';
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
      return <IconButton color="inherit" sx={{marginLeft: "auto" }} onClick={() => setShowNews(true)}><HelpOutlineIcon /></IconButton>
    else
      return <Button color="inherit" sx={{marginLeft: "auto" }} onClick={() => setShowNews(true)}>What's new <HelpOutlineIcon sx={{marginLeft: '0.5em' }}/></Button>
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Bingo Builder</Typography>
        <Divider orientation="vertical" flexItem sx={{ marginLeft: '1em', marginRight: '1em' }} />
        { saveInProgress ? <CircularProgress size="1em" color="inherit" /> : null}
        <NewsButton />
        <News open={showNews} onClose={() => setShowNews(false)} />
      </Toolbar>
    </AppBar>
  );
}