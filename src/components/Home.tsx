// client/src/pages/Home.tsx
import React from 'react';
import { Container, Typography, Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';




const Home: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
                <Grid container spacing={3} justifyContent="center" alignItems="center" style={{minHeight: '80vh'}}>
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                            <Typography variant="h3" gutterBottom>
                                Добро пожаловать в приложение объявлений!
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Здесь вы можете просматривать, добавлять и управлять объявлениями.
                            </Typography>
                            <Button variant="contained" color="primary" component={Link} to="/list">
                                Посмотреть объявления
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default Home;
