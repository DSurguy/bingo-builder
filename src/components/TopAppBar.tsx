import React, { useState, useRef } from 'react';
import { AppBar, Avatar, Button, Divider, Toolbar, Menu, MenuItem, Typography, CircularProgress, useMediaQuery, IconButton } from '@material-ui/core';
//import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useTheme } from '@material-ui/core/styles';
import { cookieConsentState, saveInProgressState } from '../store/appState';
import { useRecoilValue } from 'recoil';
import News from './News';
import AuthMenu, { MenuAction } from './AuthMenu';
import CookieDialog from './CookieDialog';
import AuthDialog from './AuthDialog';

export default function TopAppBar() {
  const theme = useTheme();
  const cookieConsent = useRecoilValue(cookieConsentState);
  const saveInProgress = useRecoilValue(saveInProgressState);
  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);
  const [showNews, setShowNews] = useState(false);
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [showCookieDialog, setShowCookieDialog] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

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
    if( action === MenuAction.signIn ) {
      if( cookieConsent ) setShowAuthDialog(true);
      else setShowCookieDialog(true);
    }
  }

  const onConsent = () => {
    setShowAuthDialog(true);
    setShowCookieDialog(false);
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
        <CookieDialog open={showCookieDialog} onConsent={onConsent} onCancel={() => setShowCookieDialog(false) }/>
        <AuthDialog open={showAuthDialog} onClose={() => setShowAuthDialog(false) } />
      </Toolbar>
    </AppBar>
  );
}