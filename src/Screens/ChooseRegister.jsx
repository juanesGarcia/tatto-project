import React from "react";
import "../Styles/Chooseregister.css";
import { NavLink } from "react-router-dom";


export const ChooseRegister = () => {
 

  return (
      <div className="containerChoose ">
        <div className="btnUser">
          <NavLink to="/Register">
            <button className="buttonC">Usuario</button>
          </NavLink>
        </div>
        <div className="btnTatto">
          <NavLink to="/RegisterTatto">
            <button className="buttonC">Tatuador</button>
          </NavLink>
        </div>
      </div>
  );
};
