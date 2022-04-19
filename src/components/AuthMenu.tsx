import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';

type Props = {
  anchor: HTMLElement | null;
  onAction: (action: MenuAction) => any;
  onClose: () => any;
}

export enum MenuAction {
  showNews,
  signIn
}

export default function AuthMenu({ anchor, onAction, onClose }: Props) {
  if( !anchor ) return null;
  return (
    <Menu anchorEl={anchor} open onClose={onClose}>
      <MenuItem onClick={() => { onAction(MenuAction.signIn); onClose(); }}>Sign In / Sign Up</MenuItem>
      <MenuItem onClick={() => { onAction(MenuAction.showNews); onClose(); }}>What's New</MenuItem>
    </Menu>
  )
}