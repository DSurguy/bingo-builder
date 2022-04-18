import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, Typography, useMediaQuery, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

type Props = {
  open: boolean;
  onClose: () => any;
}

export default function News({ open, onClose }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      <DialogTitle disableTypography style={{
        borderBottom: `1px solid ${theme.palette.grey[300]}`
      }}>
        <Typography variant="h6">What's New</Typography>
        <IconButton onClick={onClose} aria-label="Close" color="inherit" style={{
          position: 'absolute',
          right: theme.spacing(1),
          top: theme.spacing(1),
        }}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent>
        <h3>Version 2.0.0</h3>
        <p>With this version of Bingo Builder, you can now save projects in your local browser, using standard LocalStorage.</p>
        <p>This means that every change you make to a project will now be saved automatically, and you can create as many projects as your browser storage will allow.</p>
        <p>Errors are generally handled, but they aren't exposed to the user yet, so please check the developer tools console if you think you're having an error.</p>
      </DialogContent>
    </Dialog>
  )
}