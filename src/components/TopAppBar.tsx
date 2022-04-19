import React, { useState, useRef } from 'react';
import { AppBar, Avatar, Button, Divider, Toolbar, Menu, MenuItem, Typography, CircularProgress, useMediaQuery, IconButton } from '@material-ui/core';
//import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useTheme } from '@material-ui/core/styles';
import { saveInProgressState } from '../store/appState';
import { useRecoilValue } from 'recoil';
import News from './News';
import AuthMenu, { MenuAction } from './AuthMenu';
import { testAuth } from '../store/auth';

export default function TopAppBar() {
  const theme = useTheme();
  const saveInProgress = useRecoilValue(saveInProgressState);
  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);
  const [showNews, setShowNews] = useState(false);
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const AuthMenuButton = (
    <Button
      className="auth-menu-button" 
      color="inherit" 
      style={{ marginLeft: "auto" }} 
      onClick={(e) => {
        setMenuAnchor(e.currentTarget);
      }}
    >
      <Avatar
        style={{
          width: theme.spacing(4),
          height: theme.spacing(4),
        }}
      >A</Avatar>
      { isSmall ? null : <Typography style={{ marginLeft: theme.spacing(1) }}>Your Name</Typography> }
    </Button>
  )

  const onMenuAction = (action: MenuAction) => {
    if( action === MenuAction.showNews ) setShowNews(true);
    if( action === MenuAction.signIn ) testAuth();
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Bingo Builder</Typography>
        <Divider orientation="vertical" flexItem style={{ marginLeft: theme.spacing(2), marginRight: theme.spacing(2) }} />
        { saveInProgress ? <CircularProgress size="1em" color="inherit" /> : null}
        { AuthMenuButton }
        <AuthMenu anchor={menuAnchor} onAction={onMenuAction} onClose={() => setMenuAnchor(null)} />
        <News open={showNews} onClose={() => setShowNews(false)} />
      </Toolbar>
    </AppBar>
  );
}