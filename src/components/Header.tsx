// client/src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Header: React.FC = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Объявления
                </Typography>
                <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />}>
                    Главная
                </Button>
                <Button color="inherit" component={Link} to="/list" startIcon={<ListIcon />}>
                    Список объявлений
                </Button>
                <Button color="inherit" component={Link} to="/form" startIcon={<AddCircleIcon />}>
                    Добавить объявление
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
