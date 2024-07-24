import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material';
import darkTheme from './themes/darkTheme';
import lightTheme from './themes/lightTheme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
);  