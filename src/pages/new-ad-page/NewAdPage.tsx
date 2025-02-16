import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createItem, updateItem, getItemById } from "../../api/api";
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const categories = ["Недвижимость", "Авто", "Услуги"];
const propertyTypes = ["Квартира", "Дом", "Коттедж"];
const carBrands = ["Toyota", "BMW", "Mercedes"];
const serviceTypes = ["Ремонт", "Уборка", "Доставка"];

const NewAdPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEditing);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    image: "",
    type: "",
    propertyType: "",
    area: "",
    rooms: "",
    price: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
    serviceType: "",
    experience: "",
    cost: "",
    workSchedule: "",
  });

  // Загружаем данные при редактировании
  useEffect(() => {
    if (isEditing) {
      const fetchItem = async () => {
        try {
          const data = await getItemById(Number(id));
          setFormData(data); 
        } catch (error) {
          console.error("❌ Ошибка загрузки объявления:", error);
          alert("❌ Ошибка загрузки объявления")
        } finally {
          setLoading(false);
        }
      };
      fetchItem();
    }
  }, [id, isEditing]);
  

  // Обновление полей формы
  const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleChangeSelect = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
       ...prev,
       [name as string]: value,
    }));
 };

  // Переход к следующему шагу
  const handleNext = () => setActiveStep((prev) => prev + 1);

  // Возврат к предыдущему шагу
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Отправка формы (Создание / Обновление объявления)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await updateItem(Number(id), formData); // Обновляем существующее объявление
        console.log("✅ Объявление обновлено");
        navigate(`/item/${id}`);
      } else {
        const newItem = await createItem(formData); // Создаем новое объявление
        console.log("✅ Объявление создано, ID:", newItem.id);
        navigate(`/item/${newItem.id}`);
      }
    } catch (error) {
      console.error("Ошибка при создании объявления:", error);
    }
  };

  // Индикатор загрузки при редактировании
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Загружаем объявление...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" sx={{ my: 3 }}>
        {isEditing ? "Редактирование объявления" : "Размещение объявления"}
      </Typography>

      {/* Многошаговый прогресс */}
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        <Step>
          <StepLabel>Основная информация</StepLabel>
        </Step>
        <Step>
          <StepLabel>Детали объявления</StepLabel>
        </Step>
      </Stepper>

      <form onSubmit={handleSubmit}>
        {/* === ШАГ 1 === */}
        {activeStep === 0 && (
          <>
            <TextField
              fullWidth
              label="Название"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Описание"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Локация"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Ссылка на фото"
              name="image"
              value={formData.image}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            {/* Выбор категории */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Категория</InputLabel>
              <Select name="type" value={formData.type} onChange={handleChangeSelect} required>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Кнопка "Далее" */}
            <Button variant="contained" color="primary" onClick={handleNext} fullWidth>
              Далее
            </Button>
          </>
        )}

        {/* === ШАГ 2 === */}
        {activeStep === 1 && (
          <>
            {/* Дополнительные поля по категориям */}
            {formData.type === "Недвижимость" && (
              <>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Тип недвижимости</InputLabel>
                  <Select name="propertyType" value={formData.propertyType} onChange={handleChangeSelect} required>
                    {propertyTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Площадь (м²)"
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Количество комнат"
                  type="number"
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Цена"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />
              </>
            )}

            {formData.type === "Авто" && (
              <>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Марка</InputLabel>
                  <Select name="brand" value={formData.brand} onChange={handleChangeSelect} required>
                    {carBrands.map((brand) => (
                      <MenuItem key={brand} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Модель"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Год выпуска"
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Пробег (км)"
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              </>
            )}

            {formData.type === "Услуги" && (
              <>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Тип услуги</InputLabel>
                  <Select name="serviceType" value={formData.serviceType} onChange={handleChangeSelect} required>
                    {serviceTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Опыт работы (лет)"
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />
              </>
            )}

            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={handleBack}>
                Назад
              </Button>

              <Button type="submit" variant="contained" color="success" startIcon={<SaveIcon />}>
                {isEditing ? "Сохранить изменения" : "Разместить объявление"}
              </Button>
            </Box>
          </>
        )}
      </form>
    </Container>
  );
};

export default NewAdPage;