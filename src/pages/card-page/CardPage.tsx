import React, { useEffect, useState } from "react";
import { getItems } from "../../api/api";
import { CardType } from "../../types/types";
import Card from "../../components/card/Card";

const CardPage: React.FC = () => {
  const [items, setItems] = useState<CardType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (error) {
        console.error("Ошибка загрузки объявлений", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <p>Загрузка объявлений...</p>;
  if (!items.length) return <p>Объявлений пока нет</p>;

  return (
    <div>
      <h2>Список объявлений</h2>
      <div>
        {items.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            name={item.name}
            location={item.location}
            price={item.price}
            cost={item.cost}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
};

export default CardPage;
