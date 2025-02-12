import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "../../api/api";
import { CardType } from "../../types/types";
import Product from "../../components/product/Product";
import { Box, Typography } from "@mui/material";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получаем id из URL
  const [product, setProduct] = useState<CardType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const data = await getItemById(Number(id));
        setProduct(data);
      } catch (error) {
        console.error("Ошибка загрузки объявления", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (

      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <Typography variant="h5" fontWeight="bold" color="primary">
          ⏳ Загрузка объявления...
        </Typography>
      </Box>
    );

  if (!product)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <Typography variant="h5" fontWeight="bold" color="text.secondary">
          ❌ Объявление не найдено
        </Typography>
      </Box>
    );

  return <Product description={""} {...product} />;
};

export default ProductPage;
