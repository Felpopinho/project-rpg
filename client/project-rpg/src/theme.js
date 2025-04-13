import { createTheme } from '@mui/material/styles';
import { purple, red } from '@mui/material/colors';

const modo = createTheme({
  palette: {
    mode: localStorage.getItem("mui-mode"),
    primary: {
      main: purple[400],
    },
    red: {
      main: red["400"]
    }
  },
  colorSchemes:{
    dark:true
  },
});

export default modo;