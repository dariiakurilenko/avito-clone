import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  id: number;
  name: string;
  location: string;
  type?: "Недвижимость" | "Авто" | "Услуги";
  image?: string;
  price?: number; // Цена только для недвижимости и услуг
  cost?: number; // Стоимость только для услуг
}

const DEFAULT_IMAGE =
  "https://previews.123rf.com/images/koblizeek/koblizeek2205/koblizeek220500309/186660515-no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg";

const Card: FC<CardProps> = ({ id, name, location, image, type  }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%", 
        maxWidth: "1200px",
        padding: "20px",
        margin: "30px auto",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)", 
        transition: "transform 0.2s ease-in-out",
        borderBottom: "2px solid #ddd", 
        borderRadius: "8px",
        marginBottom: "15px", 
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img
        src={image || DEFAULT_IMAGE}
        alt={name}
        width="300"
        height="300"
        style={{
          objectFit: "cover",
          borderRadius: "8px",
          border: "2px solid #ddd",
          flexShrink: 0,
        }}
      />

      {/* Основная информация */}
      <div style={{ flex: 1, padding: "20px 40px", textAlign: "center" }}>
        <h3 style={{ margin: "0", fontSize: "2.5rem", color: "#333" }}>{name}</h3>
        <p style={{ margin: "8px 0", fontWeight: "bold", color: "#25ba52", fontSize: "2rem" }}>{type}</p>
        <p style={{ margin: "8px 0", color: "#555", fontSize: "1.5rem" }}>{location}</p>
      </div>

      {/* Кнопка открытия */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/item/${id}`);
        }}
        style={{
          padding: "40px 80px",
          fontSize: "1.5rem",
          backgroundColor: "#25ba52",
          color: "#fff",
          border: "none",
          borderRadius: "30px",
          cursor: "pointer",
          transition: "background-color 0.3s",
          flexShrink: 0,
          marginRight: "20px",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a963f")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#25ba52")}
      >
        Открыть 
      </button>
    </div>
  );
};

export default Card;
