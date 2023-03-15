import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    contrastThreshold: 4.5,
    primary: { main: '#45E05F' },
    secondary: { main: '#40E0D6' },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 425,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
});
