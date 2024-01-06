import React from 'react';
import '../Styles/Preloader.css'; // Archivo CSS para estilos
import logo from "/images/logofinal.jpg";

const LoaderLogo = () => {
  return (
    <div className="preloader-container">
    <img src={logo} alt="Logo" className="preloader-logo" />
    <div className="loading-spinner"></div>
  </div>
  );
};

export default LoaderLogo;