import { FC } from "react";
import { Box, Typography, Button, Card, CardMedia, CardContent, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Item } from "../../types/types";
import EditIcon from "@mui/icons-material/Edit";

const DEFAULT_IMAGE =
  "https://previews.123rf.com/images/koblizeek/koblizeek2205/koblizeek220500309/186660515-no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg";

const Product: FC<Item> = (props) => {
  const navigate = useNavigate();
  const { id, name, description, location, type, image, price, cost, 
          propertyType, area, rooms, brand, model, year, mileage, 
          serviceType, experience, workSchedule } = props;

  // Рендер информации в зависимости от категории
  const renderCategoryDetails = () => {
    switch (type) {
      case "Недвижимость":
        return (
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2, bgcolor: "#e3f2fd" }}>
            <Typography variant="h6" color="primary">{propertyType}</Typography>
            <Typography variant="body1">📏 Площадь: {area} м²</Typography>
            <Typography variant="body1">🛏 Комнат: {rooms}</Typography>
            <Typography variant="h6" color="success">💰 Цена: {price?.toLocaleString()} ₽</Typography>
          </Paper>
        );
      case "Авто":
        return (
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2, bgcolor: "#fff3e0" }}>
            <Typography variant="h6" color="primary">{brand} {model}</Typography>
            <Typography variant="body1">📅 Год выпуска: {year}</Typography>
            <Typography variant="body1">🚗 Пробег: {mileage?.toLocaleString()} км</Typography>
          </Paper>
        );
      case "Услуги":
        return (
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2, bgcolor: "#e8f5e9" }}>
            <Typography variant="h6" color="primary">{serviceType}</Typography>
            <Typography variant="body1">👨‍🔧 Опыт работы: {experience} лет</Typography>
            <Typography variant="h6" color="success">💰 Стоимость: {cost?.toLocaleString()} ₽</Typography>
            <Typography variant="body1">📅 График работы: {workSchedule || "По договоренности"}</Typography>
          </Paper>
        );
      default:
        return <Typography variant="body1">❌ Категория не определена</Typography>;
    }
  };

  return (
    <Card sx={{ maxWidth: 1000, mx: "auto", my: 4, p: 3, boxShadow: 5, borderRadius: 3, bgcolor: "#f9f9f9" }}>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
        {/* Изображение слева */}
        <CardMedia
          component="img"
          image={image || DEFAULT_IMAGE}
          alt={name}
          sx={{
            width: { xs: "100%", md: 400 },
            height: { xs: 300, md: "100%" },
            borderRadius: 3,
            objectFit: "cover",
            boxShadow: 3
          }}
        />

        {/* Контент справа */}
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold">{name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">📍 {location}</Typography>

          {/* Детали категории */}
          <Box mt={2}>{renderCategoryDetails()}</Box>

          <Typography variant="body1" mt={3} sx={{ bgcolor: "#f1f1f1", p: 2, borderRadius: 2 }}>
            📝 {description}
          </Typography>

          {/* Кнопка редактирования */}
          <Box mt={3}>
          <Button
  variant="contained"
  color="primary"
  startIcon={<EditIcon />}
  onClick={() => navigate(`/form?id=${id}`)} // 
  sx={{ borderRadius: "25px", px: 3, py: 1 }}
>
  Редактировать
</Button>

          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default Product;
