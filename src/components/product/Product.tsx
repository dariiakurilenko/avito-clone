import { FC } from "react";
import { Box, Typography, Button, Card, CardMedia, CardContent, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Item } from "../../types/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"; // Добавляем иконку для удаления
import { deleteItem } from "../../api/api"; // Импортируем функцию для удаления объявления

const DEFAULT_IMAGE =
  "https://previews.123rf.com/images/koblizeek/koblizeek2205/koblizeek220500309/186660515-no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg";

const Product: FC<Item> = (props) => {
  const navigate = useNavigate();
  const { id, name, description, location, type, image, price, cost, 
          propertyType, area, rooms, brand, model, year, mileage, 
          serviceType, experience, workSchedule } = props;

  // Функция для удаления объявления
  const handleDelete = async () => {
    try {
      await deleteItem(id); // Удаляем объявление через API
      console.log("✅ Объявление удалено");
      navigate("/list"); // Перенаправляем пользователя на страницу списка
    } catch (error) {
      console.error("❌ Ошибка при удалении объявления:", error);
    }
  };

  // Рендер информации в зависимости от категории
  const renderCategoryDetails = () => {
    switch (type) {
      case "Недвижимость":
        return (
          <Paper elevation={0} sx={{ p: 2, bgcolor: "#f9f9f9" }}>
            <Typography variant="body1">📏 Площадь: {area} м²</Typography>
            <Typography variant="body1">🛏 Комнат: {rooms}</Typography>
            <Typography variant="body1">💰 Цена: {price?.toLocaleString()} ₽</Typography>
          </Paper>
        );
      case "Авто":
        return (
          <Paper elevation={0} sx={{ p: 2, bgcolor: "#f9f9f9" }}>
            <Typography variant="body1">📅 Год выпуска: {year}</Typography>
            <Typography variant="body1">🚗 Пробег: {mileage?.toLocaleString()} км</Typography>
          </Paper>
        );
      case "Услуги":
        return (
          <Paper elevation={0} sx={{ p: 2, bgcolor: "#f9f9f9" }}>
            <Typography variant="body1">👨‍🔧 Опыт работы: {experience} лет</Typography>
            <Typography variant="body1">💰 Стоимость: {cost?.toLocaleString()} ₽</Typography>
            <Typography variant="body1">📅 График работы: {workSchedule || "По договоренности"}</Typography>
          </Paper>
        );
      default:
        return <Typography variant="body1">❌ Категория не определена</Typography>;
    }
  };

  return (
    <Card sx={{ maxWidth: 1200, mx: "auto", my: 4, p: 3, boxShadow: 0, borderRadius: 3, bgcolor: "#ffffff" }}>
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
            boxShadow: 1
          }}
        />

        {/* Контент справа */}
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>{name}</Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>📍 {location}</Typography>

          {/* Заголовок для характеристик */}
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>Характеристики</Typography>
          {/* Детали категории */}
          <Box mt={1}>{renderCategoryDetails()}</Box>

          {/* Заголовок для описания */}
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3 }}>Описание</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>{description}</Typography>

          {/* Кнопки редактирования и удаления */}
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/form?id=${id}`)}
              sx={{ borderRadius: "25px", px: 3, py: 1 }}
            >
              Редактировать
            </Button>

            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              sx={{ borderRadius: "25px", px: 3, py: 1 }}
            >
              Удалить
            </Button>
          </Box>

          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/list`)} // Назад к списку
              sx={{ borderRadius: "25px", px: 3, py: 1 }}
            >
              Назад
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default Product;
