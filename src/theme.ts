// client/src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#c8f7d8',
        },
        secondary: {
            main: '#ff4081',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h6: {
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        button: {
            textTransform: 'none', 
        },
    },
});

export default theme;
