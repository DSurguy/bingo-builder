import React, { useState, useRef } from 'react';
import { AppBar, Avatar, Button, Divider, Toolbar, Menu, MenuItem, Typography, CircularProgress, useMediaQuery, IconButton } from '@material-ui/core';
import { getAuth, signOut } from 'firebase/auth';
import { useTheme } from '@material-ui/core/styles';
import { cookieConsentState, saveInProgressState } from '../store/appState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import News from './News';
import AuthMenu, { MenuAction } from './AuthMenu';
import CookieDialog from './CookieDialog';
import AuthDialog from './AuthDialog';
import firebaseAppPromise from '../store/firebaseApp';
import { authenticatedUserState, manuallySignOutAndReload } from '../store/auth';

export default function TopAppBar() {
  const theme = useTheme();
  const cookieConsent = useRecoilValue(cookieConsentState);
  const saveInProgress = useRecoilValue(saveInProgressState);
  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);
  const [showNews, setShowNews] = useState(false);
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [showCookieDialog, setShowCookieDialog] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const setAuthenticatedUser = useSetRecoilState(authenticatedUserState);

  const onMenuAction = (action: MenuAction) => {
    if( action === MenuAction.showNews ) setShowNews(true);
    if( action === MenuAction.signIn ) {
      if( cookieConsent ) setShowAuthDialog(true);
      else setShowCookieDialog(true);
    }
    if( action === MenuAction.signOut ) {
      signOutAction();
    }
  }

  const signOutAction = async () => {
    try {
      const firebaseApp = await firebaseAppPromise;
      await signOut(getAuth(firebaseApp));
      setAuthenticatedUser(null);
    } catch (e: any) {
      manuallySignOutAndReload();
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
        <AuthMenu onAction={onMenuAction} />
        <News open={showNews} onClose={() => setShowNews(false)} />
        <CookieDialog open={showCookieDialog} onConsent={onConsent} onCancel={() => setShowCookieDialog(false) }/>
        <AuthDialog open={showAuthDialog} onClose={() => setShowAuthDialog(false) } />
      </Toolbar>
    </AppBar>
  );
}