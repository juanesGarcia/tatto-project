import React, { useEffect, useState } from "react";
import { SearchP } from "./SearchP";
import "../Styles/Home.css";
import LoaderLogo from "./LoaderLogo";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simula una carga asíncrona (puedes reemplazar esto con tu lógica de carga real)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Tiempo de simulación de carga: 2 segundos
  }, []);

  return (
    <div className="search">
      {isLoading && <LoaderLogo></LoaderLogo>}
      <SearchP></SearchP>
    </div>
  );
};
