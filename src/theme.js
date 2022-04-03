import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
        main: '#4C7FCD'
    },
    secondary: {
        main: '#FFE66D'
    },
    error: {
        main: '#FF6B6B'
    },
    success: {
        main: '#6BFF6B'
    },
    background: {
        main: '#1A535C',
        paper: '#FFFFFF'
    },
    text: {
        main: '#FFFFFF'
    }
  },
});