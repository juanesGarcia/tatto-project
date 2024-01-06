import React, { useEffect, useState } from "react";
import "../Styles/Chooseregister.css";
import { NavLink } from "react-router-dom";
import LoaderLogo from "./LoaderLogo";

export const ChooseRegister = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simula una carga asíncrona (puedes reemplazar esto con tu lógica de carga real)
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Tiempo de simulación de carga: 2 segundos
  }, []);

  return (
    <>
      {isLoading && <LoaderLogo></LoaderLogo>}

      <div className="containerChoose ">
        <div className="btnUser">
          <NavLink to="/Register">
            <button className="buttonC">User</button>
          </NavLink>
        </div>
        <div className="btnTatto">
          <NavLink to="/RegisterTatto">
            <button className="buttonC">Tatto Artist</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};
