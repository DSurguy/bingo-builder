import React, { Fragment, useState } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import { AppBar, Avatar, Button, Divider, Toolbar, Menu, MenuItem, Typography, CircularProgress, useMediaQuery, IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import { useTheme } from '@material-ui/core/styles';
import { authenticatedUserState } from '../store/auth';

type Props = {
  onAction: (action: MenuAction) => any;
}

export enum MenuAction {
  showNews,
  signIn,
  signOut,
  testAuthHealth
}

export default function AuthMenu({ onAction }: Props) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);
  const user = useRecoilValueLoadable(authenticatedUserState);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  if( user.state !== "hasValue" ) return null;

  const triggerActionAndClose = (action: MenuAction) => {
    setMenuAnchor(null);
    onAction(action);
  }

  const signInMenuItem = <MenuItem onClick={() => { triggerActionAndClose(MenuAction.signIn); }}>Sign In / Sign Up</MenuItem>;
  const signOutMenuItem = <MenuItem onClick={() => { triggerActionAndClose(MenuAction.signOut); }}>Sign Out</MenuItem>;

  const authButtonContent = (
    <Fragment>
      <Avatar
        style={{
          width: theme.spacing(4),
          height: theme.spacing(4),
        }}
      ><PersonIcon /></Avatar>
      { isSmall ? null : <Typography style={{ marginLeft: theme.spacing(1) }}>{user.contents?.email?.split("@")[0]}</Typography> }
    </Fragment>
  )

  const unAuthButtonContent = <MenuIcon />

  const menu = menuAnchor ? (
    <Menu anchorEl={menuAnchor} anchorOrigin={{
      horizontal: "right",
      vertical: "top"
    }} open onClose={() => setMenuAnchor(null)}>
      { user.contents ? null : signInMenuItem }
      <MenuItem onClick={() => { triggerActionAndClose(MenuAction.showNews); }}>What's New</MenuItem>
      { user.contents ? signOutMenuItem : null }
      { user.contents ? <MenuItem onClick={() => triggerActionAndClose(MenuAction.testAuthHealth)}>Check Auth Health</MenuItem> : null}
    </Menu>
  ) : null;

  return (
    <Fragment>
      <Button
        className="auth-menu-button" 
        color="inherit" 
        style={{
          marginLeft: "auto",
          textTransform: 'none',
          opacity: menuAnchor ? 0.5 : 1
        }} 
        onClick={(e) => {
          setMenuAnchor(e.currentTarget);
        }}
      >
        {user.contents ? authButtonContent : unAuthButtonContent }
      </Button>
      {menu}
    </Fragment>
  )
}