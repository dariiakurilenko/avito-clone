import React, { useEffect, useState } from 'react';
import { getItems } from '../../api/api';
import { Item } from '../../types/types';

const CardPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
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

  
  return (
    <div>
      <h2>Список объявлений</h2>
      {items.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p> 
          <p>{item.location}</p>
        </div>
      ))}
    </div>
  );
};

export default CardPage;