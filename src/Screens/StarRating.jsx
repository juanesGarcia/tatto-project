// StarRating.jsx

import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import '../Styles/StarRating.css'; // Ajusta la ruta según la ubicación de tu archivo de estilo

const StarRating = ({ rating }) => {
  console.log(rating)
  const stars = [];
  const roundedRating = Math.floor(rating); // Cambiado a Math.floor para redondear hacia abajo

  for (let i = 0; i < 5; i++) {
    if (i < roundedRating) {
      stars.push(<FaStar key={i} className="star2 active" />);
    } else if (i === roundedRating && rating % 1 !== 0) {
      stars.push(<FaStarHalf key={i} className="star2 half-star" />);
    } else {
      stars.push(<FaStar key={i} className="star2" style={{ color: "#fff" }} />);
    }
  }

  return <div className="star2-container">{stars}</div>;
};

export default StarRating;


