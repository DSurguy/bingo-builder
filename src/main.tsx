import React from 'react'
import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from '@mui/material/styles';
import './index.css'
import App from './App'
import './App.css'
import appTheme from './appTheme';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={appTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
)
