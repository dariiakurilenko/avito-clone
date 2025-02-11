// client/src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#c8f7d8', // Цвет для AppBar
        },
        secondary: {
            main: '#ff4081', // Вторичный цвет
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h6: {
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        button: {
            textTransform: 'none', // Отключаем автоматическое преобразование текста в верхний регистр
        },
    },
});

export default theme;
