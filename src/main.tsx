import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from '@material-ui/core/styles';
import './index.css'
import App from './App'
import './App.css'
import appTheme from './appTheme';
import gCaptchaPolyfill from './gCaptchaPolyfill';

gCaptchaPolyfill();

ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider theme={appTheme}>
      <App />
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById('root')
)
