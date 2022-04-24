import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions , Typography, FormControlLabel, useMediaQuery, Checkbox } from '@material-ui/core';
import { useSetRecoilState } from 'recoil';
import { cookieConsentState } from '../store/appState';

type Props = {
  open: boolean;
  onConsent: () => any;
  onCancel?: () => any;
}

export default function CookieDialog({ open, onConsent, onCancel }: Props) {
  const setCookieConsentState = useSetRecoilState(cookieConsentState);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [consent, setConsent] = useState(false);
  const [isExited, setIsExited] = useState(true);

  useEffect(() => {
    setConsent(false);
    setIsExited(false);
  }, [open])

  if( isExited ) return null;

  const onSubmitClick = () => storeConsent();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    storeConsent();
  }

  const storeConsent = () => {
    if( !consent ) return;
    try {
      setCookieConsentState(true);
      onConsent();
    } catch (e) {
      console.error("Unable to store cookie consent");
    }
  }

  const onExited = () => {
    setIsExited(true);
  }
  
  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onCancel} TransitionProps={{
      onExited
    }}>
      <DialogTitle disableTypography style={{
        borderBottom: `1px solid ${theme.palette.grey[300]}`
      }}>
        <Typography variant="h6">Cookie Policy</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography style={{paddingBottom: theme.spacing(1) }}>
          In order to verify your humanity, create and authenticate your user, Bingo Builder needs to store cookies on your device.
        </Typography>
        <Typography style={{paddingBottom: theme.spacing(1) }}>
          You cannot use our authentication or cloud services without these cookies, they are required for the service to function.
        </Typography>
        <Typography style={{paddingBottom: theme.spacing(1) }}>
          If you have read, understand and consent to the cookie policy described above, please confirm your consent by checking the box below.
        </Typography>
        <Typography style={{paddingBottom: theme.spacing(1) }}>
          You can revoke this consent at any time through your user Settings, or by blocking/deleting cookies in your browser, but the Bingo Builder cloud services will cease to function until you consent again.
        </Typography>
        <form onSubmit={onFormSubmit}>
          <FormControlLabel
            control={
              <Checkbox
                value={consent}
                onChange={e => setConsent(e.target.checked)}
              ></Checkbox>
            }
            label="I consent to the storage of required cookies on this device"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} aria-label="Cancel and close dialog">Cancel</Button>
        <Button onClick={onSubmitClick} disabled={!consent} variant="contained" color="primary" aria-label="Submit and move to next dialog">Next</Button>
      </DialogActions>
    </Dialog>
  )
}