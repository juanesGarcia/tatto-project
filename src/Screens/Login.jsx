import React, { useEffect, useState } from "react";
import "../Styles/Login.css";
import { NavLink } from "react-router-dom";
import { onLogin } from "../api/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authenticateUser, setInfo } from "../redux/slices/authSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const Login = () => {
  const [errores, setErrores] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    showPassword: false, // Estado para alternar la visibilidad de la contraseña
  });
  const dispatch = useDispatch();

  const handleSummit = async (e) => {
    e.preventDefault();
        try {
          const infoUser = await onLogin(user);
          dispatch(authenticateUser());
          dispatch(setInfo(infoUser.data.info));
          console.log('Token:', infoUser.data.token);  // Verifica si el token está presente
          console.log('Info:', infoUser.data.info)
          // Guarda tanto el token como la info en 'authData'
          localStorage.setItem('authData', JSON.stringify(
            infoUser.data
          ));
      
        } catch (error) {
          setErrores(error.response.data.errors[0]);
          console.log(error.response.data.errors[0]);
        }
      };

  const handleOnchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setUser((prevUser) => ({
      ...prevUser,
      showPassword: !prevUser.showPassword,
    }));
  };

  return (
    <>
      <div className="containerLogin">
        <div className="login-boxLogin">
          <p>Iniciar sesión</p>
          <form onSubmit={handleSummit}>
            <div className="user-boxLogin">
              <input
                required=""
                className="email"
                name="email"
                type="text"
                onChange={handleOnchange}
              />
              <label className="label">Email</label>
            </div>
            <div className="user-boxLogin">
              {/* Campo de contraseña personalizado */}
              <div className="password-container">
                <input
                  required=""
                  name="password"
                  type={user.showPassword ? "text" : "password"}
                  value={user.password}
                  onChange={handleOnchange}
                  autoComplete="off"
                  className="email"
                />
                {user.showPassword ? (
                  <VisibilityIcon
                    onClick={toggleShowPassword}
                    className="visibility"
                  ></VisibilityIcon>
                ) : (
                  <VisibilityOffIcon
                    onClick={toggleShowPassword}
                    className="visibility"
                  ></VisibilityOffIcon>
                )}
              </div>
              <label className="label" type="label">
                Contraseña
              </label>
            </div>
            <button onClick={handleSummit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Enviar
            </button>
            <div style={{ color: "red", margin: "10px 0" }}>{errores}</div>
          </form>
          <p>
            No tienes una cuenta?{" "}
            <NavLink className="a2" to="/ChooseRegister">
              registrate!
            </NavLink>{" "}
          </p>
        </div>
      </div>
    </>
  );
};
