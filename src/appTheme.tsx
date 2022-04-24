import { createTheme } from "@material-ui/core/styles";

const appTheme = createTheme({
  palette: {
    primary: {
      light: '#c158dc',
      main: '#8e24aa',
      dark: '#5c007a',
      contrastText: '#fff'
    },
    secondary: {
      light: '#39796b',
      main: '#004d40',
      dark: '#00251a',
      contrastText: '#fff'
    }
  }
})

export default appTheme;