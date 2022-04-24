import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Button, Box, Tabs, Tab, CircularProgress, Dialog, DialogActions, DialogContent, TextField, FormControlLabel, useMediaQuery, Checkbox } from '@material-ui/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseAppPromise from '../store/firebaseApp';
import { useSetRecoilState } from 'recoil';
import { authenticatedUserState } from '../store/auth';
import { getUserInfoFromUser } from '../utils/firebase';

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
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const setAuthenticatedUser = useSetRecoilState(authenticatedUserState);
  const [inProgress, setInProgress] = useState(false);

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

  if( isExited ) return null;

  const onSubmitClick = () => processForm();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    processForm();
  }

  const processForm = async () => {
    if( inProgress ) return;
    setInProgress(true);
    let firebaseApp;
    try {
      firebaseApp = await firebaseAppPromise;
    } catch (e: any) {
      setError(e.message);
      return;
    }
    if( selectedTab === 0 ){
      try {
        const userCredentials = await signInWithEmailAndPassword(getAuth(firebaseApp), email, password);
        setAuthenticatedUser(getUserInfoFromUser(userCredentials.user));
        onClose();
      } catch (e: any) {
        setError(e.message);
      } finally {
        setInProgress(false);
      }
    } else {}
  }

  const onExited = () => {
    setIsExited(true);
  }

  const consentCheckbox = (
    <FormControlLabel
      control={
        <Checkbox
          value={consent}
          onChange={e => setConsent(e.target.checked)}
        ></Checkbox>
      }
      label="I agree to terms and such"
    />
  )

  const emailField = (
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
  )

  const passwordField = (
    <TextField
      style={{margin: theme.spacing(1) }}
      fullWidth
      type="password"
      label="Password"
      required
      variant="outlined"
      value={password}
      onChange={e => setPassword(e.target.value)}
    />
  )

  const passwordConfirmField = (
    <TextField
      style={{margin: theme.spacing(1) }}
      fullWidth
      type="password"
      label="Confirm Password"
      required
      variant="outlined"
      value={passwordConfirm}
      onChange={e => setPasswordConfirm(e.target.value)}
    />
  )

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
            { emailField }
            { passwordField }
            { selectedTab === 1 ? passwordConfirmField : null }
            { selectedTab === 1 ? consentCheckbox : null }
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            { inProgress ? <CircularProgress size="1em" /> : "Sign In" }
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}