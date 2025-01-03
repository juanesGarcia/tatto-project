import React, { useEffect, useState } from "react";
import "../Styles/Register.css";
import Swal from "sweetalert2";
import { onRegistration } from "../api/auth";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const Register = () => {
  const [errores, setErrores] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    rol: "usuario",
  });
  const navigate = useNavigate();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSummit = async (e) => {
    e.preventDefault();
    console.log(user);
    if (user.password === user.passwordConfirm) {
      try {
        const response = await onRegistration(user);
        console.log(response);
        if (response.data.success) {
          setRegistrationSuccess(true);
          navigate("/login"); // Redirigir al inicio de sesión
        }
      } catch (error) {
        setErrores(error.response.data.errors[0]);
        console.log(error.response.data.errors[0]);
        Swal.fire({
          title: "Error",
          text: errores,
          icon: "error",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
          buttonsStyling: false,
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "las contraseñas no coinciden ",
        icon: "error",
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm-button",
        },
        buttonsStyling: false,
      });
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

  const toggleShowConfirmPassword = () => {
    setUser((prevUser) => ({
      ...prevUser,
      showConfirmPassword: !prevUser.showConfirmPassword,
    }));
  };

  return (
    <div>
      <div className="containerRegister" autoComplete="off">
        <div className="login-box">
          <p>Registro</p>
          <form onSubmit={handleSummit}>
            <div className="user-box">
              <input
                required=""
                name="name"
                type="text"
                onChange={handleOnchange}
                className="info-input"
                
              />
              <label className="label">Nombre De Usuario</label>
            </div>
            <div className="user-box">
              <input
                required=""
                name="email"
                type="text"
                onChange={handleOnchange}
                className="info-input"
              />
              <label className="label">Email</label>
            </div>
            <div className="user-box">
              <input
                required=""
                name="password"
                onChange={handleOnchange}
                type={user.showPassword ? "text" : "password"}
                className="info-input"

              />
              <label className="label">Contraseña</label>
              {user.showPassword ? (
                <VisibilityIcon
                  onClick={toggleShowPassword}
                  className="visibility-right"
                ></VisibilityIcon>
              ) : (
                <VisibilityOffIcon
                  onClick={toggleShowPassword}
                  className="visibility-right"
                ></VisibilityOffIcon>
              )}
            </div>
            <div className="user-box">
              <input
                required=""
                name="passwordConfirm"
                type={user.showConfirmPassword ? "text" : "password"}
                onChange={handleOnchange}
                autoComplete="off"
                className="info-input"
              />
              <label className="label">Comfirma La Contraseña</label>
              {user.showConfirmPassword ? (
                <VisibilityIcon
                  onClick={toggleShowConfirmPassword}
                  className="visibility-right"
                ></VisibilityIcon>
              ) : (
                <VisibilityOffIcon
                  onClick={toggleShowConfirmPassword}
                  className="visibility-right"
                ></VisibilityOffIcon>
              )}
            </div>

            <button type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
