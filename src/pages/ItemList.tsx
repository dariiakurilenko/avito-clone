import React, { useEffect, useState } from 'react';
import { getItems } from '../api/api';
import { Item } from '../types/types';

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getItems();
      setItems(data);
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

export default ItemList;