import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../Styles/Rating.css";
import { rating2 } from "../api/auth";
import Swal from "sweetalert2";

const RatingModal = ({ onClose, id, info , getRatingf}) => {
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

  const handleClose = () => {
    setShowRating(false);
    onClose();
  };

  const handleStarClick = (index) => {
    setRating(index === rating ? 0 : index + 1);
  };

  const handleMouseOver = (index) => {
    // Cambiar el color de las estrellas al pasar el ratón por encima
    setRating(index + 1);
  };

  const handleMouseLeave = () => {
    // Restablecer el color al dejar de pasar el ratón por encima
    if (!rating) {
      setRating(0);
    }
  };

  const handleConfirmRating = async () => {
    const data = {
      rater_user: info,
      tatuador_user: id,
      rating,
    };

    try {
      const response = await rating2(data);
      console.log(response.data.message);
      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
        },
      });
      getRatingf();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al ingresar la clasificación",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
        },
      });
    }

    // Puedes realizar otras acciones aquí, como enviar la calificación al servidor, etc.
    handleClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-contentRating"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="clasification">Calificación:</h3>
        <div className="r">
          <div className="allStart">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={index < rating ? "star active" : "star"}
                onClick={() => handleStarClick(index)}
                onMouseOver={() => handleMouseOver(index)}
                onMouseLeave={handleMouseLeave}
                size={30}
              />
            ))}
          </div>

          <div>
            <button onClick={handleConfirmRating} className="button" id="confirm">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
