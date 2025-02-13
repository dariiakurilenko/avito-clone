import React, { useEffect, useState } from "react";
import { getItems } from "../../api/api";
import { CardType } from "../../types/types";
import Card from "../../components/card/Card";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ITEMS_PER_PAGE = 5; // Количество объявлений на странице
const CATEGORIES = ["Все категории", "Недвижимость", "Авто", "Услуги"]; // Категории

const CardPage: React.FC = () => {
  const [items, setItems] = useState<CardType[]>([]);
  const [filteredItems, setFilteredItems] = useState<CardType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("Все категории");
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Ошибка загрузки объявлений", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Фильтрация по названию и категории
  useEffect(() => {
    setPage(1); 

    let filtered = items;

    if (category !== "Все категории") {
      filtered = filtered.filter((item) => item.type === category);
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [search, category, items]);

  // Рассчитываем количество страниц
  const pageCount = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const displayedItems = filteredItems.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Заголовок и кнопка */}
      <Typography variant="h4" align="center" gutterBottom>
        Список объявлений
      </Typography>

      
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={5}>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => navigate("/form")}
          sx={{
            ml: 2,
            bgcolor: "#25ba52",
            borderRadius: "25px",
            padding: "15px 25px",
            fontSize: "1.5rem",
            paddingX: 3,
            "&:hover": { bgcolor: "#1e9c45" },
          }}
        >
          Разместить объявление
        </Button>
      </Box>

      
      {items.length > 0 && (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            {/* Поле поиска */}
            <TextField
              label="Поиск по названию"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                flexGrow: 1,
                maxWidth: 400,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "green" },
                  "&:hover fieldset": { borderColor: "darkgreen" },
                  "&.Mui-focused fieldset": { borderColor: "green", borderWidth: 2 },
                },
                "& .MuiInputLabel-root": { color: "green" },
                "& .MuiInputLabel-root.Mui-focused": { color: "darkgreen" },
              }}
            />

            {/* Фильтр по категориям */}
            <FormControl sx={{ minWidth: 150, ml: 2 }}>
              <InputLabel sx={{ color: "darkgreen" }}>Категория</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                variant="outlined"
                sx={{
                  bgcolor: "white", 
                  color: "darkgreen", 
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "darkgreen", 
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1a632d", 
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0f4d1f", 
                  },
                }}
              >
                {CATEGORIES.map((cat) => (
                  <MenuItem
                    key={cat}
                    value={cat}
                    sx={{
                      color: "darkgreen", 
                      "&:hover": {
                        bgcolor: "#e6f4ea", 
                      },
                    }}
                  >
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </>
      )}

      {/* Список карточек */}
      <Box display="flex" flexDirection="column" gap={2}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <Typography variant="h5" fontWeight="bold" color="primary">
              ⏳ Загрузка объявлений...
            </Typography>
          </Box>
        ) : displayedItems.length > 0 ? (
          displayedItems.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
              location={item.location}
              price={item.price}
              cost={item.cost}
              type={item.type}
              image={item.image}
            />
          ))
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <Typography variant="h5" fontWeight="bold" color="text.secondary">
              📭 Объявлений пока нет
            </Typography>
          </Box>
        )}
      </Box>

      {/* Пагинация */}
      {pageCount > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Container>
  );
};

export default CardPage;
