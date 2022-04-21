import React, { useRef } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, useMediaQuery } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function AuthDialog() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const captchaContainer = useRef<HTMLDivElement>(null);

  return (
    <Dialog fullScreen={fullScreen} open>
      <DialogTitle disableTypography style={{
        borderBottom: `1px solid ${theme.palette.grey[300]}`
      }}>
        <Typography variant="h6">What's New</Typography>
        <IconButton aria-label="Close" color="inherit" style={{
          position: 'absolute',
          right: theme.spacing(1),
          top: theme.spacing(1),
        }}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent>
        <div ref={captchaContainer}>

        </div>
      </DialogContent>
    </Dialog>
  )
}