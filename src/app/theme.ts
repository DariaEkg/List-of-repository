import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          500: '#1976d2',
        },
        neutral: {
          500: '#9c27b0',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          500: '#1976d2',
        },
        neutral: {
          500: '#9c27b0',
        },
      },
    },
  },
});


export default theme;


