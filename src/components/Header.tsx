import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront"; // Иконка магазина
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/list')
  }
  
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#25ba52", // Градиентный фон
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Тень
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}> {/* Увеличенная высота */}
        {/* Логотип + Текст */}
        <Box display="flex" alignItems="center" onClick={handleLogoClick} sx={{cursor: "pointer"}}>
          <StorefrontIcon sx={{ fontSize: 30, mr: 1 }} /> 
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            Доска объявлений
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
