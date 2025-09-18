import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';


  const theme = createTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: purple[700],
          },
        },
      },
      dark: {
        palette: {
          primary: {
            main: purple[300],
          },
        },
      },
  }});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme} defaultMode='light'>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
