import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#5EBEC4', // Main color
    },
    secondary: {
      main: '#F92C85', // Accent color
    },
    background: {
      default: '#303030', // Dark background color
    },
    text: {
      primary: '#ffffff', // Light text color
      secondary: '#b0bec5', // Secondary text color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
});

export default darkTheme;
