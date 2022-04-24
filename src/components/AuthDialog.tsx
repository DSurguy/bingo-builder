import React, { FormEvent, useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Button, Box, Tabs, Tab, Dialog, DialogActions, DialogTitle, DialogContent, Typography, IconButton, TextField, FormControlLabel, useMediaQuery, Checkbox } from '@material-ui/core';
type Props = {
  open: boolean;
  onClose: () => any;
}

export default function AuthDialog({ open, onClose }: Props) {
  const [isExited, setIsExited] = useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedTab, setSelectedTab] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  //TODO: Show the evil cookie banner. I have no choice.
  // - basically just DON'T load anything if MY cookie "allow_cookies" doesn't exist
  //TODO: Show data policy
  //TODO: Store form data in state
  //TODO: Validate form data on submit (isEmail, not empty, terms agreed)
  //TODO: Send create request to server
  //TODO: Handle errors
  //TODO: Handle success

  // const onFormSubmit = (e: FormEvent) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   grecaptcha.ready(function() {
  //     grecaptcha.execute(import.meta.env.VITE_GOOGLE_RECAPTCHA_KEY, {action: 'submit'}).then(function(token) {
  //       console.log(token);
  //     });
  //   });
  // }

  //Re-initialize when open changes
  useEffect(() => {
    setEmail("");
    setPassword("");
    setConsent(false);
    setSelectedTab(0);
    setIsExited(false);
  }, [open])

  const onSubmitClick = () => processSignIn();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    processSignIn();
  }

  const processSignIn = () => {
    console.log(email, password, consent);
  }

  const onExited = () => {
    setIsExited(true);
  }

  if( isExited ) return null;

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose} TransitionProps={{
      onExited
    }}>
      <form onSubmit={onFormSubmit}>
        <DialogContent style={{ padding: 0 }}>
          <Box style={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={selectedTab}
              onChange={(e, tabIndex) => setSelectedTab(tabIndex)}
              aria-label="Tabs to switch between Sign In or Sign Up"
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Sign In" />
              <Tab label="Sign Up" />
            </Tabs>
          </Box>
          <Box style={{
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
          }}>
            <TextField
              style={{margin: theme.spacing(1) }}
              fullWidth
              type="text"
              label="Email"
              required
              variant="outlined"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              style={{margin: theme.spacing(1) }}
              fullWidth
              type="text"
              label="Password"
              required
              variant="outlined"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={consent}
                  onChange={e => setConsent(e.target.checked)}
                ></Checkbox>
              }
              label="I agree to terms and such"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" onClick={onSubmitClick} variant="contained" color="primary" >Sign In</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}